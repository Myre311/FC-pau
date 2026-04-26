import { NextResponse } from 'next/server';
import { updateSupabaseSession } from '@/lib/supabase/middleware';

// Middleware simplifié — SANS i18n (temporaire)
// 1. Rafraîchit la session Supabase
// 2. Protège les routes /compte/*

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip pour les ressources statiques + webhooks + API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // favicon, images, etc.
  ) {
    return NextResponse.next();
  }

  // Rafraîchir session Supabase
  const { response, user } = await updateSupabaseSession(request);

  // Routes protégées : /compte/*
  if (pathname.startsWith('/compte') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion';
    url.searchParams.set('next', pathname + search);
    return NextResponse.redirect(url);
  }

  // Empêche d'aller sur /connexion si déjà connecté
  if ((pathname === '/connexion' || pathname === '/inscription') && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/compte';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

// Matcher : tout sauf statiques, API, assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-fcpau.svg|manifest.json|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};

import { NextResponse } from 'next/server';

import { updateSupabaseSession } from '@/lib/supabase/middleware';

// Middleware racine — s'exécute avant chaque page/route handler.
// 1. Rafraîchit la session Supabase (nécessaire pour les RSC)
// 2. Protège les routes /compte/* en redirigeant vers /connexion
//    avec un paramètre next= pour revenir après login.

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip explicitement pour les ressources statiques + webhooks
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/webhooks') ||
    pathname.includes('.') // /favicon.ico, /og-image.png, etc.
  ) {
    return NextResponse.next();
  }

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

// Matcher : tout sauf statiques + image optimization
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};

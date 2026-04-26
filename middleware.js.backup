import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { updateSupabaseSession } from '@/lib/supabase/middleware';
import { locales, defaultLocale } from './i18n';

// Middleware i18n
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
});

// Middleware racine — combine i18n + Supabase Auth
// 1. Détection et routing i18n (FR/EN/ES)
// 2. Rafraîchit la session Supabase
// 3. Protège les routes /compte/*

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip explicitement pour les ressources statiques + webhooks + API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // /favicon.ico, /logo-fcpau.svg, etc.
  ) {
    return NextResponse.next();
  }

  // 1. Gérer i18n routing
  const intlResponse = intlMiddleware(request);

  // 2. Rafraîchir session Supabase
  const { response, user } = await updateSupabaseSession(request);

  // Extraire pathname sans locale pour les checks de routes
  const pathnameWithoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';

  // 3. Routes protégées : /compte/* (avec ou sans locale)
  if (pathnameWithoutLocale.startsWith('/compte') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/connexion';
    url.searchParams.set('next', pathname + search);
    return NextResponse.redirect(url);
  }

  // 4. Empêche d'aller sur /connexion si déjà connecté
  if ((pathnameWithoutLocale === '/connexion' || pathnameWithoutLocale === '/inscription') && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/compte';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Combiner headers i18n + Supabase
  if (intlResponse) {
    intlResponse.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

// Matcher : tout sauf statiques, API, assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo-fcpau.svg|manifest.json|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};

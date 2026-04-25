import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Client Supabase coté serveur (Server Components, Server Actions, Route Handlers).
// Lit/écrit les cookies de session via next/headers.
//
// IMPORTANT : NE JAMAIS importer ce module dans un composant client —
// il référence des API server-only (next/headers).

export function createSupabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Dans certains contextes (RSC), tenter de set un cookie throw.
          // On l'absorbe — le middleware gère les refresh de session.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // No-op
          }
        },
      },
    },
  );
}

// Client admin (bypass RLS) — uniquement pour les opérations privilégiées
// côté serveur (sync user, admin actions). Ne jamais utiliser pour des
// requêtes au nom de l'utilisateur courant.
export function createSupabaseAdmin() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY manquante');
  }
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: { getAll: () => [], setAll: () => {} },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

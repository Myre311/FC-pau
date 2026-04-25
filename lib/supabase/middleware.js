import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Helper appelé par middleware.js (root). Rafraîchit la session
// Supabase à chaque requête et propage les cookies via la response.
//
// Effet de bord critique : sans ce refresh, les Server Components
// ne voient pas l'utilisateur connecté car son JWT est expiré.

export async function updateSupabaseSession(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Force le refresh JWT si nécessaire
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}

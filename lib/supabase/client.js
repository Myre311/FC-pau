import { createBrowserClient } from '@supabase/ssr';

// Client Supabase côté client (Client Components uniquement).
// Ne PAS utiliser dans les Server Components — utiliser lib/supabase/server.js

let client = null;

export function createSupabaseClient() {
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return client;
}

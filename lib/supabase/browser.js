'use client';

import { createBrowserClient } from '@supabase/ssr';

// Client Supabase coté navigateur. Singleton pour ne pas multiplier
// les listeners onAuthStateChange.

let cached;

export function getSupabaseBrowser() {
  if (!cached) {
    cached = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }
  return cached;
}

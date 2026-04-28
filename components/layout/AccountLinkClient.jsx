'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getSupabaseBrowser } from '@/lib/supabase/browser';

// Version client de AccountLink — utilisé dans Header (qui est devenu
// client component pour le scroll listener). Détecte la session via
// onAuthStateChange Supabase côté navigateur.

export function AccountLinkClient() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setSignedIn(Boolean(data.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (mounted) setSignedIn(Boolean(session?.user));
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Link
      href={signedIn ? '/compte' : '/connexion'}
      className="hidden h-9 items-center gap-2 border border-white/10 bg-white/[0.04] px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-pau-yellow/40 hover:text-pau-yellow md:inline-flex"
      aria-label={signedIn ? 'Mon compte' : 'Connexion'}
    >
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-5 5-7 8-7s7 2 8 7" strokeLinecap="square" />
      </svg>
      <span className="hidden lg:inline">{signedIn ? 'Compte' : 'Connexion'}</span>
    </Link>
  );
}

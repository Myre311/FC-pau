import Link from 'next/link';

import { getCurrentUser } from '@/lib/auth';

// Server component — affiche soit "Connexion" soit "Mon compte"
// selon la session courante.

export async function AccountLink() {
  const session = await getCurrentUser().catch(() => null);
  const connected = Boolean(session);

  return (
    <Link
      href={connected ? '/compte' : '/connexion'}
      className="hidden h-10 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-blanc transition-colors hover:text-jaune md:inline-flex"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-5 5-7 8-7s7 2 8 7" strokeLinecap="square" />
      </svg>
      <span>{connected ? 'Mon compte' : 'Connexion'}</span>
    </Link>
  );
}

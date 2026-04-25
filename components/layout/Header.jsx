import Link from 'next/link';

import { CartButton } from '@/components/shop/CartButton';
import { Logo } from '@/components/ui/Logo';

const NAV = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/actualites', label: 'Actus' },
  { href: '/partenaires', label: 'Partenaires' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-blanc/10 bg-nuit">
      <div className="container-fc flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-jaune"
          aria-label="Accueil FC Pau"
        >
          <Logo className="text-2xl md:text-3xl" />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/70 transition-colors hover:text-jaune"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <CartButton />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-blanc transition-colors hover:text-jaune lg:hidden"
            aria-label="Ouvrir le menu"
            data-mobile-menu-trigger
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

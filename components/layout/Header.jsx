'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CartButton } from '@/components/shop/CartButton';
import { AccountLinkClient } from '@/components/layout/AccountLinkClient';
import { Logo } from '@/components/ui/Logo';

// Header sticky avec scroll-trigger backdrop-blur, lignes hover
// underline animées, logo composé (image + nom + sous-titre).
// Port direct de fcpau-index.html (#nav).

const NAV = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/actualites', label: 'Actus' },
  { href: '/partenaires', label: 'Partenaires' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Bascule "scrolled" dès qu'on passe la hauteur de la Topbar (~28-30px).
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? 'border-b border-blanc/10 bg-nuit/[0.93] backdrop-blur-[22px]'
          : 'border-b border-transparent bg-nuit'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[66px]">
        <Link
          href="/"
          className="outline-none focus-visible:ring-2 focus-visible:ring-jaune"
          aria-label="Accueil FC Pau"
        >
          <Logo size="md" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-[2px] lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/boutique'
                ? pathname.startsWith('/boutique')
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-[13px] py-2 font-display text-[11.5px] uppercase tracking-[0.1em] transition-colors after:absolute after:bottom-[3px] after:left-[13px] after:right-[13px] after:h-px after:origin-left after:scale-x-0 after:bg-jaune after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  active ? 'text-jaune after:scale-x-100' : 'text-blanc/40 hover:text-blanc'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-[6px]">
          <AccountLinkClient />
          <CartButton />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center border border-blanc/10 bg-blanc/[0.04] text-blanc/55 transition-colors hover:bg-blanc/[0.08] lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

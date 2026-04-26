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

// Composant pour les items avec sous-menu (dropdown)
function NavItemWithSubmenu({ item, pathname }) {
  const [isOpen, setIsOpen] = useState(false);

  // Vérifier si un lien du submenu est actif
  const isActive = item.submenu.some((sub) => pathname.startsWith(sub.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`relative px-[13px] py-2 font-display text-[11.5px] uppercase tracking-[0.1em] transition-colors after:absolute after:bottom-[3px] after:left-[13px] after:right-[13px] after:h-px after:origin-left after:scale-x-0 after:bg-jaune after:transition-transform after:duration-300 hover:after:scale-x-100 ${
          isActive ? 'text-jaune after:scale-x-100' : 'text-blanc/40 hover:text-blanc'
        }`}
      >
        {item.label}
        <svg
          className={`ml-1 inline-block h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="square" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] border border-blanc/10 bg-nuit/[0.98] backdrop-blur-xl">
          {item.submenu.map((sub) => {
            const subActive = pathname === sub.href;
            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={`block border-b border-blanc/5 px-4 py-3 font-sans text-sm transition-colors last:border-b-0 ${
                  subActive
                    ? 'bg-jaune/10 text-jaune'
                    : 'text-blanc/70 hover:bg-blanc/5 hover:text-blanc'
                }`}
              >
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const NAV = [
  { href: '/equipe', label: 'Équipe pro' },
  { href: '/calendrier', label: 'Calendrier' },
  {
    label: 'Billetterie',
    submenu: [
      { href: '/billetterie', label: 'Acheter billets' },
      { href: '/billetterie/cashless', label: 'Carte cashless' },
    ],
  },
  { href: '/boutique', label: 'Boutique' },
  {
    label: 'Club',
    submenu: [
      { href: '/club', label: 'Présentation' },
      { href: '/club/histoire', label: 'Histoire' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    label: 'Academy',
    submenu: [
      { href: '/academy', label: 'Accueil Academy' },
      { href: '/academy/masculin', label: 'Pôle masculin' },
      { href: '/academy/feminin', label: 'Pôle féminin' },
      { href: '/academy/integrer', label: 'Rejoindre' },
      { href: '/academy/stages', label: 'Stages' },
    ],
  },
  { href: '/actualites', label: 'Actus' },
  { href: '/partenaires', label: 'Partenaires' },
];

// Menu mobile fullscreen
function MobileMenu({ isOpen, pathname, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-nuit/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-sm border-l border-blanc/10 bg-nuit">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-blanc/10 px-4">
            <span className="font-display text-sm uppercase tracking-wider text-jaune">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-blanc/10 bg-blanc/[0.04] text-blanc/55 transition-colors hover:bg-blanc/[0.08]"
              aria-label="Fermer le menu"
            >
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {NAV.map((item, idx) => {
                if (item.submenu) {
                  const hasActiveSubmenu = item.submenu.some((sub) => pathname.startsWith(sub.href));
                  return (
                    <li key={idx} className="border-b border-blanc/5 pb-1">
                      <div className="px-3 py-2 font-display text-xs uppercase tracking-[0.1em] text-blanc/40">
                        {item.label}
                      </div>
                      <ul className="space-y-1 pl-3">
                        {item.submenu.map((sub) => {
                          const subActive = pathname === sub.href;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className={`block px-3 py-2 font-sans text-sm transition-colors ${
                                  subActive
                                    ? 'text-jaune'
                                    : 'text-blanc/70 hover:text-blanc'
                                }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }

                const active =
                  item.href === '/boutique'
                    ? pathname.startsWith('/boutique')
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href} className="border-b border-blanc/5">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block px-3 py-3 font-display text-sm uppercase tracking-[0.1em] transition-colors ${
                        active ? 'text-jaune' : 'text-blanc/70 hover:text-blanc'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Bascule "scrolled" dès qu'on passe la hauteur de la Topbar (~28-30px).
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
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
            {NAV.map((item, idx) => {
              if (item.submenu) {
                return <NavItemWithSubmenu key={idx} item={item} pathname={pathname} />;
              }

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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center border border-blanc/10 bg-blanc/[0.04] text-blanc/55 transition-colors hover:bg-blanc/[0.08] lg:hidden"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileMenu isOpen={mobileMenuOpen} pathname={pathname} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

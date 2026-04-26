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

// Menu mobile fullscreen premium PSG-level
function MobileMenu({ isOpen, pathname, onClose }) {
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop avec noise */}
      <div
        className="noise-overlay absolute inset-0 bg-nuit/[0.98] backdrop-blur-xl animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel fullscreen */}
      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-blanc/10 px-6 animate-slide-in-right">
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-jaune animate-pulse-dot" />
            <span className="font-display text-sm uppercase tracking-[0.12em] text-jaune">Navigation</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-jaune/20 bg-jaune/5 text-jaune transition-all duration-300 hover:border-jaune hover:bg-jaune hover:text-nuit active:scale-95"
            aria-label="Fermer le menu"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 overflow-y-auto px-6 py-10">
          <ul className="space-y-2">
            {NAV.map((item, idx) => {
              if (item.submenu) {
                const isExpanded = expandedSubmenu === idx;
                const hasActiveSubmenu = item.submenu.some((sub) => pathname.startsWith(sub.href));

                return (
                  <li key={idx} className={`animate-cascade-${Math.min(idx + 1, 5)}`}>
                    <button
                      type="button"
                      onClick={() => setExpandedSubmenu(isExpanded ? null : idx)}
                      className={`group flex w-full items-center justify-between border-l-2 px-4 py-3 transition-all duration-300 ${
                        hasActiveSubmenu || isExpanded
                          ? 'border-jaune bg-jaune/5'
                          : 'border-transparent hover:border-blanc/20 hover:bg-blanc/5'
                      }`}
                    >
                      <span className={`font-display text-lg uppercase tracking-[0.08em] transition-colors ${
                        hasActiveSubmenu || isExpanded ? 'text-jaune' : 'text-blanc/85 group-hover:text-blanc'
                      }`}>
                        {item.label}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-jaune' : 'text-blanc/40'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" strokeLinecap="square" />
                      </svg>
                    </button>

                    {/* Submenu expand */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-1 border-l-2 border-jaune/20 bg-jaune/[0.02] py-2 pl-8 pr-4">
                        {item.submenu.map((sub) => {
                          const subActive = pathname === sub.href;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className={`block py-2 font-sans text-base transition-colors ${
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
                    </div>
                  </li>
                );
              }

              const active =
                item.href === '/boutique'
                  ? pathname.startsWith('/boutique')
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href} className={`animate-cascade-${Math.min(idx + 1, 5)}`}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block border-l-2 px-4 py-3 font-display text-lg uppercase tracking-[0.08em] transition-all duration-300 ${
                      active
                        ? 'border-jaune bg-jaune/5 text-jaune'
                        : 'border-transparent text-blanc/85 hover:border-blanc/20 hover:bg-blanc/5 hover:text-blanc'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer menu */}
        <div className="border-t border-blanc/10 px-6 py-6 animate-fade-up">
          <div className="mb-4 flex items-center gap-4">
            <a
              href="https://instagram.com/paufc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center border border-blanc/15 bg-blanc/5 text-blanc/60 transition-all duration-300 hover:border-jaune hover:bg-jaune hover:text-nuit"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/paufc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center border border-blanc/15 bg-blanc/5 text-blanc/60 transition-all duration-300 hover:border-jaune hover:bg-jaune hover:text-nuit"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/paufc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center border border-blanc/15 bg-blanc/5 text-blanc/60 transition-all duration-300 hover:border-jaune hover:bg-jaune hover:text-nuit"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
              </svg>
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-blanc/5 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/40">
              Béarn · 1920 · Hala Pau
            </span>
            <span className="rounded-sm border border-jaune/30 bg-jaune/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-jaune">
              Site officiel
            </span>
          </div>
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

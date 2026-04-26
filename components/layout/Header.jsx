'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CartButton } from '@/components/shop/CartButton';
import { AccountLinkClient } from '@/components/layout/AccountLinkClient';
import { Logo } from '@/components/ui/Logo';
import { SearchModal } from '@/components/layout/SearchModal';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { VideoModal } from '@/components/layout/VideoModal';

// Header sombre inspiré site officiel paufc.fr
// Navigation horizontale, fond nuit, sticky avec bordure jaune au scroll

const NAV = [
  { href: '/equipe', label: 'Équipe pro' },
  { href: '/calendrier', label: 'Calendrier' },
  {
    label: 'Billetterie',
    submenu: [
      { href: '/billetterie', label: 'Acheter des places' },
      { href: '/billetterie/cashless', label: 'Carte Cashless' },
      { href: '/billetterie/cashless/offres', label: 'Offres' },
      { href: '/billetterie/cashless/faq', label: 'FAQ' },
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
      { href: '/academy', label: 'Présentation' },
      { href: '/academy/masculin', label: 'Pôle masculin' },
      { href: '/academy/feminin', label: 'Pôle féminin' },
      { href: '/academy/integrer', label: 'Rejoindre' },
      { href: '/academy/stages', label: 'Stages' },
    ],
  },
  { href: '/actualites', label: 'Actus' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/galerie', label: 'Galerie' },
];

function NavItem({ item, pathname }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  // Si pas de sous-menu, lien simple
  if (!item.submenu) {
    const active = pathname.startsWith(item.href) || (item.href === '/' && pathname === '/');
    return (
      <Link
        href={item.href}
        className={`relative px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
          active ? 'text-jaune' : 'text-blanc hover:text-jaune'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  // Avec sous-menu : dropdown
  const isActive = item.submenu.some((sub) => pathname.startsWith(sub.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      <button
        className={`flex items-center gap-1 px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
          isActive ? 'text-jaune' : 'text-blanc hover:text-jaune'
        }`}
      >
        {item.label}
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {showSubmenu && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] border-2 border-jaune bg-nuit pt-2">
          {item.submenu.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block border-b border-blanc/10 px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-blanc transition-colors hover:bg-jaune hover:text-nuit last:border-b-0"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`border-b-4 bg-nuit transition-all duration-300 ${
          scrolled ? 'border-jaune shadow-lg' : 'border-jaune/50'
        }`}
      >
        <div className="container-pau flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="outline-none focus-visible:ring-2 focus-visible:ring-jaune"
            aria-label="Accueil FC Pau"
          >
            <Logo size="md" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item, index) => (
              <NavItem key={item.href || index} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Bouton vidéo YouTube */}
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="hidden h-10 w-10 items-center justify-center border-2 border-jaune bg-transparent text-jaune transition-all hover:bg-jaune hover:text-nuit md:flex"
              aria-label="Voir la vidéo"
              title="Vidéo officielle FC Pau"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Bouton recherche */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center border-2 border-blanc bg-transparent text-blanc transition-colors hover:bg-blanc hover:text-nuit"
              aria-label="Rechercher"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AccountLinkClient />
            <CartButton />
            <LanguageSwitcher className="hidden lg:flex" />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center border-2 border-blanc bg-nuit text-blanc transition-colors hover:bg-blanc hover:text-nuit lg:hidden"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile simple */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
                <span className="font-display text-sm uppercase tracking-wider text-pau-blue">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50"
                  aria-label="Fermer le menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-2">
                  {NAV.map((item, index) => {
                    // Item simple sans sous-menu
                    if (!item.submenu) {
                      const active = pathname.startsWith(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block border-l-4 px-4 py-3 font-display text-base uppercase tracking-wide transition-colors ${
                              active
                                ? 'border-nuit bg-gray-100 text-nuit'
                                : 'border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }

                    // Item avec sous-menu
                    return (
                      <li key={index}>
                        <div className="border-l-4 border-transparent bg-gray-100 px-4 py-2 font-display text-sm font-bold uppercase tracking-wide text-gray-500">
                          {item.label}
                        </div>
                        <ul className="ml-4 space-y-1">
                          {item.submenu.map((sub) => {
                            const active = pathname.startsWith(sub.href);
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block border-l-4 px-4 py-2 text-sm transition-colors ${
                                    active
                                      ? 'border-jaune bg-gray-50 font-bold text-nuit'
                                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-50'
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
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modal de recherche */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Modal vidéo YouTube */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId="0zS2GEkFwOc"
      />
    </>
  );
}

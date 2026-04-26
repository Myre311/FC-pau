'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CartButton } from '@/components/shop/CartButton';
import { AccountLinkClient } from '@/components/layout/AccountLinkClient';
import { Logo } from '@/components/ui/Logo';

// Header light mode classique inspiré site officiel paufc.fr
// Navigation horizontale simple, fond blanc, sticky avec shadow au scroll

const NAV = [
  { href: '/equipe', label: 'Équipe pro' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/billetterie', label: 'Billetterie' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/club', label: 'Club' },
  { href: '/academy', label: 'Academy' },
  { href: '/actualites', label: 'Actus' },
  { href: '/partenaires', label: 'Partenaires' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className={`sticky top-0 z-40 border-b bg-white transition-shadow duration-300 ${
          scrolled ? 'border-gray-200 shadow-sm' : 'border-gray-100'
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="outline-none focus-visible:ring-2 focus-visible:ring-pau-blue-light"
            aria-label="Accueil FC Pau"
          >
            <Logo size="md" />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href) ||
                            (item.href === '/' && pathname === '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-hover relative px-4 py-2 font-display text-sm uppercase tracking-wide transition-colors ${
                    active ? 'text-pau-blue' : 'text-gray-700 hover:text-pau-blue'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AccountLinkClient />
            <CartButton />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
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
                  {NAV.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block border-l-4 px-4 py-3 font-display text-base uppercase tracking-wide transition-colors ${
                            active
                              ? 'border-pau-blue bg-blue-50 text-pau-blue'
                              : 'border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-50'
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
      )}
    </>
  );
}

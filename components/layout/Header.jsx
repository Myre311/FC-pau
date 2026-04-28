'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { CartButton } from '@/components/shop/CartButton';
import { AccountLinkClient } from '@/components/layout/AccountLinkClient';
import { Logo } from '@/components/ui/Logo';

const NAV = [
  { href: '/equipe', label: 'Équipe' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/billetterie', label: 'Billetterie' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/club', label: 'Club' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo className="text-2xl" />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                    active ? 'text-pau-yellow' : 'text-pau-primary hover:text-pau-yellow'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <AccountLinkClient />
            <CartButton />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              aria-label="Menu"
            >
              <svg className="h-6 w-6 text-pau-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-100 bg-white px-6 py-6 lg:hidden">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-display text-lg font-bold uppercase ${
                    active ? 'text-pau-yellow' : 'text-pau-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

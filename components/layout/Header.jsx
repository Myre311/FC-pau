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
  {
    href: '/boutique',
    label: 'Boutique',
    subMenu: [
      { href: '/boutique', label: 'Tous les produits' },
      { href: '/boutique?categorie=tenues-officielles', label: 'Tenues Officielles' },
      { href: '/boutique?categorie=training', label: 'Training' },
      { href: '/boutique?categorie=lifestyle', label: 'Lifestyle' },
      { href: '/boutique?categorie=enfant', label: 'Enfant' },
      { href: '/boutique?categorie=accessoires', label: 'Accessoires' },
    ]
  },
  {
    href: '/club',
    label: 'Club',
    subMenu: [
      { href: '/club', label: 'Présentation' },
      { href: '/club/histoire', label: 'Histoire' },
    ]
  },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-50 border-b border-pau-yellow bg-pau-night">
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
              const hasSubmenu = item.subMenu && item.subMenu.length > 0;

              if (hasSubmenu) {
                return (
                  <div
                    key={item.href}
                    className="group relative"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                        active ? 'text-pau-yellow' : 'text-white hover:text-pau-yellow'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {/* Dropdown */}
                    {openDropdown === item.href && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="min-w-[220px] border border-pau-yellow bg-pau-night py-2 shadow-lg">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-pau-yellow hover:text-pau-night"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                    active ? 'text-pau-yellow' : 'text-white hover:text-pau-yellow'
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
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
          <nav className="border-t border-pau-yellow bg-pau-night px-6 py-6 lg:hidden">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              const hasSubmenu = item.subMenu && item.subMenu.length > 0;

              if (hasSubmenu) {
                return (
                  <div key={item.href} className="mb-4">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 font-display text-lg font-bold uppercase ${
                        active ? 'text-pau-yellow' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {/* Submenu mobile */}
                    <div className="ml-4 mt-2 space-y-2">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 font-mono text-sm uppercase tracking-wider text-white/70 hover:text-pau-yellow"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-display text-lg font-bold uppercase ${
                    active ? 'text-pau-yellow' : 'text-white'
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

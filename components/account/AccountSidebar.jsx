'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { logoutAction } from '@/app/(auth)/actions';

const NAV = [
  { href: '/compte', label: 'Tableau de bord', match: 'exact' },
  { href: '/compte/commandes', label: 'Mes commandes' },
  { href: '/compte/adresses', label: 'Mes adresses' },
  { href: '/compte/personnalisations', label: 'Mes personnalisations' },
  { href: '/compte/favoris', label: 'Mes favoris' },
  { href: '/compte/infos', label: 'Mes infos & préférences' },
];

export function AccountSidebar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item) =>
    item.match === 'exact' ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Mobile : trigger drawer */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-full items-center justify-between border border-white/15 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 lg:hidden"
        aria-label="Ouvrir le menu compte"
      >
        <span>Mon espace</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
        </svg>
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-pau-night/85 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/15 bg-pau-night lg:hidden"
          >
            <SidebarContent user={user} navItems={NAV} isActive={isActive} onLink={() => setOpen(false)} />
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <SidebarContent user={user} navItems={NAV} isActive={isActive} onLink={() => {}} />
      </aside>
    </>
  );
}

function SidebarContent({ user, navItems, isActive, onLink }) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-white/10 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          Mon espace
        </p>
        <p className="mt-2 truncate font-display text-2xl uppercase leading-crush tracking-tightest text-white">
          {user.firstName ?? 'Supporter'}
        </p>
        <p className="mt-1 truncate font-mono text-[10px] tracking-[0.15em] text-white/40">
          {user.email}
        </p>
      </header>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Espace compte">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onLink}
                className={`block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  isActive(item)
                    ? 'bg-pau-yellow text-pau-night'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <form action={logoutAction} className="border-t border-white/10 p-3">
        <button
          type="submit"
          className="block w-full px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-pau-yellow"
        >
          ← Déconnexion
        </button>
      </form>
    </div>
  );
}

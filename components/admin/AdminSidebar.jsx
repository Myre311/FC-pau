'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { logoutAction } from '@/app/(auth)/actions';

const SECTIONS = [
  {
    title: 'Pilotage',
    items: [
      { href: '/admin', label: 'Tableau de bord', match: 'exact' },
    ],
  },
  {
    title: 'Ventes',
    items: [
      { href: '/admin/commandes', label: 'Commandes' },
      { href: '/admin/clients', label: 'Clients' },
      { href: '/admin/personnalisations', label: 'Personnalisations' },
    ],
  },
  {
    title: 'Catalogue',
    items: [
      { href: '/admin/produits', label: 'Produits' },
      { href: '/admin/stock', label: 'Stock' },
      { href: '/admin/codes-promo', label: 'Codes promo' },
    ],
  },
  {
    title: 'Contenu',
    items: [
      { href: '/admin/matchs', label: 'Matchs & Calendrier' },
      { href: '/admin/joueurs', label: 'Joueurs' },
      { href: '/admin/actualites', label: 'Actualités' },
      { href: '/admin/partenaires', label: 'Partenaires' },
      { href: '/admin/newsletter', label: 'Newsletter' },
    ],
  },
  {
    title: 'Système',
    items: [
      { href: '/admin/parametres', label: 'Paramètres' },
    ],
  },
];

export function AdminSidebar({ user }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item) =>
    item.match === 'exact' ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="flex h-10 items-center gap-2 border border-blanc/15 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-blanc lg:hidden"
        aria-label="Ouvrir la navigation admin"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="square" />
        </svg>
        Menu
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-nuit/85 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-blanc/15 bg-nuit lg:hidden"
          >
            <SidebarBody user={user} sections={SECTIONS} isActive={isActive} onLink={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="hidden h-[calc(100vh-3.5rem)] sticky top-14 lg:block lg:border-r lg:border-blanc/10">
        <SidebarBody user={user} sections={SECTIONS} isActive={isActive} onLink={() => {}} />
      </aside>
    </>
  );
}

function SidebarBody({ user, sections, isActive, onLink }) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-blanc/10 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
          Admin · Pau FC
        </p>
        <p className="mt-2 truncate font-display text-xl uppercase leading-crush tracking-tightest text-blanc">
          {user.firstName ?? user.email}
        </p>
        <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/40">
          Rôle · {user.role}
        </p>
      </header>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation admin">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-2 px-3 font-mono text-[9px] uppercase tracking-[0.25em] text-blanc/30">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onLink}
                    className={`block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      isActive(item)
                        ? 'bg-jaune text-nuit'
                        : 'text-blanc/70 hover:bg-blanc/5 hover:text-blanc'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <footer className="border-t border-blanc/10 p-3">
        <Link
          href="/"
          className="block px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 transition-colors hover:text-jaune"
        >
          ↗ Voir le site public
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="block w-full px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 transition-colors hover:text-jaune"
          >
            ← Déconnexion
          </button>
        </form>
      </footer>
    </div>
  );
}

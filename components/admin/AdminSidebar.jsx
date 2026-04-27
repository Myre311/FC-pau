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
    title: 'Marketing',
    items: [
      { href: '/admin/marketing', label: 'Campagnes' },
      { href: '/admin/canaux', label: 'Canaux de vente' },
    ],
  },
  {
    title: 'Contenu',
    items: [
      { href: '/admin/matchs', label: 'Matchs & Calendrier' },
      { href: '/admin/joueurs', label: 'Joueurs' },
      { href: '/admin/actualites', label: 'Actualités' },
      { href: '/admin/partenaires', label: 'Partenaires' },
      { href: '/admin/contenus', label: 'Textes du site' },
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
        className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
        aria-label="Ouvrir la navigation admin"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-gray-900/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-gray-200 bg-white shadow-xl lg:hidden"
          >
            <SidebarBody user={user} sections={SECTIONS} isActive={isActive} onLink={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="hidden h-[calc(100vh-4rem)] sticky top-16 lg:block lg:border-r lg:border-gray-200 lg:bg-white">
        <SidebarBody user={user} sections={SECTIONS} isActive={isActive} onLink={() => {}} />
      </aside>
    </>
  );
}

function SidebarBody({ user, sections, isActive, onLink }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <header className="border-b border-gray-200 p-5 lg:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-pau-yellow">
          Admin
        </p>
        <p className="mt-2 truncate text-base font-semibold text-gray-900">
          {user.firstName ?? user.email}
        </p>
        <p className="mt-1 truncate text-xs text-gray-500">
          {user.role === 'admin' ? 'Administrateur' : user.role}
        </p>
      </header>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation admin">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onLink}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item)
                        ? 'bg-pau-yellow text-pau-night'
                        : 'text-gray-700 hover:bg-gray-100'
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

      <footer className="border-t border-gray-200 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <span>↗</span>
          Voir le site public
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <span>←</span>
            Déconnexion
          </button>
        </form>
      </footer>
    </div>
  );
}

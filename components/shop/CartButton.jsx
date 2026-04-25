'use client';

import { useEffect, useState } from 'react';

import { useCart, selectCartCount } from '@/stores/cart';

export function CartButton() {
  const open = useCart((s) => s.open);
  const count = useCart(selectCartCount);

  // Évite l'hydration mismatch : le compteur ne s'affiche qu'après hydratation.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <button
      type="button"
      onClick={open}
      className="group relative flex h-10 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-blanc transition-colors hover:text-jaune"
      aria-label={`Ouvrir le panier (${hydrated ? count : 0} article${count > 1 ? 's' : ''})`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 6h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 9H6" strokeLinecap="square" />
        <circle cx="9.5" cy="21" r="1.2" />
        <circle cx="17.5" cy="21" r="1.2" />
      </svg>
      <span className="hidden sm:inline">Panier</span>
      {hydrated && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center bg-jaune px-1 font-mono text-[10px] text-nuit">
          {count}
        </span>
      )}
    </button>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { toggleFavoriteAction } from '@/app/compte/actions';

// Bouton coeur — toggle un Favorite. Si user non connecté, redirige
// vers /connexion?next=... Pas de state local trompeur — on attend la
// réponse serveur pour la cohérence.

export function FavoriteButton({ productId, isFavorite, signedIn, returnTo }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useState(isFavorite);

  function onClick() {
    if (!signedIn) {
      router.push(`/connexion?next=${encodeURIComponent(returnTo ?? '/boutique')}`);
      return;
    }
    setOptimistic((v) => !v);
    startTransition(async () => {
      const fd = new FormData();
      fd.set('productId', productId);
      const result = await toggleFavoriteAction(fd);
      if (result?.error) {
        // rollback
        setOptimistic((v) => !v);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-label={optimistic ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={optimistic}
      className={`flex h-9 w-9 items-center justify-center border transition-colors ${
        optimistic
          ? 'border-pau-yellow bg-pau-yellow text-pau-night'
          : 'border-white/20 text-white hover:bg-gray-50'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={optimistic ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

'use client';

import { useEffect } from 'react';

import { useCart } from '@/stores/cart';

// Vide le panier client une fois la commande confirmée.
// Composant minimaliste pour pouvoir être utilisé depuis un Server Component.
export function ClearCartOnMount() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}

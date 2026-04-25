'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Panier client — persisté en localStorage. La réservation de stock côté
// serveur (table CartReservation, TTL 15 min) sera créée au moment du
// passage en checkout, pas à chaque ajout.

const STORAGE_KEY = 'fcpau-cart-v1';

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (item) =>
        set((state) => {
          const qty = item.quantity ?? 1;
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
            isOpen: true,
          };
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      setQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Selectors — calculés à la demande, évitent de stocker des dérivés.
export const selectCartCount = (state) =>
  state.items.reduce((n, i) => n + i.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);

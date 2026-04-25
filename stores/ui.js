'use client';

import { create } from 'zustand';

// Store léger pour les modaux UI globaux qui n'ont pas besoin de
// persistance (newsletter, futur menu mobile, etc.).

export const useUI = create((set) => ({
  newsletterOpen: false,
  openNewsletter: () => set({ newsletterOpen: true }),
  closeNewsletter: () => set({ newsletterOpen: false }),
}));

'use client';

import { useUI } from '@/stores/ui';

// Bouton client à utiliser dans le Footer (server) pour ouvrir
// la modal newsletter.

export function NewsletterTrigger({ children, className }) {
  const open = useUI((s) => s.openNewsletter);
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

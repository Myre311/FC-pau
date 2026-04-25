'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { useCart, selectCartCount, selectCartSubtotal } from '@/stores/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const count = useCart(selectCartCount);
  const subtotal = useCart(selectCartSubtotal);

  // Bloque le scroll body quand le drawer est ouvert
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Fermeture sur Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-nuit/80 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-blanc/10 bg-nuit shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-blanc/10 px-6 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              Panier · {count} article{count > 1 ? 's' : ''}
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase leading-crush tracking-tightest">
              Votre commande
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer le panier"
            className="flex h-9 w-9 items-center justify-center text-blanc/60 transition-colors hover:text-jaune"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart onClose={close} />
          ) : (
            <ul className="divide-y divide-blanc/10">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4 px-6 py-5">
                  <div className="h-20 w-20 flex-none border border-blanc/10 bg-primaire" aria-hidden="true">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm font-medium text-blanc">
                      {item.productName}
                    </p>
                    {item.variantLabel && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
                        {item.variantLabel}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityPicker
                        value={item.quantity}
                        onChange={(q) => setQuantity(item.variantId, q)}
                      />
                      <span className="font-mono text-sm text-blanc">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    aria-label={`Retirer ${item.productName}`}
                    className="flex-none self-start text-blanc/40 transition-colors hover:text-blanc"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-blanc/10 bg-primaire/30 px-6 py-6">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/60">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-blanc/40">
              Livraison et taxes calculées au paiement
            </p>
            <Link href="/checkout" onClick={close} className="mt-5 block">
              <Button variant="primary" size="lg" className="w-full">
                Passer commande
              </Button>
            </Link>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 transition-colors hover:text-blanc"
            >
              Continuer mes achats
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

function EmptyCart({ onClose }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
        Panier vide
      </p>
      <p className="mt-4 max-w-xs font-sans text-sm text-blanc/60">
        Aucun article pour le moment. Direction la boutique pour rejoindre les
        rangs.
      </p>
      <Link href="/boutique" onClick={onClose} className="mt-8">
        <Button variant="outline" size="md">Voir la boutique</Button>
      </Link>
    </div>
  );
}

function QuantityPicker({ value, onChange }) {
  return (
    <div className="inline-flex items-center border border-blanc/15">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex h-7 w-7 items-center justify-center text-blanc/60 transition-colors hover:text-jaune"
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <span className="w-7 text-center font-mono text-xs">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-7 w-7 items-center justify-center text-blanc/60 transition-colors hover:text-jaune"
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}

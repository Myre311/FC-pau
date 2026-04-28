'use client';

import Link from 'next/link';

import { useCart, selectCartCount, selectCartSubtotal } from '@/stores/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

// Page panier plein écran. Alternative au drawer pour les visites
// directes (URL partageable, deep-link depuis email, mobile confort).
export default function PanierPage() {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);
  const count = useCart(selectCartCount);
  const subtotal = useCart(selectCartSubtotal);

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container-fc grid gap-12 py-12 md:grid-cols-[1.6fr_1fr] md:py-20">
      <section>
        <header className="border-b border-white/10 pb-6">
          <p className="badge-mono">Votre panier</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
            {count} article{count > 1 ? 's' : ''}
          </h1>
        </header>

        <ul className="divide-y divide-blanc/10">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-5 py-6">
              <div className="h-28 w-28 flex-none border border-white/10 bg-pau-primary">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/boutique/${item.productSlug}`}
                  className="block font-sans text-base font-medium uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
                >
                  {item.productName}
                </Link>
                {item.variantLabel && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {item.variantLabel}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <QuantityPicker
                    value={item.quantity}
                    onChange={(q) => setQuantity(item.variantId, q)}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between text-right">
                <span className="font-mono text-base text-white">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
                {item.quantity > 1 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {formatPrice(item.unitPrice)} × {item.quantity}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <Link
            href="/boutique"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-pau-yellow"
          >
            ← Continuer mes achats
          </Link>
          <button
            type="button"
            onClick={clear}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Vider le panier
          </button>
        </div>
      </section>

      <aside className="self-start border border-white/10 bg-pau-primary/30 p-6 md:sticky md:top-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          Récapitulatif
        </p>

        <dl className="mt-5 space-y-3 font-mono text-sm">
          <div className="flex items-center justify-between text-white/70">
            <dt>Sous-total</dt>
            <dd className="text-white">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <dt>Livraison</dt>
            <dd className="text-white/40">Calculée au paiement</dd>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <dt>Code promo</dt>
            <dd className="text-white/40">À l&apos;étape suivante</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Total estimé
          </span>
          <span className="font-display text-3xl uppercase leading-crush text-white">
            {formatPrice(subtotal)}
          </span>
        </div>

        <Link href="/checkout" className="mt-6 block">
          <Button variant="primary" size="lg" cornerCut className="w-full">
            Passer commande
          </Button>
        </Link>

        <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-white/40">
          Paiement sécurisé Stripe — Visa, Mastercard, Apple Pay, Google Pay.
        </p>
      </aside>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="container-fc flex flex-col items-center py-24 text-center md:py-32">
      <p className="badge-mono">Panier vide</p>
      <h1 className="mt-4 font-display text-6xl uppercase leading-crush tracking-tightest md:text-7xl">
        RIEN ENCORE
      </h1>
      <p className="mt-6 max-w-md font-sans text-base text-white/60">
        Direction la boutique pour rejoindre les rangs. Maillots, lifestyle,
        accessoires — il y a forcément quelque chose à votre taille.
      </p>
      <Link href="/boutique" className="mt-10">
        <Button variant="primary" size="lg" cornerCut>
          Voir la boutique
        </Button>
      </Link>
    </div>
  );
}

function QuantityPicker({ value, onChange }) {
  return (
    <div className="inline-flex items-center border border-white/15">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors hover:text-pau-yellow"
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <span className="w-9 text-center font-mono text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors hover:text-pau-yellow"
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}

'use client';

import { useCart, selectCartSubtotal } from '@/stores/cart';
import { formatPrice } from '@/lib/format';

// Récap panier coté checkout — lecture seule (modification revient sur /panier).
export function CheckoutSummary() {
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectCartSubtotal);

  const shippingEstimate = subtotal === 0 ? 0 : subtotal >= 8000 ? 0 : 590;
  const total = subtotal + shippingEstimate;

  return (
    <div className="border border-pau-night/10 bg-white border-pau-night/10 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
        Récapitulatif · {items.length} ligne{items.length > 1 ? 's' : ''}
      </p>

      <ul className="mt-5 divide-y divide-pau-primary/10">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-3 py-3">
            <div className="h-14 w-14 flex-none border border-pau-night/10 bg-gradient-to-br from-pau-primary to-pau-night">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-xs uppercase tracking-wide text-pau-night">
                {item.productName}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-pau-night/50">
                {item.variantLabel} · ×{item.quantity}
              </p>
            </div>
            <span className="self-center font-mono text-xs text-pau-night">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2 border-t border-pau-night/10 pt-5 font-mono text-xs">
        <div className="flex justify-between text-pau-night/70">
          <dt>Sous-total</dt>
          <dd className="text-pau-night">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-pau-night/70">
          <dt>Livraison</dt>
          <dd className={shippingEstimate === 0 ? 'text-pau-yellow' : 'text-pau-night'}>
            {shippingEstimate === 0 ? 'Offerte' : formatPrice(shippingEstimate)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-pau-night/10 pt-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-night/60">
          Total
        </span>
        <span className="font-display text-2xl uppercase leading-crush text-pau-night">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}

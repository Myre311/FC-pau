'use client';

import { useState } from 'react';

import { useCart } from '@/stores/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

// Formulaire client : sélection de variante + ajout au panier.
// Le serveur fournit la liste des variantes avec leur stock.
// `variants` : [{ id, sku, size, priceOverride, stockItem: { onHand, reserved } }]
export function AddToCartForm({ product, variants }) {
  const inStockVariants = variants.filter(
    (v) => (v.stockItem?.onHand ?? 0) - (v.stockItem?.reserved ?? 0) > 0,
  );

  const initial = inStockVariants[0] ?? variants[0] ?? null;
  const [selectedId, setSelectedId] = useState(initial?.id ?? null);
  const addItem = useCart((s) => s.addItem);

  if (!variants.length) {
    return (
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-pau-primary/40">
        Aucune variante disponible
      </p>
    );
  }

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];
  const unitPrice = selected.priceOverride ?? product.basePrice;
  const available =
    (selected.stockItem?.onHand ?? 0) - (selected.stockItem?.reserved ?? 0);
  const isOut = available <= 0;

  const handleAdd = () => {
    if (!selected || isOut) return;
    addItem({
      variantId: selected.id,
      productSlug: product.slug,
      productName: product.name,
      variantLabel: selected.size ? `Taille ${selected.size}` : null,
      unitPrice,
      image: product.images?.[0] ?? null,
      quantity: 1,
    });
  };

  return (
    <div className="space-y-6">
      {variants.some((v) => v.size) && (
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/60">
            Taille
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const stock =
                (v.stockItem?.onHand ?? 0) - (v.stockItem?.reserved ?? 0);
              const disabled = stock <= 0;
              const active = v.id === selectedId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedId(v.id)}
                  disabled={disabled}
                  className={`min-w-12 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? 'border border-pau-night bg-pau-night text-white'
                      : 'border border-gray-200 text-pau-primary hover:bg-gray-50'
                  } ${disabled ? 'cursor-not-allowed opacity-30 line-through hover:bg-transparent' : ''}`}
                  aria-pressed={active}
                  aria-label={`Taille ${v.size}${disabled ? ' — épuisée' : ''}`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-pau-primary/10 pt-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl uppercase leading-crush text-pau-yellow">
            {formatPrice(unitPrice)}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/60">
            {isOut
              ? 'Rupture sur cette taille'
              : available <= 5
                ? `Plus que ${available} en stock`
                : 'En stock'}
          </p>
        </div>
        <Button
          onClick={handleAdd}
          disabled={isOut}
          variant="primary"
          size="lg"
          cornerCut
          className="md:min-w-[220px]"
        >
          {isOut ? 'Indisponible' : 'Ajouter au panier'}
        </Button>
      </div>
    </div>
  );
}

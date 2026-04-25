import Link from 'next/link';
import Image from 'next/image';

import { formatPrice } from '@/lib/format';

// Carte produit — server component.
// `product` doit contenir : slug, name, basePrice, images[], variants[].stockItem.onHand
export function ProductCard({ product }) {
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stockItem?.onHand ?? 0),
    0,
  ) ?? 0;
  const isOut = totalStock === 0;

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-jaune"
      aria-label={`${product.name} — ${formatPrice(product.basePrice)}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-blanc/10 bg-primaire">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl text-blanc/10">
            FC
          </div>
        )}

        {product.featured && !isOut && (
          <span className="absolute left-3 top-3 bg-jaune px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-nuit">
            Mise en avant
          </span>
        )}
        {isOut && (
          <span className="absolute left-3 top-3 bg-nuit/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc">
            Rupture
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-sans text-sm font-medium uppercase tracking-wide text-blanc transition-colors group-hover:text-jaune">
            {product.name}
          </p>
          {product.category?.name && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
              {product.category.name}
            </p>
          )}
        </div>
        <p className="font-mono text-sm text-blanc">
          {formatPrice(product.basePrice)}
        </p>
      </div>
    </Link>
  );
}

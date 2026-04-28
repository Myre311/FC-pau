import Link from 'next/link';
import Image from 'next/image';

import { formatPrice } from '@/lib/format';

export function ProductCard({ product }) {
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stockItem?.onHand ?? 0),
    0,
  ) ?? 0;
  const isOut = totalStock === 0;

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group block border border-gray-200 transition-all hover:scale-[1.02] hover:border-pau-yellow hover:shadow-lg"
      aria-label={`${product.name} — ${formatPrice(product.basePrice)}`}
    >
      <article>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Tags */}
          {(product.featured || isOut || product.customizable) && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.featured && !isOut && (
                <span className="bg-pau-yellow px-2 py-1 font-mono text-xs uppercase text-pau-night">
                  Top
                </span>
              )}
              {isOut && (
                <span className="border border-red-500 bg-red-500/10 px-2 py-1 font-mono text-xs uppercase text-red-600">
                  Rupture
                </span>
              )}
              {product.customizable && !isOut && (
                <span className="border border-pau-yellow bg-pau-yellow/10 px-2 py-1 font-mono text-xs uppercase text-pau-yellow">
                  Perso 3D
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-4">
          {product.category?.name && (
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-pau-yellow">
              {product.category.name}
            </p>
          )}
          <h3 className="mb-2 font-display text-sm font-bold uppercase text-pau-primary">
            {product.name}
          </h3>
          <p className="font-display text-lg font-black text-pau-yellow">
            {formatPrice(product.basePrice)}
          </p>
        </div>
      </article>
    </Link>
  );
}

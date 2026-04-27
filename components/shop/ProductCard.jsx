import Link from 'next/link';
import Image from 'next/image';

import { formatPrice } from '@/lib/format';

// Carte produit — port direct de la maquette HTML (.pc).
// Clip-path bottom-right + border + glow card-hover + image scale + overlay
// "Voir le produit" + tag rupture/featured + initiale géante en filigrane.
export function ProductCard({ product, featured = false }) {
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stockItem?.onHand ?? 0),
    0,
  ) ?? 0;
  const isOut = totalStock === 0;
  const initial = product.name?.[0]?.toUpperCase() ?? 'F';

  const cardHeight = featured ? 'min-h-[520px]' : '';
  const hoverTranslate = featured ? 'hover:-translate-y-[14px]' : 'hover:-translate-y-[12px]';
  const cardShadow = featured ? 'hover:shadow-card-hover-strong' : 'hover:shadow-card-hover';

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-pau-yellow focus-visible:ring-offset-4"
      aria-label={`${product.name} — ${formatPrice(product.basePrice)}`}
    >
      <article
        className={`relative cursor-pointer overflow-hidden border border-pau-primary/10 bg-white transition-[border-color,box-shadow,transform] duration-400 ease-premium ${hoverTranslate} hover:border-pau-yellow ${cardShadow} ${cardHeight}`}
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-pau-primary to-pau-night">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="select-none font-display text-[78px] leading-none tracking-[-0.04em] text-pau-yellow/20 transition-[transform,color] duration-500 group-hover:rotate-[5deg] group-hover:scale-110 group-hover:text-pau-yellow/30"
            >
              {initial}
            </span>
          )}

          {/* Gradient bas pour lisibilité - plus léger */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black/30" />

          {/* Tags */}
          <div className="absolute left-[10px] top-[10px] z-10 flex flex-col gap-1">
            {product.featured && !isOut && (
              <span className="bg-pau-yellow px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-pau-night">
                ★ Top
              </span>
            )}
            {isOut && (
              <span className="border border-red-500/30 bg-red-500/20 px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-red-600">
                Rupture
              </span>
            )}
            {product.customizable && !isOut && (
              <span className="border border-pau-yellow/50 bg-pau-yellow/10 px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-pau-yellow">
                Perso 3D
              </span>
            )}
          </div>

          {/* Overlay hover "Voir le produit" */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 opacity-0 backdrop-blur-[3px] transition-opacity duration-200 group-hover:opacity-100">
            <span className="inline-flex items-center gap-[7px] bg-pau-yellow px-[18px] py-[9px] font-display text-[11px] uppercase tracking-[0.14em] text-pau-night">
              Voir le produit
              <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-pau-night" fill="none" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
              </svg>
            </span>
          </div>
        </div>

        <div className={`px-4 pb-4 ${featured ? 'pt-5' : 'pt-[14px]'} bg-white`}>
          {product.category?.name && (
            <p className={`mb-[5px] font-mono uppercase tracking-[0.16em] text-pau-yellow ${featured ? 'text-[9.5px]' : 'text-[8.5px]'}`}>
              {product.category.name}
            </p>
          )}
          <h3 className={`mb-[13px] font-display uppercase leading-crush-soft tracking-[0.02em] text-pau-primary ${featured ? 'text-[19px]' : 'text-[16px]'}`}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className={`font-display leading-none text-pau-yellow ${featured ? 'text-[26px]' : 'text-[21px]'}`}>
              {formatPrice(product.basePrice)}
            </p>
            <span className={`flex items-center justify-center border border-pau-primary/20 bg-pau-primary/5 transition-all duration-300 group-hover:border-pau-yellow group-hover:bg-pau-yellow group-hover:scale-110 ${featured ? 'h-[36px] w-[36px]' : 'h-[31px] w-[31px]'}`}>
              <svg viewBox="0 0 24 24" className={`stroke-pau-primary transition-colors group-hover:stroke-pau-night ${featured ? 'h-[15px] w-[15px]' : 'h-[13px] w-[13px]'}`} fill="none" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="square" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

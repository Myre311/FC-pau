import Link from 'next/link';
import Image from 'next/image';

import { formatPrice } from '@/lib/format';

// Carte produit — port direct de la maquette HTML (.pc).
// Clip-path bottom-right + border + glow card-hover + image scale + overlay
// "Voir le produit" + tag rupture/featured + initiale géante en filigrane.
export function ProductCard({ product }) {
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stockItem?.onHand ?? 0),
    0,
  ) ?? 0;
  const isOut = totalStock === 0;
  const initial = product.name?.[0]?.toUpperCase() ?? 'F';

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-jaune"
      aria-label={`${product.name} — ${formatPrice(product.basePrice)}`}
    >
      <article
        className="clip-card relative cursor-pointer overflow-hidden border border-blanc/[0.07] bg-gradient-to-br from-[#141728] to-[#0c0f1e] transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[7px] hover:border-jaune/30 hover:shadow-card-hover"
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-[#18213c] to-[#0b1020]">
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
              className="select-none font-display text-[78px] leading-none tracking-[-0.04em] text-jaune/[0.07] transition-[transform,color] duration-500 group-hover:rotate-[5deg] group-hover:scale-110 group-hover:text-jaune/[0.13]"
            >
              {initial}
            </span>
          )}

          {/* Gradient bas pour lisibilité */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/[0.55]" />

          {/* Tags */}
          <div className="absolute left-[10px] top-[10px] z-10 flex flex-col gap-1">
            {product.featured && !isOut && (
              <span className="bg-jaune px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-nuit">
                Top vente
              </span>
            )}
            {isOut && (
              <span className="border border-red-400/25 bg-red-500/15 px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-red-300">
                Rupture
              </span>
            )}
            {product.customizable && !isOut && (
              <span className="border border-jaune/30 bg-transparent px-[8px] py-[3px] font-display text-[9px] uppercase leading-[1.4] tracking-[0.14em] text-jaune/80">
                Perso
              </span>
            )}
          </div>

          {/* Overlay hover "Voir le produit" */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-nuit/[0.72] opacity-0 backdrop-blur-[3px] transition-opacity duration-200 group-hover:opacity-100">
            <span className="clip-cta inline-flex items-center gap-[7px] bg-jaune px-[18px] py-[9px] font-display text-[11px] uppercase tracking-[0.14em] text-nuit">
              Voir le produit
              <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-nuit" fill="none" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
              </svg>
            </span>
          </div>
        </div>

        <div className="px-4 pb-4 pt-[14px]">
          {product.category?.name && (
            <p className="mb-[5px] font-mono text-[8.5px] uppercase tracking-[0.16em] text-blanc/20">
              {product.category.name}
            </p>
          )}
          <h3 className="mb-[13px] font-display text-[16px] uppercase leading-[1.05] tracking-[0.02em] text-blanc">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-display text-[21px] leading-none text-jaune">
              {formatPrice(product.basePrice)}
            </p>
            <span className="clip-cta flex h-[31px] w-[31px] items-center justify-center border border-jaune/20 bg-jaune/[0.08] transition-colors group-hover:border-jaune group-hover:bg-jaune">
              <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] stroke-jaune transition-colors group-hover:stroke-nuit" fill="none" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="square" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

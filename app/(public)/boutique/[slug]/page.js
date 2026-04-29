import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/prisma';
import { AddToCartForm } from '@/components/shop/AddToCartForm';
import { formatPrice } from '@/lib/format';

// Stock par variante affiche en temps reel : pas de cache statique.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    select: { name: true, description: true, status: true },
  });
  if (!product || product.status !== 'active') return { title: 'Produit introuvable' };
  return {
    title: product.name,
    description: product.description ?? `${product.name} — boutique officielle du Pau FC.`,
  };
}

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      variants: {
        include: { stockItem: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!product || product.status !== 'active') notFound();

  const totalStock = product.variants.reduce(
    (sum, v) => sum + (v.stockItem?.onHand ?? 0),
    0,
  );

  return (
    <article className="min-h-screen bg-white">
      <div className="container-fc grid gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        {/* Galerie */}
        <div className="space-y-3">
          <div className="relative aspect-square w-full overflow-hidden border border-pau-primary/10 bg-gradient-to-br from-pau-primary to-pau-night">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-[20vw] text-pau-yellow/20 md:text-[10vw]">
                FC
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1, 5).map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-square overflow-hidden border border-pau-primary/10 bg-gradient-to-br from-pau-primary to-pau-night"
                >
                  <Image
                    src={src}
                    alt=·
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col">
          <nav className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/50">
            <Link href="/boutique" className="hover:text-pau-yellow">
              Boutique
            </Link>
            {product.category && (
              <>
                {' / '}
                <Link
                  href={`/boutique/categorie/${product.category.slug}`}
                  className="hover:text-pau-yellow"
                >
                  {product.category.name}
                </Link>
              </>
            )}
          </nav>

          <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            {product.name}
          </h1>

          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-pau-yellow">
            {formatPrice(product.basePrice)}
          </p>

          {product.description && (
            <p className="mt-6 max-w-prose font-sans text-base leading-relaxed text-pau-primary/70">
              {product.description}
            </p>
          )}

          <div className="mt-10">
            <AddToCartForm product={product} variants={product.variants} />
          </div>

          {product.customizable && (
            <Link
              href={`/boutique/${product.slug}/personnaliser`}
              className="mt-6 inline-flex items-center gap-3 self-start border-b border-pau-yellow/40 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow transition-colors "
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8M21 7v6h-6" strokeLinecap="square" />
              </svg>
              Personnaliser le flocage
            </Link>
          )}

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-pau-primary/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em]">
            <div>
              <dt className="text-pau-primary/40">Stock total</dt>
              <dd className="mt-1 text-pau-primary">{totalStock}</dd>
            </div>
            <div>
              <dt className="text-pau-primary/40">Variantes</dt>
              <dd className="mt-1 text-pau-primary">{product.variants.length}</dd>
            </div>
            <div>
              <dt className="text-pau-primary/40">Saison</dt>
              <dd className="mt-1 text-pau-primary">25-26</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

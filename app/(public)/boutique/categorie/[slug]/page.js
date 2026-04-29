import { notFound } from 'next/navigation';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/ProductCard';

// Stock realtime — pas de cache statique.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    select: { name: true },
  });
  if (!category) return { title: 'Catégorie introuvable' };
  return {
    title: category.name,
    description: `${category.name} — boutique officielle du Pau FC.`,
  };
}

export default async function CategoryPage({ params }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { status: 'active' },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        include: {
          category: true,
          variants: { include: { stockItem: true } },
        },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-pau-night">
      <section className="container-pau pt-12 pb-8 md:pt-20 md:pb-12">
        <nav className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          <Link href="/boutique" className="hover:text-pau-yellow">
            Boutique
          </Link>
          {' / '}
          <span className="text-white">{category.name}</span>
        </nav>

        <h1 className="mt-6 font-display text-[16vw] uppercase leading-crush tracking-tightest text-white md:text-[10vw] lg:text-[140px]">
          {category.name}
        </h1>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
          {category.products.length} produit
          {category.products.length > 1 ? 's' : ''}
        </p>
      </section>

      <section className="container-pau pb-24">
        {category.products.length === 0 ? (
          <div className="border border-dashed border-white/15 px-6 py-20 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
              Bientôt disponible
            </p>
            <p className="mt-4 font-sans text-white/60">
              Cette catégorie ne contient pas encore de produit publié.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

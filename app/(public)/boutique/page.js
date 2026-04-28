import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/ProductCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const metadata = {
  title: 'Boutique',
  description:
    'Maillots, lifestyle, accessoires — la boutique officielle du Pau FC. Configurez votre flocage et soutenez le club.',
};

export const dynamic = 'force-dynamic';

export default async function BoutiquePage() {
  const products = await prisma.product.findMany({
    where: { status: 'active' },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    include: {
      category: true,
      variants: { include: { stockItem: true } },
    },
  });

  const featured = products.filter((p) => p.featured);

  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-boutique.jpg"
          alt="Boutique Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Catalogue officiel · Saison 2025-2026
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              La Boutique
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Maillots, lifestyle, accessoires. Flocage personnalisable.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
            <h2 className="font-mono text-xs uppercase tracking-wider text-pau-primary">
              {products.length} produit{products.length > 1 ? 's' : ''}
            </h2>
            {featured.length > 0 && (
              <span className="font-mono text-xs uppercase tracking-wider text-pau-primary/60">
                {featured.length} mis{featured.length > 1 ? 'es' : 'e'} en avant
              </span>
            )}
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <EmptyCatalog />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, idx) => (
              <ScrollReveal key={p.id} delay={idx * 50}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyCatalog() {
  return (
    <div className="py-20 text-center">
      <p className="text-sm text-pau-primary/40">
        Aucun produit disponible pour le moment.
      </p>
    </div>
  );
}

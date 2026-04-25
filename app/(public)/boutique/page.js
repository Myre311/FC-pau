import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata = {
  title: 'Boutique',
  description:
    'Maillots, lifestyle, accessoires — la boutique officielle du Pau FC. Configurez votre flocage et soutenez le club.',
};

// Stock unifie POS + en ligne : pas de cache statique, on lit la BDD
// a chaque requete pour eviter d'afficher du stock perime.
export const dynamic = 'force-dynamic';

// Server Component — Next 14 App Router. Pas de useEffect, fetch direct
// via Prisma au rendu.
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
    <>
      <section className="container-fc pt-16 pb-10 md:pt-24 md:pb-16">
        <p className="badge-mono">Catalogue officiel · Saison 2025-2026</p>
        <h1 className="mt-6 text-[18vw] md:text-[12vw] lg:text-[160px]">
          LA<br />
          <span className="text-jaune">BOUTIQUE</span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Maillots, lifestyle, accessoires. Stocks réels caisse + entrepôt,
          flocage personnalisable sur les maillots officiels.
        </p>
      </section>

      <section className="container-fc pb-24">
        <div className="mb-8 flex items-end justify-between border-b border-blanc/10 pb-5">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </h2>
          {featured.length > 0 && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
              {featured.length} mis{featured.length > 1 ? 'es' : 'e'} en avant
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <EmptyCatalog />
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyCatalog() {
  return (
    <div className="border border-dashed border-blanc/15 px-6 py-20 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
        Catalogue vide
      </p>
      <p className="mt-4 font-sans text-blanc/60">
        Aucun produit publié pour le moment. Lance le seed (
        <code className="font-mono text-blanc">npm run db:seed</code>) pour
        peupler la boutique.
      </p>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/ProductCard';
import { CategoryNav } from '@/components/shop/CategoryNav';
import { Topbar } from '@/components/layout/Topbar';

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
      {/* Bandeau livraison 120€ - uniquement sur la boutique */}
      <div className="sticky top-[calc(theme(spacing.16)+theme(spacing.14))] z-40 md:top-[calc(theme(spacing.20)+theme(spacing.16))]">
        <Topbar />
      </div>

      {/* Navigation catégories */}
      <CategoryNav />

      <section className="container-fc py-[clamp(80px,12vh,160px)]">
        <p className="badge-mono">Catalogue officiel · Saison 2025-2026</p>
        <h1 className="mt-8 font-display text-[clamp(52px,12vw,160px)] uppercase leading-crush tracking-display-tight">
          LA<br />
          <span className="text-jaune">BOUTIQUE</span>
        </h1>
        <p className="mt-8 max-w-2xl font-sans text-[17px] leading-relaxed text-blanc/85">
          Maillots, lifestyle, accessoires. Stocks réels caisse + entrepôt,
          flocage personnalisable sur les maillots officiels.
        </p>
      </section>

      <section className="container-fc pb-32">
        <div className="mb-12 flex items-end justify-between border-b border-blanc/10 pb-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </h2>
          {featured.length > 0 && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
              {featured.length} mis{featured.length > 1 ? 'es' : 'e'} en avant
            </span>
          )}
        </div>

        {products.length === 0 ? (
          <EmptyCatalog />
        ) : (
          <AsymmetricProductGrid products={products} />
        )}
      </section>
    </>
  );
}

// Grille asymétrique Nike-level : featured items en 2-col span, pattern varié
function AsymmetricProductGrid({ products }) {
  const featured = products.filter(p => p.featured);
  const regular = products.filter(p => !p.featured);

  return (
    <div className="space-y-16">
      {/* Featured products - large cards */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {featured.slice(0, 2).map((p, idx) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <ProductCard product={p} featured />
            </div>
          ))}
        </div>
      )}

      {/* Regular products - asymmetric grid pattern */}
      {regular.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {regular.map((p, idx) => {
            // Pattern 2-1-1 / 1-2-1 / 1-1-2
            const spanClass = (() => {
              const position = idx % 9;
              if (position === 0 || position === 4 || position === 8) {
                return 'lg:col-span-2';
              }
              return '';
            })();

            return (
              <div
                key={p.id}
                className={`animate-fade-up ${spanClass}`}
                style={{ animationDelay: `${(idx + featured.length) * 0.08}s` }}
              >
                <ProductCard product={p} />
              </div>
            );
          })}
        </div>
      )}

      {/* Remaining featured if more than 2 */}
      {featured.length > 2 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {featured.slice(2).map((p, idx) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{ animationDelay: `${(idx + regular.length + 2) * 0.1}s` }}
            >
              <ProductCard product={p} featured />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyCatalog() {
  return (
    <div className="border border-dashed border-blanc/15 px-6 py-20 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
        Catalogue vide
      </p>
      <p className="mt-4 font-sans text-blanc/85">
        Aucun produit publié pour le moment. Lance le seed (
        <code className="font-mono text-jaune">npm run db:seed</code>) pour
        peupler la boutique.
      </p>
    </div>
  );
}

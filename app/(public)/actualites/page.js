import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/vitrine/ArticleCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Actualités',
  description:
    'Toute l’actualité du Pau FC — résumés de matchs, mercato, fondation et vie du club.',
};

export default async function ActualitesPage() {
  const articles = await prisma.article.findMany({
    where: { publishedAt: { not: null, lte: new Date() } },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take: 24,
  });

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      <section className="container-fc py-[clamp(80px,12vh,160px)]">
        <p className="badge-mono">Vie du club · Mercato · Matchday</p>
        <h1 className="mt-8 font-display text-[clamp(48px,11vw,150px)] uppercase leading-crush tracking-display-tight">
          ACTUA<span className="text-jaune">LITÉS</span>
        </h1>
      </section>

      {articles.length === 0 ? (
        <section className="container-fc pb-24">
          <div className="border border-dashed border-blanc/15 p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              Aucune actualité publiée
            </p>
            <p className="mt-4 font-sans text-blanc/60">
              Les premières publications arriveront bientôt.
            </p>
          </div>
        </section>
      ) : (
        <>
          {featured && (
            <section className="container-fc pb-10 md:pb-16">
              <ArticleCard article={featured} featured />
            </section>
          )}

          {rest.length > 0 && (
            <section className="container-fc border-t border-blanc/10 py-12 md:py-16">
              <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
                Toutes les actualités · {rest.length}
              </h2>
              <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

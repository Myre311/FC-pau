import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/vitrine/ArticleCard';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Actualités',
  description:
    'Toute l\'actualité du Pau FC — résumés de matchs, mercato, fondation et vie du club.',
};

export default async function ActualitesPage() {
  const articles = await prisma.article.findMany({
    where: { publishedAt: { not: null, lte: new Date() } },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take: 24,
  }).catch(() => []);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      <PageHero
        image="/images/hero-actualites.jpg"
        surtitle="Vie du club · Mercato · Matchday"
        title="ACTUALITÉS"
        subtitle="Toute l'actualité du Pau FC — résumés de matchs, mercato, fondation et vie du club."
      />

      <SectionLight>
        {articles.length === 0 ? (
          <div className="border border-dashed border-pau-primary/15 p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary">
              Aucune actualité publiée
            </p>
            <p className="mt-4 font-sans text-pau-primary/60">
              Les premières publications arriveront bientôt.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-10 md:mb-16">
                <ArticleCard article={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <div className="border-t border-pau-primary/10 pt-12 md:pt-16">
                <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
                  Toutes les actualités · {rest.length}
                </h2>
                <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </SectionLight>
    </>
  );
}

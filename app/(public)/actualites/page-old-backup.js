import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/vitrine/ArticleCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-actualites.jpg"
          alt="Actualités Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Vie du club · Mercato · Matchday
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              Actualités
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Toute l'actualité du Pau FC — résumés de matchs, mercato, fondation et vie du club.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-pau-primary/40">
              Aucune actualité pour le moment.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <ScrollReveal>
                <div className="mb-12">
                  <ArticleCard article={featured} featured />
                </div>
              </ScrollReveal>
            )}

            {rest.length > 0 && (
              <div className="border-t border-gray-200 pt-12">
                <ScrollReveal>
                  <h2 className="mb-8 font-mono text-xs uppercase tracking-wider text-pau-yellow">
                    Toutes les actualités · {rest.length}
                  </h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a, idx) => (
                    <ScrollReveal key={a.id} delay={idx * 50}>
                      <ArticleCard article={a} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Actualités — Pau FC',
  description: 'Toutes les actualités du Pau FC : équipe pro, academy, club.',
};

export default async function ActualitesPage() {
  // Récupérer toutes les actualités publiées
  const articles = await prisma.article
    .findMany({
      where: {
        publishedAt: { lte: new Date() },
        status: 'published',
      },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    })
    .catch(() => []);

  return (
    <div className="min-h-screen bg-pau-night">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] bg-pau-night">
        <Image
          src="/images/hero-actualites.jpg"
          alt="Actualités Pau FC"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />
        <div className="container-pau relative flex h-full items-end pb-16">
          <div>
            <span className="font-mono text-xs uppercase text-pau-yellow">Toute l'actualité</span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase text-white md:text-6xl">
              Actualités
            </h1>
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="bg-pau-night pb-20 pt-14 md:pb-28 md:pt-18">
        <div className="container-pau">
          {articles.length === 0 ? (
            <p className="py-12 text-center font-sans text-lg text-white/60">
              Aucune actualité publiée pour le moment.
            </p>
          ) : (
            <div className="mx-auto max-w-4xl space-y-12">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Composant Article Card (liste verticale)
function ArticleCard({ article }) {
  return (
    <Link href={`/actualites/${article.slug}`}>
      <article className="group border border-white/10 bg-pau-primary transition-all hover:border-2 hover:border-pau-yellow">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-pau-night/80">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-pau-primary to-pau-night">
              <span className="font-display text-4xl font-bold text-white/20">
                PAU FC
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6 md:p-8">
          {/* Date + Catégorie */}
          <div className="mb-4 flex items-center gap-4">
            <time className="font-sans text-sm text-white/60">
              {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {article.category && (
              <span className="inline-block border border-pau-yellow bg-pau-yellow px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
                {article.category}
              </span>
            )}
          </div>

          {/* Titre */}
          <h2 className="mb-3 font-display text-2xl font-bold uppercase leading-tight text-white group-hover:text-pau-yellow md:text-3xl">
            {article.title}
          </h2>

          {/* Extrait */}
          <p className="mb-4 font-sans text-base leading-relaxed text-white/70">
            {article.excerpt}
          </p>

          {/* Lien */}
          <span className="inline-block font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-transform group-hover:translate-x-2">
            Lire la suite →
          </span>
        </div>
      </article>
    </Link>
  );
}

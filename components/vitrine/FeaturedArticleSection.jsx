'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Section Article principal + articles secondaires - Homepage
 * Format magazine éditorial
 */
export function FeaturedArticleSection({ featuredArticle, sideArticles = [] }) {
  if (!featuredArticle) return null;

  return (
    <section className="bg-pau-night py-16 md:py-24">
      <div className="container-pau">
        <div className="mb-12">
          <span className="badge-mono text-pau-yellow">À la une</span>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
            Actualités du club
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Article principal (2/3) */}
          <Link
            href={`/actualites/${featuredArticle.slug}`}
            className="group md:col-span-2"
          >
            <article className="relative h-full overflow-hidden border-2 border-white/10 bg-white/5 transition-all duration-300 hover:border-pau-yellow">
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
                <Image
                  src={featuredArticle.coverImageUrl || '/images/placeholder.jpg'}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/40 to-transparent" />
              </div>

              {/* Contenu superposé */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Catégorie */}
                {featuredArticle.category && (
                  <span className="mb-3 inline-block border border-pau-yellow bg-pau-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
                    {featuredArticle.category}
                  </span>
                )}

                {/* Titre */}
                <h3 className="mb-3 font-display text-2xl font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                  {featuredArticle.title}
                </h3>

                {/* Extrait */}
                <p className="mb-4 line-clamp-2 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                  {featuredArticle.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4">
                  <time className="font-sans text-sm text-white/60">
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-transform group-hover:translate-x-1">
                    Lire l'article →
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* Articles secondaires (1/3) */}
          <div className="flex flex-col gap-6">
            {sideArticles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group"
              >
                <article className="flex h-full flex-col border-2 border-white/10 bg-white/5 transition-all duration-300 hover:border-pau-yellow hover:bg-white/10">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.coverImageUrl || '/images/placeholder.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Catégorie */}
                    {article.category && (
                      <span className="mb-2 inline-block w-fit border border-pau-yellow/50 bg-pau-yellow/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-pau-yellow">
                        {article.category}
                      </span>
                    )}

                    {/* Titre */}
                    <h4 className="mb-2 font-display text-lg font-bold uppercase leading-tight text-white group-hover:text-pau-yellow">
                      {article.title}
                    </h4>

                    {/* Extrait */}
                    <p className="mb-3 line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-white/70">
                      {article.excerpt}
                    </p>

                    {/* Date */}
                    <time className="font-sans text-xs text-white/50">
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Lien vers toutes les actualités */}
        <div className="mt-8 text-center md:mt-12">
          <Link
            href="/actualites"
            className="inline-block border-2 border-pau-yellow bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
          >
            Toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
}

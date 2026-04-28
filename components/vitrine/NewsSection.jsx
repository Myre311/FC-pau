'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Section Actualités - Homepage
 */
export function NewsSection({ articles = [] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-pau">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="badge-mono text-pau-primary">Actualités</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Dernières news
            </h2>
          </div>
          <Link
            href="/actualites"
            className="hidden font-display text-sm font-bold uppercase tracking-wide text-pau-primary transition-colors hover:text-pau-yellow md:block"
          >
            Toutes les actualités →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden border-2 border-pau-night/10 bg-white transition-all hover:border-pau-yellow hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-pau-night/5">
                <Image
                  src={article.coverImageUrl || '/images/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                {article.category && (
                  <span className="mb-3 inline-block border border-pau-yellow bg-pau-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-pau-night">
                    {article.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="mb-3 font-display text-xl font-bold uppercase leading-tight text-pau-night group-hover:text-pau-primary">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-2 font-sans text-sm leading-relaxed text-pau-night/70">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between border-t border-pau-night/10 pt-4">
                  <time className="font-sans text-xs text-pau-night/50">
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="font-display text-xs font-bold uppercase tracking-wide text-pau-primary transition-colors hover:text-pau-yellow"
                  >
                    Lire →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile voir tout */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/actualites"
            className="inline-block border-2 border-pau-night bg-white px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-colors hover:bg-pau-night hover:text-white"
          >
            Toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
}

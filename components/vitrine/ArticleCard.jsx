import Link from 'next/link';
import Image from 'next/image';

import { ARTICLE_CATEGORY_LABELS, formatArticleDate } from '@/lib/labels';

export function ArticleCard({ article, featured = false }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className={`group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-pau-yellow ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden border border-white/10 bg-pau-primary ${
          featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      >
        {article.coverImageUrl ? (
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl uppercase text-white/10">
            {ARTICLE_CATEGORY_LABELS[article.category]?.[0] ?? '·'}
          </div>
        )}
        <span className="absolute left-3 top-3 bg-pau-yellow px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-pau-night">
          {ARTICLE_CATEGORY_LABELS[article.category]}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {formatArticleDate(article.publishedAt ?? article.createdAt)}
        </p>
        <h3
          className={`mt-2 font-display uppercase leading-crush tracking-tightest text-white transition-colors group-hover:text-pau-yellow ${
            featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-white/60">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

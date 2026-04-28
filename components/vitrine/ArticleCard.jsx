import Link from 'next/link';
import Image from 'next/image';

import { ARTICLE_CATEGORY_LABELS, formatArticleDate } from '@/lib/labels';

export function ArticleCard({ article, featured = false }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className={`group block border border-gray-200 transition-all hover:scale-[1.02] hover:bg-gray-50 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-gray-50 ${
          featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      >
        {article.coverImageUrl && (
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 bg-pau-yellow px-2 py-1 font-mono text-xs uppercase tracking-wider text-pau-night">
          {ARTICLE_CATEGORY_LABELS[article.category]}
        </span>
      </div>

      <div className="p-4">
        <p className="font-mono text-xs uppercase tracking-wider text-pau-primary/50">
          {formatArticleDate(article.publishedAt ?? article.createdAt)}
        </p>
        <h3
          className={`mt-2 font-display font-bold uppercase text-pau-primary ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-pau-primary/60">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

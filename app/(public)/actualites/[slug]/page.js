import { notFound } from 'next/navigation';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/vitrine/ArticleCard';
import { ARTICLE_CATEGORY_LABELS, formatArticleDate } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { title: true, excerpt: true, publishedAt: true },
  });
  if (!article || !article.publishedAt) return { title: 'Article introuvable' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article || !article.publishedAt) notFound();

  const related = await prisma.article.findMany({
    where: {
      id: { not: article.id },
      category: article.category,
      publishedAt: { not: null, lte: new Date() },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  // Body affiché en paragraphes simples (séparés par double saut de ligne).
  // Phase 6 admin substituera par un éditeur riche.
  const paragraphs = article.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="min-h-screen bg-white">
      <header className="container-fc pt-12 pb-8 md:pt-20 md:pb-12">
        <nav className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-night/50">
          <Link href="/actualites" className="hover:text-pau-yellow">
            Actualités
          </Link>
          {' / '}
          <span className="text-pau-night">
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
        </nav>

        <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-crush tracking-tightest text-pau-night md:text-7xl">
          {article.title}
        </h1>

        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-pau-night/70">
          {article.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-pau-night/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-night/50">
          <span>{formatArticleDate(article.publishedAt)}</span>
          <span className="text-pau-night/30">·</span>
          <span>{article.author}</span>
          <span className="text-pau-night/30">·</span>
          <span className="text-pau-yellow">
            {ARTICLE_CATEGORY_LABELS[article.category]}
          </span>
        </div>
      </header>

      {article.coverImageUrl && (
        <div className="container-fc">
          <div className="aspect-[16/9] w-full overflow-hidden border border-pau-night/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-fc pb-16 pt-10 md:pb-24">
        <div className="prose-fc max-w-3xl space-y-5 font-sans text-base leading-relaxed text-pau-night/80 md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-fc border-t border-pau-night/10 py-12 md:py-16">
          <h2 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.id} article={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

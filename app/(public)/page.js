import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau FC — Club de football professionnel',
  description:
    'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  // Récupérer les 2 prochains matchs
  const upcomingMatches = await prisma.match
    .findMany({
      where: {
        kickoffAt: { gte: new Date() },
        status: 'scheduled',
      },
      orderBy: { kickoffAt: 'asc' },
      take: 2,
    })
    .catch(() => []);

  // Récupérer 3 derniers articles
  const latestArticles = await prisma.article
    .findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
    .catch(() => []);

  // Récupérer 3 produits mis en avant
  const featuredProducts = await prisma.product
    .findMany({
      where: {
        status: 'active',
        featured: true,
        images: { isEmpty: false },
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        category: true,
        variants: {
          include: { stockItem: true },
          take: 1,
        },
      },
    })
    .catch(() => []);

  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/40 to-transparent" />

        <div className="relative z-10 flex h-full items-end">
          <div className="w-full px-6 pb-16 md:px-12 md:pb-24">
            <div className="mx-auto max-w-7xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-pau-yellow">
                Saison 2025-2026
              </p>
              <h1 className="font-display text-5xl font-black uppercase leading-none text-white md:text-7xl lg:text-8xl">
                PAU FOOTBALL<br />CLUB
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/90">
                Ligue 2 BKT · Nouste Camp
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/billetterie"
                  className="bg-pau-yellow px-8 py-4 font-display text-sm font-bold uppercase text-pau-night transition-colors hover:bg-pau-yellow/90"
                >
                  Billetterie
                </Link>
                <Link
                  href="/boutique"
                  className="border-2 border-white px-8 py-4 font-display text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-pau-night"
                >
                  Boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCHAINS MATCHS */}
      {upcomingMatches.length > 0 && (
        <section className="border-b border-gray-100 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-primary md:text-4xl">
              Prochains matchs
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACTUALITÉS */}
      {latestArticles.length > 0 && (
        <section className="border-b border-gray-100 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold uppercase text-pau-primary md:text-4xl">
                Actualités
              </h2>
              <Link
                href="/actualites"
                className="font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:text-pau-yellow"
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOUTIQUE */}
      {featuredProducts.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold uppercase text-pau-primary md:text-4xl">
                Boutique officielle
              </h2>
              <Link
                href="/boutique"
                className="font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:text-pau-yellow"
              >
                Tout voir →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {featuredProducts.map((product) => {
                const firstVariant = product.variants[0];
                const price = firstVariant?.priceOverride || product.basePrice || 0;
                return (
                  <ProductCard key={product.id} product={product} price={price} />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Composant Match minimaliste
function MatchCard({ match }) {
  const date = new Date(match.kickoffAt);
  return (
    <Link
      href={`/calendrier/${match.id}`}
      className="group block bg-gray-50 p-8 transition-colors hover:bg-pau-primary"
    >
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-pau-primary/60 group-hover:text-pau-yellow">
        {date.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-right">
          <p className="text-2xl font-bold text-pau-primary group-hover:text-white">
            {match.homeTeam || 'Pau FC'}
          </p>
        </div>
        <div className="mx-8">
          <p className="font-mono text-sm text-pau-primary/40 group-hover:text-white/60">
            {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-pau-primary group-hover:text-white">
            {match.awayTeam}
          </p>
        </div>
      </div>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-pau-primary/60 group-hover:text-pau-yellow">
        {match.competition || 'Ligue 2 BKT'}
      </p>
    </Link>
  );
}

// Composant Article minimaliste
function ArticleCard({ article }) {
  return (
    <Link href={`/actualites/${article.slug}`} className="group block">
      {article.coverImageUrl && (
        <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-pau-yellow">
        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
        })}
      </p>
      <h3 className="font-display text-xl font-bold uppercase leading-tight text-pau-primary transition-colors group-hover:text-pau-yellow">
        {article.title}
      </h3>
    </Link>
  );
}

// Composant Produit minimaliste
function ProductCard({ product, price }) {
  return (
    <Link href={`/boutique/${product.slug}`} className="group block">
      <div className="relative mb-4 aspect-square overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-black text-gray-200">
              {product.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-pau-yellow">
        {product.category?.name || 'Produit'}
      </p>
      <h3 className="mb-2 font-display text-lg font-bold uppercase leading-tight text-pau-primary">
        {product.name}
      </h3>
      <p className="font-display text-xl font-black text-pau-primary">
        {formatPrice(price)}
      </p>
    </Link>
  );
}

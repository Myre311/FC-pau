import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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
      {/* HERO ANIMÉ AVEC VIDÉO */}
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
              <p className="mb-4 animate-fade-in font-mono text-xs uppercase tracking-widest text-pau-yellow">
                Saison 2025-2026
              </p>
              <h1 className="animate-fade-in-up font-display text-5xl font-black uppercase leading-none text-white md:text-7xl lg:text-8xl">
                PAU FOOTBALL<br />CLUB
              </h1>
              <p className="mt-6 max-w-2xl animate-fade-in text-lg text-white/90 delay-100">
                Ligue 2 BKT · Nouste Camp
              </p>
              <div className="mt-8 flex animate-fade-in gap-4 delay-200">
                <Link
                  href="/billetterie"
                  className="bg-pau-yellow px-8 py-4 font-display text-sm font-bold uppercase text-pau-night transition-all hover:scale-105 hover:bg-pau-yellow/90"
                >
                  Billetterie
                </Link>
                <Link
                  href="/boutique"
                  className="border-2 border-white px-8 py-4 font-display text-sm font-bold uppercase text-white transition-all hover:scale-105 hover:bg-white hover:text-pau-night"
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
        <section className="border-b border-gray-200 py-12">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <ScrollReveal>
              <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-primary">
                Prochains matchs
              </h2>
            </ScrollReveal>
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingMatches.map((match, idx) => (
                <ScrollReveal key={match.id} delay={idx * 100}>
                  <MatchCard match={match} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACTUALITÉS */}
      {latestArticles.length > 0 && (
        <section className="border-b border-gray-200 py-12">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <ScrollReveal>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-pau-primary">
                  Actualités
                </h2>
                <Link
                  href="/actualites"
                  className="font-mono text-xs uppercase tracking-wider text-pau-primary transition-colors hover:text-pau-yellow"
                >
                  Voir tout
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {latestArticles.map((article, idx) => (
                <ScrollReveal key={article.id} delay={idx * 100}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOUTIQUE */}
      {featuredProducts.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <ScrollReveal>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-pau-primary">
                  Boutique officielle
                </h2>
                <Link
                  href="/boutique"
                  className="font-mono text-xs uppercase tracking-wider text-pau-primary transition-colors hover:text-pau-yellow"
                >
                  Tout voir
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product, idx) => {
                const firstVariant = product.variants[0];
                const price = firstVariant?.priceOverride || product.basePrice || 0;
                return (
                  <ScrollReveal key={product.id} delay={idx * 100}>
                    <ProductCard product={product} price={price} />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Composant Match simple avec animation hover
function MatchCard({ match }) {
  const date = new Date(match.kickoffAt);
  return (
    <Link
      href={`/calendrier/${match.id}`}
      className="block border border-gray-200 p-6 transition-all hover:scale-[1.02] hover:bg-gray-50"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-8 items-center bg-pau-primary px-3">
          <Image
            src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
            alt="Ligue 2 BKT"
            width={90}
            height={26}
            className="h-auto w-[90px]"
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-pau-primary/60">
          {date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
      <p className="mb-6 font-mono text-xs text-pau-primary/70">
        {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-end gap-3">
          {match.isHome && (
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/logos/pau-fc.svg"
                alt="Pau FC"
                fill
                className="object-contain"
              />
            </div>
          )}
          {!match.isHome && match.opponentLogo && (
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={match.opponentLogo}
                alt={match.opponent}
                fill
                className="object-contain"
              />
            </div>
          )}
          <p className="text-lg font-bold text-pau-primary">
            {match.isHome ? 'Pau FC' : match.opponent}
          </p>
        </div>
        <p className="font-mono text-sm text-pau-primary/40">VS</p>
        <div className="flex flex-1 items-center gap-3">
          <p className="text-lg font-bold text-pau-primary">
            {match.isHome ? match.opponent : 'Pau FC'}
          </p>
          {!match.isHome && (
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/logos/pau-fc.svg"
                alt="Pau FC"
                fill
                className="object-contain"
              />
            </div>
          )}
          {match.isHome && match.opponentLogo && (
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={match.opponentLogo}
                alt={match.opponent}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-pau-yellow">
        Vos places
      </p>
    </Link>
  );
}

// Composant Article simple avec animation hover
function ArticleCard({ article }) {
  return (
    <Link href={`/actualites/${article.slug}`} className="block border border-gray-200 transition-all hover:scale-[1.02] hover:bg-gray-50">
      {article.coverImageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-pau-yellow">
          {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
          })}
        </p>
        <h3 className="font-display text-base font-bold uppercase leading-tight text-pau-primary">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

// Composant Produit simple avec animation hover
function ProductCard({ product, price }) {
  return (
    <Link href={`/boutique/${product.slug}`} className="block border border-gray-200 transition-all hover:scale-[1.02] hover:bg-gray-50">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-pau-yellow">
          {product.category?.name || 'Produit'}
        </p>
        <h3 className="mb-2 font-display text-sm font-bold uppercase leading-tight text-pau-primary">
          {product.name}
        </h3>
        <p className="font-display text-lg font-black text-pau-primary">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}

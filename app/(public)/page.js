import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '@/lib/prisma';
import { MatchCountdown } from '@/components/vitrine/MatchCountdown';
import { AnimatedHero } from '@/components/animations/AnimatedHero';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { HoverCard } from '@/components/animations/HoverCard';
import PartnerLogo from '@/components/PartnerLogo';
import { formatPrice } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FC Pau — Club de football professionnel',
  description:
    'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  // Récupérer les 2 prochains matchs à domicile
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

  // Récupérer 3 derniers articles pour la newsletter
  const latestArticles = await prisma.article
    .findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
    .catch(() => []);

  // Récupérer 4 produits mis en avant pour la boutique
  const featuredProducts = await prisma.product
    .findMany({
      where: { status: 'active', featured: true },
      take: 4,
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
    <>
      {/* ─── HERO ANIMÉ NIVEAU BARÇA ──────────────────────────── */}
      <AnimatedHero />

      {/* ─── ACTUALITÉS ──────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="border-b border-nuit/10 py-8 md:py-12 bg-blanc">
          <div className="container-pau">
            <FadeIn>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-nuit md:text-3xl">
                  Actualités
                </h2>
                <Link
                  href="/actualites"
                  className="group flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wide text-nuit transition-all hover:gap-3 hover:text-jaune md:text-sm"
                >
                  Voir tout
                  <svg className="h-3 w-3 transition-transform group-hover:translate-x-1 md:h-4 md:w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <StaggerContainer staggerDelay={0.1} className="grid gap-4 md:grid-cols-3">
              {latestArticles.map((article) => (
                <StaggerItem key={article.id}>
                  <Link href={`/actualites/${article.slug}`}>
                    <HoverCard className="group overflow-hidden border border-nuit/10 bg-blanc transition-all hover:border-jaune hover:shadow-md">
                      {article.coverImage && (
                        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-nuit to-primaire">
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-wider text-jaune">
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <h3 className="line-clamp-2 font-display text-base font-bold uppercase leading-tight text-nuit group-hover:text-jaune">
                          {article.title}
                        </h3>
                      </div>
                    </HoverCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ─── PROCHAINS MATCHS ANIMÉS ──────────────────────────── */}
      <section className="section-pau border-t border-nuit/10 bg-blanc">
        <div className="container-pau">
          {upcomingMatches.length === 0 ? (
            <FadeIn>
              <div className="card-pau mx-auto max-w-2xl p-10 text-center">
                <p className="text-lead text-nuit/70">
                  Aucun match programmé pour le moment. Le calendrier sera mis à jour prochainement.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer staggerDelay={0.2} className="grid gap-8 md:grid-cols-2">
              {upcomingMatches.map((match) => (
                <StaggerItem key={match.id}>
                  <HoverCard>
                    <MatchCountdown match={match} />
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ─── BOUTIQUE OFFICIELLE ──────────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="section-pau border-t border-blanc/10 bg-nuit">
          <div className="container-pau">
            <FadeIn>
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <div className="mb-4 h-1 w-16 bg-jaune" />
                  <h2 className="font-display text-3xl font-bold uppercase text-blanc md:text-4xl">
                    Boutique officielle
                  </h2>
                </div>
                <Link
                  href="/boutique"
                  className="group flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-jaune transition-all hover:gap-3"
                >
                  Tout voir
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 gap-4 md:grid-cols-4 items-stretch">
              {featuredProducts.map((product) => {
                const firstVariant = product.variants[0];
                const price = firstVariant?.priceEur || product.basePriceEur || 0;

                return (
                  <StaggerItem key={product.id}>
                    <Link href={`/boutique/${product.slug}`} className="flex h-full">
                      <HoverCard className="group relative flex h-full w-full flex-col overflow-hidden border-2 border-blanc/20 bg-blanc/5 transition-all hover:border-jaune">
                        {/* Image placeholder - aspect 3/4 */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-nuit to-primaire">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <span className="font-display text-4xl font-black text-jaune/20 md:text-5xl">
                                {product.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          {product.featured && (
                            <div className="absolute right-2 top-2 bg-jaune px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-nuit">
                              ★ Top
                            </div>
                          )}
                        </div>

                        {/* Info - hauteur fixe pour alignement */}
                        <div className="mt-auto flex min-h-[120px] flex-col p-4">
                          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-jaune">
                            {product.category?.name || 'Produit'}
                          </p>
                          <h3 className="mb-2 line-clamp-2 font-display text-sm font-bold uppercase leading-tight text-blanc md:text-base">
                            {product.name}
                          </h3>
                          <p className="mt-auto font-display text-lg font-black text-jaune md:text-xl">
                            {formatPrice(price)}
                          </p>
                        </div>
                      </HoverCard>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ─── PARTENAIRES ──────────────────────────────────────────────── */}
      <section className="section-pau border-y border-blanc/10 bg-nuit">
        <div className="container-pau">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 h-1 w-16 bg-jaune" />
              <h2 className="font-display text-3xl font-bold uppercase text-blanc md:text-4xl">
                Nos partenaires
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <PartnerLogo name="Joma" logo="/logos/partners/Joma_Blue.png" href="https://www.joma-sport.com" />
            <PartnerLogo name="Holy" logo="/logos/partners/Holy_Outline_Mono.png" href="https://holy-fr.com" />
            <PartnerLogo name="Intersport" logo="/logos/partners/Intersport.png" href="https://www.intersport.fr" />
            <PartnerLogo name="Groupama" logo="/logos/partners/groupama-ws-2.png" href="https://www.groupama.fr" />
            <PartnerLogo name="Sarthou" logo="/logos/partners/sarthou-site-1.png" />
            <PartnerLogo name="Ville de Pau" logo="/logos/partners/Pau.png" href="https://www.pau.fr" />
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ANIMÉE ──────────────────────────────────────────────── */}
      <section className="section-pau border-t border-jaune/40 bg-nuit">
        <div className="container-pau">
          <FadeIn delay={0.2} className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-block">
              <div className="h-1 w-20 bg-jaune" />
            </div>
            <h2 className="title-section mb-6 text-blanc">
              Restez informé
            </h2>
            <p className="text-lead mb-8 text-blanc/80">
              Recevez les actualités, offres exclusives et informations billetterie directement dans votre boîte mail.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 rounded-lg border-2 border-blanc/20 bg-blanc/10 px-6 py-4 font-sans text-blanc placeholder-blanc/50 transition-all focus:border-jaune focus:bg-blanc/20 focus:outline-none"
              />
              <button type="submit" className="btn-pau-accent whitespace-nowrap">
                S'inscrire
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}


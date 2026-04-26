import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { MatchCountdown } from '@/components/vitrine/MatchCountdown';
import { AnimatedHero } from '@/components/animations/AnimatedHero';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { HoverCard } from '@/components/animations/HoverCard';

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

  return (
    <>
      {/* ─── HERO ANIMÉ NIVEAU BARÇA ──────────────────────────── */}
      <AnimatedHero />

      {/* ─── PROCHAINS MATCHS ANIMÉS ──────────────────────────── */}
      <section className="section-pau border-t border-blanc/10">
        <div className="container-pau">
          {upcomingMatches.length === 0 ? (
            <FadeIn>
              <div className="card-pau mx-auto max-w-2xl p-10 text-center">
                <p className="text-lead text-blanc/70">
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

      {/* ─── PARTENAIRES ANIMÉS ──────────────────────────────────────────────── */}
      <section className="section-pau border-y border-blanc/10">
        <div className="container-pau">
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 h-1 w-16 bg-jaune" />
              <h2 className="font-display text-3xl font-bold uppercase text-blanc md:text-4xl">
                Nos partenaires
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {['Joma', 'Holy', 'Intersport', 'Groupama', 'Sarthou', 'Ville de Pau'].map((partner, idx) => (
              <StaggerItem key={idx}>
                <HoverCard className="flex items-center justify-center border-2 border-blanc/20 bg-blanc/5 p-6 transition-colors hover:border-jaune hover:bg-blanc/10">
                  <span className="font-display text-base font-bold uppercase text-blanc/70">
                    {partner}
                  </span>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
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


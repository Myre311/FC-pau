import { prisma } from '@/lib/prisma';
import { MatchCard } from '@/components/vitrine/MatchCard';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Calendrier',
  description:
    'Tous les matchs du Pau FC : prochaines rencontres, résultats récents et billetterie pour les matchs à domicile au Nouste Camp.',
};

export default async function CalendrierPage() {
  const now = new Date();

  let upcoming = [];
  let recent = [];

  try {
    [upcoming, recent] = await Promise.all([
      prisma.match.findMany({
        where: {
          kickoffAt: { gte: now },
          status: { in: ['scheduled', 'live', 'postponed'] },
        },
        orderBy: { kickoffAt: 'asc' },
        take: 12,
      }),
      prisma.match.findMany({
        where: { status: 'played' },
        orderBy: { kickoffAt: 'desc' },
        take: 6,
      }),
    ]);
  } catch (error) {
    console.error('Erreur chargement matchs:', error);
    // Continue avec des tableaux vides
  }

  const next = upcoming[0];

  return (
    <>
      <PageHero
        image="/images/hero-calendrier.jpg"
        surtitle="Saison 2025-2026 · Calendrier officiel"
        title="CALENDRIER"
      />

      <SectionLight>
        {next && (
          <>
            <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-primary">
              Prochain match
            </h2>
            <div className="border border-pau-yellow/40 bg-pau-primary/10 p-2 mb-12">
              <MatchCard match={next} />
            </div>
          </>
        )}

        {upcoming.length > 1 && (
          <>
            <header className="mb-8 flex items-end justify-between pt-8 border-t border-pau-primary/10">
              <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-5xl">
                À venir
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/40">
                {upcoming.length - 1}
              </span>
            </header>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.slice(1).map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </>
        )}

        {recent.length > 0 && (
          <>
            <header className="mb-8 flex items-end justify-between pt-12 border-t border-pau-primary/10">
              <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-5xl">
                Résultats récents
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/40">
                {recent.length}
              </span>
            </header>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recent.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </>
        )}

        {upcoming.length === 0 && recent.length === 0 && (
          <div className="border border-dashed border-pau-primary/15 p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary">
              Calendrier vide
            </p>
            <p className="mt-4 font-sans text-pau-primary/60">
              Aucun match programmé pour le moment.
            </p>
          </div>
        )}
      </SectionLight>
    </>
  );
}

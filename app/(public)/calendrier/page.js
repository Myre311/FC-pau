import { prisma } from '@/lib/prisma';
import { MatchCard } from '@/components/vitrine/MatchCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Calendrier',
  description:
    'Tous les matchs du Pau FC : prochaines rencontres, résultats récents et billetterie pour les matchs à domicile au Nouste Camp.',
};

export default async function CalendrierPage() {
  const now = new Date();

  const [upcoming, recent] = await Promise.all([
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

  const next = upcoming[0];

  return (
    <>
      <section className="container-fc pt-16 pb-10 md:pt-24 md:pb-16">
        <p className="badge-mono">Saison 2025-2026 · Calendrier officiel</p>
        <h1 className="mt-6 text-[16vw] md:text-[11vw] lg:text-[150px]">
          CALEN<span className="text-jaune">DRIER</span>
        </h1>
      </section>

      {next && (
        <section className="container-fc pb-12 md:pb-16">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            Prochain match
          </h2>
          <div className="border border-jaune/40 bg-primaire/30 p-2">
            <MatchCard match={next} />
          </div>
        </section>
      )}

      {upcoming.length > 1 && (
        <section className="container-fc border-t border-blanc/10 py-12 md:py-16">
          <header className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
              À venir
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
              {upcoming.length - 1}
            </span>
          </header>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.slice(1).map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="container-fc border-t border-blanc/10 py-12 md:py-16">
          <header className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
              Résultats récents
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
              {recent.length}
            </span>
          </header>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recent.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length === 0 && recent.length === 0 && (
        <section className="container-fc py-24">
          <div className="border border-dashed border-blanc/15 p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              Calendrier vide
            </p>
            <p className="mt-4 font-sans text-blanc/60">
              Aucun match programmé pour le moment.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

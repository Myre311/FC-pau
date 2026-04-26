import { prisma } from '@/lib/prisma';
import { PlayerCard } from '@/components/vitrine/PlayerCard';
import { POSITION_LABELS } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Effectif',
  description:
    'Joueurs et staff du Pau FC, saison 2025-2026. Découvrez l’effectif professionnel qui défend les couleurs du Béarn.',
};

const POSITION_ORDER = ['goalkeeper', 'defender', 'midfielder', 'forward'];

export default async function EquipePage() {
  const all = await prisma.player.findMany({
    where: { active: true },
    orderBy: [{ role: 'asc' }, { displayOrder: 'asc' }, { lastName: 'asc' }],
  });

  const players = all.filter((p) => p.role === 'player');
  const staffAndCoach = all.filter((p) => p.role !== 'player');

  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = players.filter((p) => p.position === pos);
    return acc;
  }, {});

  return (
    <>
      <section className="container-fc py-[clamp(80px,12vh,160px)]">
        <p className="badge-mono">Effectif professionnel · Saison 2025-2026</p>
        <h1 className="mt-8 font-display text-[clamp(52px,12vw,160px)] uppercase leading-crush tracking-display-tight">
          L&apos;<span className="text-jaune">ÉQUIPE</span>
        </h1>
        <p className="mt-8 max-w-2xl font-sans text-[17px] leading-relaxed text-blanc/85">
          <span className="font-display text-[28px] text-jaune">{players.length}</span> joueurs et{' '}
          <span className="font-display text-[28px] text-jaune">{staffAndCoach.length}</span> membres du staff
          au service d&apos;un seul objectif : porter haut les couleurs du Béarn.
        </p>
      </section>

      {POSITION_ORDER.map((pos) => {
        const list = grouped[pos];
        if (!list || list.length === 0) return null;
        return (
          <section
            key={pos}
            className="container-fc border-t border-blanc/10 py-12 md:py-16"
          >
            <header className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
                {POSITION_LABELS[pos]}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                {list.length}
              </span>
            </header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {list.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </section>
        );
      })}

      {staffAndCoach.length > 0 && (
        <section className="container-fc border-t border-blanc/10 py-12 md:py-16">
          <header className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
              Staff
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
              {staffAndCoach.length}
            </span>
          </header>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {staffAndCoach.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </section>
      )}

      {all.length === 0 && <EmptyEquipe />}
    </>
  );
}

function EmptyEquipe() {
  return (
    <section className="container-fc py-24">
      <div className="border border-dashed border-blanc/15 p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
          Effectif vide
        </p>
        <p className="mt-4 font-sans text-blanc/60">
          Aucun joueur publié. Lance le seed (
          <code className="font-mono text-blanc">npm run db:seed</code>) pour
          peupler l&apos;effectif.
        </p>
      </div>
    </section>
  );
}

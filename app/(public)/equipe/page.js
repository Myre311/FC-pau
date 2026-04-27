import { prisma } from '@/lib/prisma';
import { PlayerCard } from '@/components/vitrine/PlayerCard';
import { POSITION_LABELS } from '@/lib/labels';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

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
      <PageHero
        image="/images/hero-equipe.jpg"
        surtitle="Effectif professionnel · Saison 2025-2026"
        title="L'ÉQUIPE"
        subtitle={`${players.length} joueurs et ${staffAndCoach.length} membres du staff au service d'un seul objectif : porter haut les couleurs du Béarn.`}
      />

      <SectionLight>
        {POSITION_ORDER.map((pos, idx) => {
          const list = grouped[pos];
          if (!list || list.length === 0) return null;
          return (
            <div
              key={pos}
              className={idx > 0 ? "border-t border-[#0F1E45]/10 pt-12 mt-12" : ""}
            >
              <header className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-5xl">
                  {POSITION_LABELS[pos]}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1E45]/40">
                  {list.length}
                </span>
              </header>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </div>
          );
        })}

        {staffAndCoach.length > 0 && (
          <div className="border-t border-[#0F1E45]/10 pt-12 mt-12">
            <header className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-5xl">
                Staff
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1E45]/40">
                {staffAndCoach.length}
              </span>
            </header>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {staffAndCoach.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </div>
        )}
      </SectionLight>

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

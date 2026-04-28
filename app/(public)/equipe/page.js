import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { PlayerCard } from '@/components/vitrine/PlayerCard';
import { POSITION_LABELS } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Effectif',
  description:
    "Joueurs et staff du Pau FC, saison 2025-2026. Découvrez l'effectif professionnel qui défend les couleurs du Béarn.",
};

const POSITION_ORDER = ['goalkeeper', 'defender', 'midfielder', 'forward'];

export default async function EquipePage() {
  const all = await prisma.player.findMany({
    where: { active: true },
    orderBy: [{ role: 'asc' }, { displayOrder: 'asc' }, { lastName: 'asc' }],
  });

  const players = all.filter((p) => p.role === 'player');

  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = players.filter((p) => p.position === pos);
    return acc;
  }, {});

  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-equipe.jpg"
          alt="Effectif Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Effectif professionnel · Saison 2025-2026
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              L'Équipe
            </h1>
            <p className="mt-3 text-sm text-white/90">
              {players.length} joueurs au service d'un seul objectif : porter haut les couleurs du Béarn.
            </p>
          </div>
        </div>
      </section>

      {/* JOUEURS PAR POSTE */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {POSITION_ORDER.map((pos, idx) => {
          const list = grouped[pos];
          if (!list || list.length === 0) return null;
          return (
            <div
              key={pos}
              className={idx > 0 ? 'mt-12 border-t border-gray-200 pt-12' : ''}
            >
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
                  {POSITION_LABELS[pos]}
                </h2>
                <span className="font-mono text-xs uppercase tracking-wider text-pau-primary/40">
                  {list.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {all.length === 0 && <EmptyEquipe />}
    </div>
  );
}

function EmptyEquipe() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
      <div className="text-center">
        <p className="text-sm text-pau-primary/40">
          Aucun joueur disponible pour le moment.
        </p>
      </div>
    </section>
  );
}

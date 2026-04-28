import { prisma } from '@/lib/prisma';
import { PlayerCard } from '@/components/vitrine/PlayerCard';
import { POSITION_LABELS } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Effectif',
  description:
    'Joueurs du Pau FC, saison 2025-2026.',
};

const POSITION_ORDER = ['goalkeeper', 'defender', 'midfielder', 'forward'];

export default async function EquipePage() {
  const players = await prisma.player.findMany({
    where: { active: true, role: 'player' },
    orderBy: [{ position: 'asc' }, { displayOrder: 'asc' }],
  });

  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = players.filter((p) => p.position === pos);
    return acc;
  }, {});

  return (
    <div className="bg-white">
      {/* Header simple */}
      <div className="border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-display text-5xl font-black uppercase text-pau-primary md:text-6xl">
            Effectif
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-pau-primary/60">
            Saison 2025-2026 · {players.length} joueurs
          </p>
        </div>
      </div>

      {/* Joueurs par poste */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        {POSITION_ORDER.map((pos) => {
          const list = grouped[pos];
          if (!list || list.length === 0) return null;
          return (
            <div key={pos} className="mb-20">
              <h2 className="mb-8 font-display text-3xl font-bold uppercase text-pau-primary">
                {POSITION_LABELS[pos]}
              </h2>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                {list.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

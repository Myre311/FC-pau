import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Joueurs - Admin',
};

export default async function JoueursAdminPage() {
  const players = await prisma.player.findMany({
    orderBy: [{ shirtNumber: 'asc' }],
  }).catch(() => []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blanc">Joueurs</h1>
          <p className="mt-2 text-blanc/60">
            Gérer l'effectif du Pau FC
          </p>
        </div>
        <Link
          href="/admin/joueurs/nouveau"
          className="bg-jaune text-nuit px-6 py-3 font-bold uppercase hover:bg-jaune/90 transition-colors"
        >
          + Nouveau joueur
        </Link>
      </div>

      {players.length === 0 ? (
        <div className="border border-dashed border-blanc/20 p-12 text-center">
          <p className="text-blanc/60">Aucun joueur dans l'effectif</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <Link
              key={player.id}
              href={`/admin/joueurs/${player.id}`}
              className="group border border-blanc/10 bg-primaire/20 p-6 transition-all hover:border-jaune/30"
            >
              <div className="flex items-start gap-4">
                {player.photoUrl ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-nuit">
                    <Image
                      src={player.photoUrl}
                      alt={`${player.firstName} ${player.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-nuit font-display text-2xl text-jaune">
                    {player.shirtNumber}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-jaune">
                        N°{player.shirtNumber} · {player.position}
                      </p>
                      <h3 className="mt-1 font-display text-lg uppercase text-blanc">
                        {player.firstName} {player.lastName}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4 text-xs text-blanc/60">
                    {player.nationality && (
                      <span>{player.nationality}</span>
                    )}
                    {player.heightCm && (
                      <span>{player.heightCm} cm</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

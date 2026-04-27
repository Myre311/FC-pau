import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PlayerForm } from '@/components/admin/PlayerForm';
import { updatePlayerAction, deletePlayerAction } from '../actions';

export const metadata = {
  title: 'Modifier joueur - Admin',
};

export default async function EditJoueurPage({ params }) {
  const player = await prisma.player.findUnique({
    where: { id: params.id },
  }).catch(() => null);

  if (!player) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blanc">
          Modifier joueur
        </h1>
        <p className="mt-2 text-blanc/60">
          {player.firstName} {player.lastName} · N°{player.shirtNumber}
        </p>
      </div>

      <PlayerForm
        player={player}
        action={updatePlayerAction}
        deleteAction={deletePlayerAction}
      />
    </div>
  );
}

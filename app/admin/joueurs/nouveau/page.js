import { PlayerForm } from '@/components/admin/PlayerForm';
import { createPlayerAction } from '../actions';

export const metadata = {
  title: 'Nouveau joueur - Admin',
};

export default function NouveauJoueurPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blanc">Nouveau joueur</h1>
        <p className="mt-2 text-blanc/60">
          Ajouter un joueur à l'effectif
        </p>
      </div>

      <PlayerForm action={createPlayerAction} />
    </div>
  );
}

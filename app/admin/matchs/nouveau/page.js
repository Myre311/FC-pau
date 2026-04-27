import { MatchForm } from '@/components/admin/MatchForm';
import { createMatch } from '../actions';

export const metadata = {
  title: 'Nouveau match - Admin',
};

export default function NewMatchPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pau-primary">Nouveau match</h1>
        <p className="mt-2 text-pau-primary/60">
          Ajouter un match au calendrier
        </p>
      </div>

      <MatchForm action={createMatch} />
    </div>
  );
}

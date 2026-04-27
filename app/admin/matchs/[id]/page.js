import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MatchForm } from '@/components/admin/MatchForm';
import { updateMatch, deleteMatch } from '../actions';

export const metadata = {
  title: 'Modifier match - Admin',
};

export default async function EditMatchPage({ params }) {
  const match = await prisma.match.findUnique({
    where: { id: params.id },
  }).catch(() => null);

  if (!match) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pau-primary">Modifier le match</h1>
        <p className="mt-2 text-pau-primary/60">
          {match.opponent} · {new Date(match.kickoffAt).toLocaleDateString('fr-FR')}
        </p>
      </div>

      <MatchForm match={match} action={updateMatch} deleteAction={deleteMatch} />
    </div>
  );
}

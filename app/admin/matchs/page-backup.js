// BACKUP - version complexe avec AdminTable
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminTable } from '@/components/admin/AdminTable';
import { formatMatchDate } from '@/lib/labels';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Matchs - Admin',
};

export default async function MatchsAdminPage() {
  const matches = await prisma.match.findMany({
    orderBy: [{ kickoffAt: 'desc' }],
  }).catch(() => []);

  const columns = [
    {
      key: 'kickoffAt',
      label: 'Date',
      render: (match) => formatMatchDate(match.kickoffAt),
    },
    {
      key: 'competition',
      label: 'Compétition',
    },
    {
      key: 'opponent',
      label: 'Adversaire',
    },
    {
      key: 'isHome',
      label: 'Lieu',
      render: (match) => (
        <span className={match.isHome ? 'text-green-600' : 'text-gray-600'}>
          {match.isHome ? 'Domicile' : 'Extérieur'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (match) => {
        const colors = {
          scheduled: 'bg-blue-100 text-blue-800',
          live: 'bg-green-100 text-green-800',
          played: 'bg-gray-100 text-gray-800',
          postponed: 'bg-orange-100 text-orange-800',
          cancelled: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[match.status] || 'bg-gray-100'}`}>
            {match.status}
          </span>
        );
      },
    },
    {
      key: 'score',
      label: 'Score',
      render: (match) => {
        if (match.status !== 'played' || match.homeScore == null) return '-';
        return `${match.homeScore} - ${match.awayScore}`;
      },
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pau-primary">Matchs & Calendrier</h1>
          <p className="mt-2 text-pau-primary/60">
            Gérer le calendrier des matchs du Pau FC
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/calendrier"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-pau-primary text-pau-primary px-6 py-3 font-bold uppercase hover:bg-pau-primary hover:text-white transition-colors"
          >
            Voir sur le site ↗
          </Link>
          <Link
            href="/admin/matchs/nouveau"
            className="bg-pau-yellow text-pau-night px-6 py-3 font-bold uppercase hover:bg-pau-yellow/90 transition-colors"
          >
            + Nouveau match
          </Link>
        </div>
      </div>

      <AdminTable
        data={matches}
        columns={columns}
        emptyMessage="Aucun match programmé"
        editUrlPattern="/admin/matchs/{id}"
      />
    </div>
  );
}

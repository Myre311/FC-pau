import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Matchs - Admin',
};

export default async function MatchsAdminPage() {
  const matches = await prisma.match.findMany({
    orderBy: [{ kickoffAt: 'desc' }],
  }).catch(() => []);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pau-primary">Matchs & Calendrier</h1>
          <p className="mt-2 text-pau-primary/60">
            {matches.length} matchs dans la base de données
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/calendrier"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-pau-primary text-pau-primary px-6 py-3 font-bold uppercase hover:bg-pau-primary hover:text-gray-900 transition-colors"
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

      {matches.length === 0 ? (
        <div className="border border-dashed border-pau-primary/20 p-12 text-center">
          <p className="text-pau-primary/60">Aucun match programmé</p>
        </div>
      ) : (
        <div className="bg-white border border-pau-primary/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-pau-primary/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Adversaire</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Compétition</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-pau-primary uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pau-primary/10">
              {matches.map((match) => (
                <tr key={match.id} className="hover:bg-pau-primary/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pau-primary">
                    {new Date(match.kickoffAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-pau-primary">
                    {match.opponent}
                  </td>
                  <td className="px-6 py-4 text-sm text-pau-primary/60">
                    {match.competition?.includes('Ligue 2') ? (
                      <Image
                        src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                        alt="Ligue 2 BKT"
                        width={80}
                        height={23}
                        className="h-auto w-20"
                      />
                    ) : (
                      match.competition
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-pau-primary/60">
                    {match.isHome ? 'Domicile' : 'Extérieur'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      match.status === 'played' ? 'bg-gray-100 text-gray-800' :
                      match.status === 'live' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-pau-primary">
                    {match.status === 'played' && match.homeScore != null
                      ? `${match.homeScore} - ${match.awayScore}`
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/admin/matchs/${match.id}`}
                      className="text-pau-yellow hover:text-pau-yellow/80 font-medium"
                    >
                      Modifier →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

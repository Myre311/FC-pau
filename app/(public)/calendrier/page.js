import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Calendrier - Pau FC',
  description: 'Tous les matchs du Pau FC : prochaines rencontres et résultats récents.',
};

export default async function CalendrierPage() {
  const now = new Date();

  let upcoming = [];
  let recent = [];

  try {
    [upcoming, recent] = await Promise.all([
      prisma.match.findMany({
        where: {
          kickoffAt: { gte: now },
          status: { in: ['scheduled', 'live', 'postponed'] },
        },
        orderBy: { kickoffAt: 'asc' },
        take: 12,
      }),
      prisma.match.findMany({
        where: { status: 'played' },
        orderBy: { kickoffAt: 'desc' },
        take: 6,
      }),
    ]);
  } catch (error) {
    console.error('Erreur chargement matchs:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-pau-primary text-white py-20">
        <div className="container-pau text-center">
          <p className="font-mono text-sm uppercase tracking-wider text-pau-yellow mb-4">
            Saison 2025-2026
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase font-black">
            CALENDRIER
          </h1>
          <p className="mt-4 text-white/70">
            {upcoming.length} matchs à venir • {recent.length} matchs joués
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="container-pau py-16">
        {/* Matchs à venir */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-display font-bold text-pau-primary mb-8 uppercase">
              Prochains matchs
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((match) => (
                <div key={match.id} className="border-2 border-pau-primary/10 p-6 hover:border-pau-yellow transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    {match.competition?.includes('Ligue 2') ? (
                      <Image
                        src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                        alt="Ligue 2 BKT"
                        width={80}
                        height={23}
                        className="h-auto w-20"
                      />
                    ) : (
                      <span className="text-xs font-mono uppercase text-pau-yellow">
                        {match.competition}
                      </span>
                    )}
                    <span className="text-xs text-pau-primary/60">
                      {match.status}
                    </span>
                  </div>

                  <p className="text-sm text-pau-primary/60 mb-4">
                    {new Date(match.kickoffAt).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xl text-pau-primary">
                      {match.isHome ? 'PAU FC' : match.opponent}
                    </span>
                    <span className="font-display text-2xl text-pau-yellow">VS</span>
                    <span className="font-display text-xl text-pau-primary">
                      {match.isHome ? match.opponent : 'PAU FC'}
                    </span>
                  </div>

                  <div className="text-sm text-pau-primary/60">
                    <p className="mb-1">{match.venue}</p>
                    <p className="font-mono text-xs uppercase text-pau-primary/40">
                      {match.isHome ? 'Domicile' : 'Extérieur'}
                    </p>
                  </div>

                  {match.ticketUrl && (
                    <a
                      href={match.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-pau-yellow text-pau-night px-4 py-2 font-bold uppercase text-sm hover:bg-pau-yellow/90 transition-colors"
                    >
                      Billetterie
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Résultats récents */}
        {recent.length > 0 && (
          <section>
            <h2 className="text-3xl font-display font-bold text-pau-primary mb-8 uppercase">
              Résultats récents
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((match) => (
                <div key={match.id} className="border border-pau-primary/10 bg-pau-primary/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    {match.competition?.includes('Ligue 2') ? (
                      <Image
                        src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                        alt="Ligue 2 BKT"
                        width={80}
                        height={23}
                        className="h-auto w-20"
                      />
                    ) : (
                      <span className="text-xs font-mono uppercase text-pau-primary/60">
                        {match.competition}
                      </span>
                    )}
                    <span className="text-xs text-pau-primary/40">
                      {new Date(match.kickoffAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-lg text-pau-primary">
                      {match.isHome ? 'PAU FC' : match.opponent}
                    </span>
                    <span className="font-display text-3xl text-pau-yellow">
                      {match.isHome ? match.homeScore : match.awayScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg text-pau-primary">
                      {match.isHome ? match.opponent : 'PAU FC'}
                    </span>
                    <span className="font-display text-3xl text-pau-primary/60">
                      {match.isHome ? match.awayScore : match.homeScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && recent.length === 0 && (
          <div className="text-center py-20">
            <p className="text-pau-primary/60 text-lg">
              Aucun match programmé pour le moment.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block border-2 border-pau-primary text-pau-primary px-8 py-3 font-bold uppercase hover:bg-pau-primary hover:text-white transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

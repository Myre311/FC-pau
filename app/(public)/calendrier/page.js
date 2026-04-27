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
                <div key={match.id} className="bg-pau-primary border-2 border-pau-yellow/50 p-6 hover:border-pau-yellow transition-colors">
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
                    <span className="text-xs text-white/60">
                      {match.status}
                    </span>
                  </div>

                  <p className="text-sm text-white/80 mb-4">
                    {new Date(match.kickoffAt).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {match.isHome && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="PAU FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!match.isHome && match.opponentLogo && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-display text-lg text-white truncate">
                        {match.isHome ? 'PAU FC' : match.opponent}
                      </span>
                    </div>
                    <span className="font-display text-2xl text-pau-yellow flex-shrink-0">VS</span>
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="font-display text-lg text-white truncate">
                        {match.isHome ? match.opponent : 'PAU FC'}
                      </span>
                      {!match.isHome && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="PAU FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {match.isHome && match.opponentLogo && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-white/70">
                    <p className="mb-1">{match.venue}</p>
                    <p className="font-mono text-xs uppercase text-white/50">
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
                <div key={match.id} className="border border-pau-yellow/30 bg-pau-primary p-6">
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
                      <span className="text-xs font-mono uppercase text-white/60">
                        {match.competition}
                      </span>
                    )}
                    <span className="text-xs text-white/50">
                      {new Date(match.kickoffAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {match.isHome && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="PAU FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!match.isHome && match.opponentLogo && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-display text-lg text-white truncate">
                        {match.isHome ? 'PAU FC' : match.opponent}
                      </span>
                    </div>
                    <span className="font-display text-3xl text-pau-yellow flex-shrink-0">
                      {match.isHome ? match.homeScore : match.awayScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {!match.isHome && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="PAU FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {match.isHome && match.opponentLogo && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="font-display text-lg text-white truncate">
                        {match.isHome ? match.opponent : 'PAU FC'}
                      </span>
                    </div>
                    <span className="font-display text-3xl text-white/60 flex-shrink-0">
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

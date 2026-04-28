import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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
      {/* Header simple */}
      <div className="border-b border-gray-200 py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-pau-yellow">
            Saison 2025-2026
          </p>
          <h1 className="font-display text-4xl font-black uppercase text-pau-primary md:text-5xl">
            Calendrier
          </h1>
          <p className="mt-3 text-sm text-pau-primary/60">
            {upcoming.length} matchs à venir • {recent.length} matchs joués
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* Matchs à venir */}
        {upcoming.length > 0 && (
          <section className="mb-12">
            <ScrollReveal>
              <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-primary">
                Prochains matchs
              </h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((match, idx) => (
                <ScrollReveal key={match.id} delay={idx * 50}>
                  <div className="border border-gray-200 p-6 hover:bg-gray-50">
                  <div className="mb-4 flex items-center justify-between">
                    {match.competition?.includes('Ligue 2') ? (
                      <div className="flex h-8 items-center bg-pau-primary px-3">
                        <Image
                          src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                          alt="Ligue 2 BKT"
                          width={90}
                          height={26}
                          className="h-auto w-[90px]"
                        />
                      </div>
                    ) : (
                      <span className="font-mono text-xs uppercase text-pau-yellow">
                        {match.competition}
                      </span>
                    )}
                    <span className="text-xs text-pau-primary/50">
                      {match.status}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-pau-primary/70">
                    {new Date(match.kickoffAt).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-3">
                      {match.isHome && (
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="Pau FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!match.isHome && match.opponentLogo && (
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="truncate font-display text-base text-pau-primary">
                        {match.isHome ? 'PAU FC' : match.opponent}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-pau-primary/40">VS</span>
                    <div className="flex flex-1 items-center justify-end gap-3">
                      <span className="truncate font-display text-base text-pau-primary">
                        {match.isHome ? match.opponent : 'PAU FC'}
                      </span>
                      {!match.isHome && (
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="Pau FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {match.isHome && match.opponentLogo && (
                        <div className="relative h-10 w-10 flex-shrink-0">
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

                  <div className="text-sm text-pau-primary/60">
                    <p className="mb-1">{match.venue}</p>
                    <p className="font-mono text-xs uppercase text-pau-primary/50">
                      {match.isHome ? 'Domicile' : 'Extérieur'}
                    </p>
                  </div>

                    {match.ticketUrl && (
                      <a
                        href={match.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-pau-yellow px-4 py-2 font-mono text-xs font-bold uppercase text-pau-night hover:bg-pau-yellow/90"
                      >
                        Billetterie
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Résultats récents */}
        {recent.length > 0 && (
          <section className="border-t border-gray-200 pt-12">
            <ScrollReveal>
              <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-primary">
                Résultats récents
              </h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((match, idx) => (
                <ScrollReveal key={match.id} delay={idx * 50}>
                  <div className="border border-gray-200 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    {match.competition?.includes('Ligue 2') ? (
                      <div className="flex h-8 items-center bg-pau-primary px-3">
                        <Image
                          src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                          alt="Ligue 2 BKT"
                          width={90}
                          height={26}
                          className="h-auto w-[90px]"
                        />
                      </div>
                    ) : (
                      <span className="font-mono text-xs uppercase text-pau-primary/60">
                        {match.competition}
                      </span>
                    )}
                    <span className="text-xs text-pau-primary/50">
                      {new Date(match.kickoffAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-3">
                      {match.isHome && (
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="Pau FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {!match.isHome && match.opponentLogo && (
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="truncate font-display text-base text-pau-primary">
                        {match.isHome ? 'PAU FC' : match.opponent}
                      </span>
                    </div>
                    <span className="font-display text-2xl text-pau-yellow">
                      {match.isHome ? match.homeScore : match.awayScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 items-center gap-3">
                      {!match.isHome && (
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src="/logos/pau-fc.svg"
                            alt="Pau FC"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {match.isHome && match.opponentLogo && (
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src={match.opponentLogo}
                            alt={match.opponent}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="truncate font-display text-base text-pau-primary">
                        {match.isHome ? match.opponent : 'PAU FC'}
                      </span>
                    </div>
                      <span className="font-display text-2xl text-pau-primary/60">
                        {match.isHome ? match.awayScore : match.homeScore}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && recent.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-pau-primary/60">
              Aucun match programmé pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

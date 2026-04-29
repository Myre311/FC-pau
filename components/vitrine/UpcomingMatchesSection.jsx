'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Section "Prochains matchs" - Homepage
 */
export function UpcomingMatchesSection({ matches = [] }) {
  if (!matches || matches.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-pau">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="badge-mono text-pau-primary">Calendrier</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Prochains matchs
            </h2>
          </div>
          <Link
            href="/calendrier"
            className="hidden font-display text-sm font-bold uppercase tracking-wide text-pau-primary transition-colors hover:text-pau-yellow md:block"
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {matches.slice(0, 3).map((match) => (
            <article
              key={match.id}
              className="group border-2 border-pau-night/10 bg-white p-6 transition-all hover:border-pau-yellow hover:shadow-lg"
            >
              {/* Date badge */}
              <div className="mb-4 inline-flex items-center gap-2 border border-pau-yellow bg-pau-yellow px-3 py-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
                  {new Date(match.kickoffAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>

              {/* Teams */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-12 w-12">
                    <Image
                      src={match.isHome ? '/images/homepage/Logo-Pau-FC-2023.png' : match.opponentLogoUrl}
                      alt={match.isHome ? 'Pau FC' : match.opponentName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-display text-xs font-bold uppercase text-pau-night">
                    {match.isHome ? 'PAU FC' : match.opponentName}
                  </span>
                </div>

                <span className="font-display text-xl font-bold text-pau-night/30">
                  VS
                </span>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-12 w-12">
                    <Image
                      src={!match.isHome ? '/images/homepage/Logo-Pau-FC-2023.png' : match.opponentLogoUrl}
                      alt={!match.isHome ? 'Pau FC' : match.opponentName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-display text-xs font-bold uppercase text-pau-night">
                    {!match.isHome ? 'PAU FC' : match.opponentName}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1 border-t border-pau-night/10 pt-4">
                <p className="font-sans text-sm text-pau-night">
                  {new Date(match.kickoffAt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  · {new Date(match.kickoffAt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="font-sans text-sm font-medium text-pau-primary">
                  {match.isHome ? 'Nouste Camp, Pau' : match.venue}
                </p>
              </div>

              {/* CTA */}
              {match.isHome && (
                <Link
                  href={`/billetterie?match=${match.id}`}
                  className="mt-4 block border-2 border-pau-night bg-pau-night py-2 text-center font-display text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:border-white hover:text-pau-night"
                >
                  Réserver
                </Link>
              )}
            </article>
          ))}
        </div>

        {/* Mobile voir tout */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/calendrier"
            className="inline-block border-2 border-pau-night bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-colors hover:bg-pau-night hover:text-white"
          >
            Voir tout le calendrier
          </Link>
        </div>
      </div>
    </section>
  );
}

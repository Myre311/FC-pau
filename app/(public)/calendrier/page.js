'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CalendrierPage() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('tous'); // tous | domicile | exterieur
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les matchs depuis l'API
    fetch('/api/matches')
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredMatches = matches.filter((match) => {
    if (filter === 'domicile') return match.isHome;
    if (filter === 'exterieur') return !match.isHome;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header simple */}
      <div className="border-b border-pau-night/10 bg-white py-12 md:py-16">
        <div className="container-pau">
          <h1 className="font-display text-4xl font-bold uppercase text-pau-night md:text-5xl lg:text-6xl">
            Calendrier Saison 2025/2026
          </h1>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container-pau py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Colonne gauche : Liste des matchs */}
          <div>
            {/* Filtres */}
            <div className="mb-8 flex gap-4">
              <button
                onClick={() => setFilter('tous')}
                className={`border-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-all ${
                  filter === 'tous'
                    ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                    : 'border-pau-night/20 bg-white text-pau-night hover:border-pau-night'
                }`}
              >
                Tous les matchs
              </button>
              <button
                onClick={() => setFilter('domicile')}
                className={`border-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-all ${
                  filter === 'domicile'
                    ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                    : 'border-pau-night/20 bg-white text-pau-night hover:border-pau-night'
                }`}
              >
                Domicile
              </button>
              <button
                onClick={() => setFilter('exterieur')}
                className={`border-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide transition-all ${
                  filter === 'exterieur'
                    ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                    : 'border-pau-night/20 bg-white text-pau-night hover:border-pau-night'
                }`}
              >
                Extérieur
              </button>
            </div>

            {/* Liste des matchs */}
            {loading ? (
              <p className="py-12 text-center font-sans text-lg text-pau-night/60">
                Chargement du calendrier...
              </p>
            ) : filteredMatches.length === 0 ? (
              <p className="py-12 text-center font-sans text-lg text-pau-night/60">
                Aucun match pour ce filtre.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite : Classement */}
          <div>
            <div className="sticky top-24">
              <h2 className="mb-6 font-display text-2xl font-bold uppercase text-pau-night">
                Classement Actuel 2025/2026
              </h2>

              <div className="border-2 border-pau-night/10 bg-white p-6">
                <div className="mb-6 flex items-center justify-center">
                  <Image
                    src="/images/homepage/Logo-Pau-FC-2023.png"
                    alt="Pau FC"
                    width={80}
                    height={80}
                    className="h-20 w-auto"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-pau-night/10 pb-3">
                    <span className="font-sans text-sm text-pau-night/70">Position</span>
                    <span className="font-display text-2xl font-bold text-pau-yellow">8e</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-pau-night/10 pb-3">
                    <span className="font-sans text-sm text-pau-night/70">Points</span>
                    <span className="font-display text-xl font-bold text-pau-night">42</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-b border-pau-night/10 pb-3">
                    <div className="text-center">
                      <div className="mb-1 font-sans text-xs text-pau-night/60">V</div>
                      <div className="font-display text-lg font-bold text-green-600">12</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-sans text-xs text-pau-night/60">N</div>
                      <div className="font-display text-lg font-bold text-gray-600">6</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 font-sans text-xs text-pau-night/60">D</div>
                      <div className="font-display text-lg font-bold text-red-600">8</div>
                    </div>
                  </div>
                  <Link
                    href="/classement"
                    className="mt-4 block border-2 border-pau-night bg-transparent py-2 text-center font-display text-xs font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-night hover:text-white"
                  >
                    Voir le classement complet
                  </Link>
                </div>
              </div>

              {/* Zones de classement */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500" />
                  <span className="font-sans text-pau-night/70">Montée en Ligue 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-orange-500" />
                  <span className="font-sans text-pau-night/70">Barrages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-red-500" />
                  <span className="font-sans text-pau-night/70">Relégation en National</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Match Card
function MatchCard({ match }) {
  const dateObj = new Date(match.kickoffAt);
  const dateFr = dateObj.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const heure = dateObj.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isPlayed = match.status === 'played';

  return (
    <article className="border-2 border-pau-night/10 bg-white p-6 transition-all hover:border-pau-yellow">
      {/* Badge compétition + date */}
      <div className="mb-4 flex items-center justify-between">
        {match.competition && (
          <span className="inline-block border border-pau-yellow bg-pau-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
            {match.competition}
          </span>
        )}
        <span className="font-sans text-sm text-pau-night/60">
          {dateFr} · {heure}
        </span>
      </div>

      {/* Équipes */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={match.isHome ? '/images/homepage/Logo-Pau-FC-2023.png' : match.opponentLogoUrl || '/images/placeholder.png'}
              alt={match.isHome ? 'Pau FC' : match.opponentName}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display text-lg font-bold uppercase text-pau-night">
            {match.isHome ? 'PAU FC' : match.opponentName}
          </span>
        </div>

        {isPlayed ? (
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-bold text-pau-yellow">
              {match.isHome ? match.homeScore : match.awayScore}
            </span>
            <span className="font-display text-xl text-pau-night/40">-</span>
            <span className="font-display text-2xl font-bold text-pau-night/60">
              {match.isHome ? match.awayScore : match.homeScore}
            </span>
          </div>
        ) : (
          <span className="font-display text-xl font-bold text-pau-night/30">VS</span>
        )}

        <div className="flex flex-1 items-center justify-end gap-3">
          <span className="font-display text-lg font-bold uppercase text-pau-night">
            {match.isHome ? match.opponentName : 'PAU FC'}
          </span>
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src={!match.isHome ? '/images/homepage/Logo-Pau-FC-2023.png' : match.opponentLogoUrl || '/images/placeholder.png'}
              alt={!match.isHome ? 'Pau FC' : match.opponentName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Infos lieu */}
      <div className="flex items-center justify-between text-sm text-pau-night/60">
        <span>{match.venue || (match.isHome ? 'Nouste Camp' : 'Extérieur')}</span>
        <span className="font-mono text-xs uppercase">
          {match.isHome ? 'Domicile' : 'Extérieur'}
        </span>
      </div>

      {/* CTA billetterie */}
      {!isPlayed && match.isHome && match.ticketUrl && (
        <a
          href={match.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border-2 border-pau-yellow bg-pau-yellow px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-night hover:border-pau-night hover:text-pau-yellow"
        >
          Billetterie
        </a>
      )}
    </article>
  );
}

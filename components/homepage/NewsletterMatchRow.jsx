'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Section Newsletter + 2 Match Cards
 * 3 colonnes: 40% newsletter | 30% match domicile | 30% match extérieur
 */
export function NewsletterMatchRow({ homeMatch, awayMatch }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Veuillez accepter de recevoir les actualités');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setConsent(false);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-pau">
        <div className="grid gap-8 md:grid-cols-10">
          {/* NEWSLETTER - 40% */}
          <div className="md:col-span-4">
            <div className="sticky top-24 rounded-none border-2 border-paufc-dark bg-paufc-dark p-8">
              <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-paufc-yellow">
                Newsletter
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-white md:text-4xl">
                Restez connecté
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Recevez les dernières actualités du club, les offres exclusives et les coulisses du Pau FC.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="w-full border-2 border-white/20 bg-white/10 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-paufc-yellow focus:outline-none"
                />

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent-home"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <label htmlFor="consent-home" className="font-sans text-xs text-white/60">
                    J'accepte de recevoir les actualités du Pau FC
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full border-2 border-paufc-yellow bg-paufc-yellow py-3 font-display text-sm font-bold uppercase tracking-wide text-paufc-dark transition-all hover:bg-transparent hover:text-paufc-yellow disabled:opacity-50"
                >
                  {status === 'loading' ? 'Envoi...' : "S'inscrire"}
                </button>

                {status === 'success' && (
                  <p className="text-sm font-medium text-green-400">Inscription réussie !</p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-medium text-red-400">Erreur, veuillez réessayer.</p>
                )}
              </form>
            </div>
          </div>

          {/* MATCH DOMICILE - 30% */}
          <div className="md:col-span-3">
            {homeMatch ? (
              <MatchCardCompact match={homeMatch} isHome />
            ) : (
              <div className="flex h-full items-center justify-center border-2 border-gray-200 bg-gray-50 p-8">
                <p className="font-sans text-sm text-gray-400">Aucun match à venir</p>
              </div>
            )}
          </div>

          {/* MATCH EXTÉRIEUR - 30% */}
          <div className="md:col-span-3">
            {awayMatch ? (
              <MatchCardCompact match={awayMatch} isHome={false} />
            ) : (
              <div className="flex h-full items-center justify-center border-2 border-gray-200 bg-gray-50 p-8">
                <p className="font-sans text-sm text-gray-400">Aucun match à venir</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MatchCardCompact({ match, isHome }) {
  const matchDate = new Date(match.kickoffAt);

  return (
    <Link
      href="/calendrier"
      className="block h-full border-2 border-gray-200 bg-white p-6 transition-all hover:border-paufc-yellow"
    >
      <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-paufc-yellow">
        {isHome ? 'Domicile' : 'Extérieur'}
      </span>

      <div className="mt-4">
        <h3 className="font-display text-xl font-bold uppercase text-paufc-dark">
          {isHome ? `Pau FC vs ${match.opponentName}` : `${match.opponentName} vs Pau FC`}
        </h3>
      </div>

      <div className="mt-4 space-y-1">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
          {matchDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
        <p className="font-sans text-sm text-gray-600">{match.venue}</p>
      </div>

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-paufc-yellow">
          Voir le match →
        </span>
      </div>
    </Link>
  );
}

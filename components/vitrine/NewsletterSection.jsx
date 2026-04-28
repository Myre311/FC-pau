'use client';

import { useState } from 'react';

/**
 * Section Newsletter dans le corps de page
 * Formulaire d'inscription aux actualités du club
 */
export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
    <section className="border-y border-pau-night/10 bg-white py-16 md:py-20">
      <div className="container-pau">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-mono text-pau-primary">Newsletter</span>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
            Restez informé(e) des dernières actualités
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-lg text-pau-night/70">
            Recevez en avant-première les infos du club, les offres exclusives et les coulisses du Pau FC.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              {/* Input email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 border-2 border-pau-night/20 bg-white px-6 py-4 font-sans text-base text-pau-night placeholder:text-pau-night/40 focus:border-pau-yellow focus:outline-none"
              />

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="border-2 border-pau-night bg-pau-night px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-pau-yellow hover:border-pau-yellow hover:text-pau-night disabled:opacity-50"
              >
                {status === 'loading' ? 'Envoi...' : "S'inscrire"}
              </button>
            </div>

            {/* Checkbox consentement */}
            <div className="mt-4 flex items-start gap-3 text-left">
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 border-2 border-pau-night/30 text-pau-yellow focus:ring-pau-yellow"
              />
              <label
                htmlFor="newsletter-consent"
                className="font-sans text-sm text-pau-night/70"
              >
                J'accepte de recevoir régulièrement les actualités du Pau FC et je peux me désinscrire à tout moment.
              </label>
            </div>

            {/* Messages de status */}
            {status === 'success' && (
              <p className="mt-4 font-sans text-sm font-medium text-green-600">
                Merci ! Votre inscription a bien été prise en compte.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 font-sans text-sm font-medium text-red-600">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </form>

          <p className="mt-6 font-sans text-xs text-pau-night/50">
            Pas de spam, seulement l'essentiel du Pau FC. Vos données sont protégées.
          </p>
        </div>
      </div>
    </section>
  );
}

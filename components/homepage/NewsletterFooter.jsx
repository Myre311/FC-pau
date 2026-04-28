'use client';

import { useState } from 'react';

/**
 * Footer Newsletter + Réseaux sociaux
 * 2 colonnes: formulaire newsletter + icônes sociales
 */
export function NewsletterFooter() {
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

  const socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/paufootballclub/', icon: 'IG' },
    { name: 'Facebook', url: 'https://www.facebook.com/paufc', icon: 'FB' },
    { name: 'Twitter', url: 'https://twitter.com/paufc', icon: 'X' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@paufc', icon: 'TT' },
    { name: 'YouTube', url: 'https://www.youtube.com/paufc', icon: 'YT' },
  ];

  return (
    <section className="bg-paufc-dark py-16">
      <div className="container-pau">
        <div className="grid gap-12 md:grid-cols-2">
          {/* NEWSLETTER */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
              Restez informé
            </h2>
            <p className="mt-4 font-sans text-base text-white/70">
              Recevez les dernières actualités, offres exclusives et coulisses du club.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 border-2 border-white/20 bg-white/10 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-paufc-yellow focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="border-2 border-paufc-yellow bg-paufc-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-paufc-dark transition-all hover:bg-transparent hover:text-paufc-yellow disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'OK'}
                </button>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-footer"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="consent-footer" className="font-sans text-xs text-white/60">
                  J'accepte de recevoir les actualités du Pau FC
                </label>
              </div>

              {status === 'success' && (
                <p className="text-sm font-medium text-green-400">Inscription réussie !</p>
              )}
              {status === 'error' && (
                <p className="text-sm font-medium text-red-400">Erreur, veuillez réessayer.</p>
              )}
            </form>
          </div>

          {/* RÉSEAUX SOCIAUX */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
              Suivez-nous
            </h2>
            <p className="mt-4 font-sans text-base text-white/70">
              Rejoignez notre communauté sur les réseaux sociaux.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center border-2 border-white/20 bg-white/10 font-mono text-sm font-bold text-white transition-all hover:border-paufc-yellow hover:bg-paufc-yellow hover:text-paufc-dark"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

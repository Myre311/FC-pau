'use client';

import { useState, useEffect } from 'react';

/**
 * Popup Newsletter - Style maquette client
 * S'affiche au chargement (après 2s) sauf si déjà fermée (localStorage)
 */
export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé la popup
    const hasClosedPopup = localStorage.getItem('newsletter-popup-closed');

    if (!hasClosedPopup) {
      // Afficher après 2 secondes
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-popup-closed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Intégrer avec votre API newsletter
    console.log('Newsletter email:', email);

    // Fermer la popup après soumission
    handleClose();

    // Afficher un message de succès (toast ou autre)
    alert('Merci ! Votre code promo a été envoyé à votre adresse email.');
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
    >
      <div
        className="relative w-full max-w-md rounded-none border border-white/20 bg-pau-night p-8 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-3xl text-white/60 transition-colors hover:text-white"
          aria-label="Fermer"
        >
          ×
        </button>

        {/* Tag */}
        <span className="inline-block border border-pau-yellow bg-pau-yellow px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-pau-night">
          OFFRE DE BIENVENUE
        </span>

        {/* Titre */}
        <h2
          id="newsletter-title"
          className="mt-6 font-display text-4xl font-black uppercase leading-tight text-white md:text-5xl"
        >
          REJOINS
          <br />
          LE CLUB.
        </h2>

        {/* Description */}
        <p className="mt-4 font-sans text-base leading-relaxed text-white/80">
          Inscris-toi à la newsletter et profite de{' '}
          <strong className="text-pau-yellow">10% de réduction</strong> sur ta première commande sur notre boutique.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="TON ADRESSE EMAIL"
            required
            className="w-full border border-white/20 bg-white/5 px-4 py-3 font-sans text-sm uppercase tracking-wider text-white placeholder-white/40 transition-colors focus:border-pau-yellow focus:outline-none"
          />

          <button
            type="submit"
            className="w-full border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
          >
            OBTENIR MON CODE
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-center font-sans text-xs text-white/50">
          Pas de spam, seulement l'essentiel du Pau FC.
        </p>
      </div>
    </div>
  );
}

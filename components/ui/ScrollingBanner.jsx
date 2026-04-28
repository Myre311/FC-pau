'use client';

import Image from 'next/image';

/**
 * Bandeau défilant avec logos partenaires
 * Animation infinie horizontale
 */
export function ScrollingBanner({ partners = [] }) {
  // Si pas de partenaires, afficher le texte par défaut
  if (!partners || partners.length === 0) {
    const defaultText = "HOLY — PAU FC 5 · retire 5€ sur ta première commande";
    const repeatedText = Array(20).fill(defaultText).join(' · ');

    return (
      <div className="relative overflow-hidden border-y border-white/10 bg-pau-yellow py-3">
        <div className="animate-marquee whitespace-nowrap font-display text-sm font-bold uppercase tracking-wider text-pau-night">
          {repeatedText}
        </div>
      </div>
    );
  }

  // Répéter les partenaires pour créer l'illusion d'infini
  const repeatedPartners = Array(10).fill(partners).flat();

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-pau-yellow py-6">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
        {repeatedPartners.map((partner, index) => (
          <div key={`${partner.id}-${index}`} className="flex items-center gap-3">
            <div className="relative h-8 w-32 flex-shrink-0">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                fill
                className="object-contain brightness-0"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

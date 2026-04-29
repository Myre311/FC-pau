'use client';

import Image from 'next/image';

/**
 * Bandeau défilant avec logos partenaires
 * Animation infinie horizontale
 */
export function ScrollingBanner({ partners = [] }) {
  // Filtrer uniquement les partenaires avec un logo
  const partnersWithLogo = partners.filter(p => p.logoUrl && p.logoUrl.trim() !== '');

  // Si pas de partenaires avec logo, afficher le texte par défaut
  if (!partnersWithLogo || partnersWithLogo.length === 0) {
    const defaultText = "HOLY — PAU FC 5 · retire 5€ sur ta première commande";
    const repeatedText = Array(20).fill(defaultText).join(' · ');

    return (
      <div className="relative overflow-hidden border-y border-white/10 bg-pau-yellow py-3">
        <div className="animate-marquee-mobile whitespace-nowrap font-display text-sm font-bold uppercase tracking-wider text-pau-night md:animate-marquee">
          {repeatedText}
        </div>
      </div>
    );
  }

  // Répéter les partenaires pour créer l'illusion d'infini
  const repeatedPartners = Array(10).fill(partnersWithLogo).flat();

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-pau-yellow py-6">
      <div className="animate-marquee-mobile flex items-center gap-12 whitespace-nowrap md:animate-marquee">
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

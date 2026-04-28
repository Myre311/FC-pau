'use client';

import Image from 'next/image';
import { useState } from 'react';

const PARTNERS = [
  { name: 'Joma', logo: '/logos/partners/joma.svg' },
  { name: 'Holy', logo: '/logos/partners/holy.svg' },
  { name: 'Intersport', logo: '/logos/partners/intersport.svg' },
  { name: 'Groupama', logo: '/logos/partners/groupama.svg' },
  { name: 'Sarthou', logo: '/logos/partners/sarthou.svg' },
  { name: 'Ville de Pau', logo: '/logos/partners/ville-pau.svg' },
];

function PartnerCard({ name, logo }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex h-24 items-center justify-center border border-pau-night/20 bg-pau-night p-6 transition-colors hover:border-pau-yellow">
      {!imageError ? (
        <Image
          src={logo}
          alt={name}
          width={120}
          height={60}
          className="h-auto w-full object-contain brightness-0 invert"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-display text-base font-bold uppercase text-white/70">
          {name}
        </span>
      )}
    </div>
  );
}

export function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {PARTNERS.map((partner) => (
        <PartnerCard key={partner.name} {...partner} />
      ))}
    </div>
  );
}

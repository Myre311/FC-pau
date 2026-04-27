import Image from 'next/image';

import { POSITION_SHORT } from '@/lib/labels';

export function PlayerCard({ player }) {
  const isStaff = player.role !== 'player';
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-pau-primary">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderPortrait />
        )}

        {!isStaff && player.shirtNumber != null && (
          <span className="absolute right-3 top-3 font-display text-[80px] leading-none text-white/15">
            {player.shirtNumber}
          </span>
        )}
        {!isStaff && player.position && (
          <span className="absolute left-3 top-3 bg-pau-yellow px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-pau-night">
            {POSITION_SHORT[player.position]}
          </span>
        )}
        {isStaff && (
          <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-pau-night">
            Staff
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/40">
          {isStaff ? player.staffTitle : player.nationality ?? '—'}
        </p>
        <p className="mt-2 font-display text-2xl uppercase leading-crush tracking-tightest text-pau-primary">
          {player.firstName}
          <br />
          <span className="text-pau-yellow">{player.lastName}</span>
        </p>
      </div>
    </article>
  );
}

function PlaceholderPortrait() {
  return (
    <div className="flex h-full w-full items-end justify-center bg-gradient-to-b from-pau-primary to-pau-night">
      <svg viewBox="0 0 100 120" className="h-full w-full text-white/10" fill="currentColor" aria-hidden="true">
        <circle cx="50" cy="42" r="18" />
        <path d="M20 120 Q50 70 80 120 Z" />
      </svg>
    </div>
  );
}

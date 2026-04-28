import Image from 'next/image';

import { POSITION_SHORT } from '@/lib/labels';

export function PlayerCard({ player }) {
  const isStaff = player.role !== 'player';
  return (
    <article className="group relative flex flex-col transition-transform hover:scale-[1.02]">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-gray-200 bg-gray-50 transition-all group-hover:bg-white">
        {player.photoUrl && (
          <Image
            src={player.photoUrl}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {!isStaff && player.shirtNumber != null && (
          <span className="absolute right-3 top-3 font-display text-5xl leading-none text-white/20">
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

      <div className="mt-3">
        <p className="font-mono text-xs uppercase tracking-wider text-pau-primary/50">
          {isStaff ? player.staffTitle : player.nationality ?? '—'}
        </p>
        <p className="mt-2 font-display text-base font-bold uppercase text-pau-primary">
          {player.firstName} <span className="text-pau-yellow">{player.lastName}</span>
        </p>
      </div>
    </article>
  );
}

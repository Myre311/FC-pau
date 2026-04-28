import Image from 'next/image';

import { cn } from '@/lib/utils';

// Logo officiel FC Pau : image PNG (913x913) + nom + sous-titre
// reproduit la composition de la nav HTML originale.

export function Logo({ className, size = 'md', showText = true }) {
  const sizes = {
    sm: { img: 32, name: 'text-[13px]', sub: 'text-[8px]' },
    md: { img: 40, name: 'text-[14px]', sub: 'text-[8px]' },
    lg: { img: 52, name: 'text-[16px]', sub: 'text-[9px]' },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <span className={cn('flex items-center gap-[10px]', className)} aria-label="Pau FC">
      <Image
        src="/logo-pau-fc.svg"
        alt="Pau FC"
        width={s.img}
        height={s.img}
        priority
        className="object-contain drop-shadow-[0_2px_8px_rgba(255,204,0,0.2)]"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-display uppercase tracking-[0.1em] text-white', s.name)}>
            PAU FC
          </span>
        </span>
      )}
    </span>
  );
}

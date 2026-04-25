import { cn } from '@/lib/utils';

// Boutons portés des maquettes HTML : font-display (Big Shoulders), letter-
// spacing 0.08em, glow jaune accent intentionnel sur les CTAs primaires
// (et non une "ombre molle générique"), translateY au hover.

const VARIANTS = {
  primary:
    'bg-jaune text-nuit shadow-y-soft hover:bg-jaune hover:shadow-y-strong hover:-translate-y-[2px]',
  secondary:
    'bg-blanc text-nuit hover:bg-blanc/90 hover:-translate-y-[2px]',
  gold:
    'bg-dore text-nuit shadow-g-soft hover:bg-[#d8b85a] hover:-translate-y-[2px]',
  ghost:
    'bg-transparent text-blanc border border-blanc/20 hover:border-blanc/45 hover:bg-blanc/[0.04] hover:-translate-y-[2px]',
  outline:
    'bg-transparent text-jaune border border-jaune/50 hover:bg-jaune hover:text-nuit hover:-translate-y-[2px]',
  danger:
    'bg-transparent text-blanc/60 hover:text-blanc border border-blanc/10 hover:border-blanc/30',
};

const SIZES = {
  sm: 'h-9 px-5 text-[11px]',
  md: 'h-11 px-[26px] text-[12px]',
  lg: 'h-[52px] px-[30px] text-[13px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  cornerCut = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-[10px] font-display uppercase tracking-[0.08em]',
        'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'active:scale-[.97]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2 focus-visible:ring-offset-nuit',
        VARIANTS[variant],
        SIZES[size],
        cornerCut && 'clip-cta-md',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

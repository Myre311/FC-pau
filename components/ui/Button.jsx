import { cn } from '@/lib/utils';

// Boutons portés des maquettes HTML : font-display (Big Shoulders), letter-
// spacing 0.08em, glow jaune accent intentionnel sur les CTAs primaires
// (et non une "ombre molle générique"), translateY au hover.

const VARIANTS = {
  primary:
    'border-2 border-nuit bg-nuit text-blanc hover:bg-primaire hover:border-primaire',
  secondary:
    'border-2 border-nuit bg-blanc text-nuit hover:bg-nuit hover:text-blanc',
  outline:
    'border-2 border-nuit bg-transparent text-nuit hover:bg-nuit/5',
  accent:
    'border-2 border-jaune bg-jaune text-nuit hover:bg-nuit hover:border-nuit hover:text-jaune',
  ghost:
    'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',
  danger:
    'border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600',
};

const SIZES = {
  sm: 'h-9 px-5 text-[11px]',
  md: 'h-11 px-[26px] text-[12px]',
  lg: 'h-[52px] px-[30px] text-[13px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-3 font-display font-bold uppercase tracking-wide',
        'transition-all duration-200',
        'active:scale-[.98]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pau-blue focus-visible:ring-offset-2',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

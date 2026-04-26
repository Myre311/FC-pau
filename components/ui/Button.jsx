import { cn } from '@/lib/utils';

// Boutons portés des maquettes HTML : font-display (Big Shoulders), letter-
// spacing 0.08em, glow jaune accent intentionnel sur les CTAs primaires
// (et non une "ombre molle générique"), translateY au hover.

const VARIANTS = {
  primary:
    'bg-pau-blue text-white rounded-lg shadow-sm hover:bg-pau-blue-dark hover:shadow-blue-medium hover:-translate-y-0.5',
  secondary:
    'bg-white text-pau-blue border-2 border-pau-blue rounded-lg hover:bg-pau-blue hover:text-white hover:-translate-y-0.5',
  outline:
    'bg-transparent text-pau-blue border-2 border-pau-blue rounded-lg hover:bg-pau-blue/5 hover:border-pau-blue-dark hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 hover:-translate-y-0.5',
  danger:
    'bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5',
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

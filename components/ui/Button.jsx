import { cn } from '@/lib/utils';

const VARIANTS = {
  primary:
    'bg-jaune text-nuit hover:bg-jaune/90 active:bg-jaune/80',
  secondary:
    'bg-blanc text-nuit hover:bg-blanc/90 active:bg-blanc/80',
  ghost:
    'bg-transparent text-blanc hover:bg-blanc/5 border border-blanc/20',
  outline:
    'bg-transparent text-blanc border border-blanc/30 hover:border-jaune hover:text-jaune',
  danger:
    'bg-transparent text-blanc/60 hover:text-blanc border border-blanc/10 hover:border-blanc/30',
};

const SIZES = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-14 px-8 text-sm',
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
        'inline-flex items-center justify-center font-mono uppercase tracking-[0.2em]',
        'transition-colors duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2 focus-visible:ring-offset-nuit',
        VARIANTS[variant],
        SIZES[size],
        cornerCut && 'corner-cut',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

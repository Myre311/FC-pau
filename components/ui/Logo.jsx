import { cn } from '@/lib/utils';

// Logo typographique placeholder — sera remplacé par le SVG officiel
// tracé à la main (couronne Henri IV + paon béarnais + Pyrénées + anneau doré).
// Cf. PLAN_FC_PAU.md §2.

export function Logo({ className, withDot = true }) {
  return (
    <span
      className={cn(
        'font-display uppercase leading-crush tracking-tightest',
        'select-none',
        className,
      )}
      aria-label="FC Pau"
    >
      PAU{withDot && <span className="text-jaune">.</span>}FC
    </span>
  );
}

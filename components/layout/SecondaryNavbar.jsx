'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * Barre de navigation secondaire style FC Barcelone
 * Boutique • Billets • Calendrier • Academy
 */
const SECONDARY_NAV = [
  {
    href: '/boutique',
    label: 'Boutique',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/billetterie',
    label: 'Billets',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/calendrier',
    label: 'Calendrier',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/academy',
    label: 'Academy',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function SecondaryNavbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="border-b-2 border-blanc/10 bg-[#1a1d38]"
      aria-label="Navigation secondaire"
    >
      <div className="container-pau">
        <div className="flex items-center justify-center gap-0.5 md:gap-2">
          {SECONDARY_NAV.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex flex-col items-center gap-1 px-2 py-2.5 font-display text-[11px] font-bold uppercase tracking-tight transition-all sm:gap-1.5 sm:px-4 sm:py-3 sm:text-xs md:px-8 md:py-4 md:text-sm ${
                  isActive
                    ? 'text-jaune'
                    : 'text-blanc/80 hover:text-jaune'
                }`}
              >
                {/* Icône */}
                <span className={`h-4 w-4 transition-transform group-hover:scale-110 sm:h-5 sm:w-5 md:h-6 md:w-6 ${isActive ? 'text-jaune' : ''}`}>
                  {item.icon}
                </span>

                {/* Label - en dessous */}
                <span className="whitespace-nowrap text-center text-[10px] leading-none sm:text-[11px] md:text-xs">{item.label}</span>

                {/* Indicateur actif */}
                {isActive && (
                  <motion.div
                    layoutId="secondaryNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-jaune"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

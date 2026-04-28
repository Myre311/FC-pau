'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * Navigation par catégories boutique
 */
const CATEGORIES = [
  { slug: 'all', label: 'Tous les produits' },
  { slug: 'tenues-officielles', label: 'Tenues Officielles 25/26' },
  { slug: 'training', label: 'Training' },
  { slug: 'lifestyle', label: 'Lifestyle' },
  { slug: 'enfant', label: 'Enfant' },
  { slug: 'accessoires', label: 'Accessoires' },
];

export function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categorie') || 'all';

  return (
    <nav className="border-b-2 border-white/10 bg-[#1a1d38]/80 backdrop-blur-sm">
      <div className="container-pau">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-3 md:justify-center md:gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.slug;
            const href = cat.slug === 'all' ? '/boutique' : `/boutique?categorie=${cat.slug}`;

            return (
              <Link
                key={cat.slug}
                href={href}
                className={`group relative flex items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2 font-display text-xs font-bold uppercase tracking-wide transition-all md:px-6 md:py-2.5 md:text-sm ${
                  isActive
                    ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                    : 'border-white/20 bg-transparent text-white/80 hover:bg-gray-50 hover:text-pau-yellow'
                }`}
              >
                {/* Label */}
                <span>{cat.label}</span>

                {/* Indicateur actif */}
                {isActive && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute -bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 bg-pau-yellow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}

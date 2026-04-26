'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Wrapper pour navbar sticky style FC Barcelone
 * - Topbar disparaît au scroll
 * - Header principal reste fixe
 */
export function StickyNavbar({ topbar, header }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Topbar disparaît après 50px de scroll
  const topbarY = useTransform(scrollY, [0, 50], [0, -100]);
  const topbarOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <div className="sticky top-0 z-50">
      {/* Topbar qui disparaît */}
      <motion.div
        style={{
          y: topbarY,
          opacity: topbarOpacity,
        }}
        className="overflow-hidden"
      >
        {topbar}
      </motion.div>

      {/* Header principal qui reste */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        {header}
      </motion.div>
    </div>
  );
}

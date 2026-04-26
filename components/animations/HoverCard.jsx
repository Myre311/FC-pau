'use client';

import { motion } from 'framer-motion';

/**
 * Carte avec effet 3D au hover — Style FC Barcelone
 * Élévation + tilt + ombre portée dynamique
 */
export function HoverCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Carte avec tilt 3D avancé (suit le curseur)
 */
export function TiltCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      variants={{
        initial: {
          rotateX: 0,
          rotateY: 0,
          scale: 1
        },
        hover: {
          scale: 1.05,
          y: -10
        }
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Bouton magnétique (attire le curseur au hover)
 */
export function MagneticButton({ children, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

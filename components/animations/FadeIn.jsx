'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Animation de révélation au scroll — Niveau FC Barcelone
 * Fade in + slide up avec détection automatique du viewport
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] // Courbe Barça (easeOutCubic custom)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger — Révélation en cascade (enfants un par un)
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

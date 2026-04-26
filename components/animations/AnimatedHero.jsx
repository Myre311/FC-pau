'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Hero animé niveau FC Barcelone
 * - Texte avec effet stagger (lettres qui apparaissent)
 * - Badge avec slide + fade
 * - Bouton avec effet magnetic
 * - Overlay avec animation fluide
 */
export function AnimatedHero() {
  const title = "PAU FOOTBALL CLUB";
  const letters = title.split("");

  return (
    <section className="relative overflow-hidden border-b-4 border-jaune">
      {/* Background animé */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="h-full w-full bg-gradient-to-br from-[#1a1d38] via-[#262646] to-[#04091D]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Contenu animé */}
      <div className="container-pau relative z-10 py-24 text-center md:py-32 lg:py-40">

        {/* Badge animé */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-jaune"
        >
          Saison 2025-2026 · Ligue 2 BKT
        </motion.p>

        {/* Titre avec effet stagger lettre par lettre */}
        <h1 className="mb-6 font-display text-5xl font-black uppercase leading-tight text-blanc md:text-6xl lg:text-7xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.03
                }
              }
            }}
            className="inline-block"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.4, 0.25, 1]
                    }
                  }
                }}
                className="inline-block"
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Sous-titre avec fade */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-blanc/90"
        >
          Soutenez les Sang et Or au Nouste Camp
        </motion.p>

        {/* Bouton avec effet magnetic + scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1,
            type: "spring",
            stiffness: 200
          }}
        >
          <Link href="/billetterie">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
              }}
              className="inline-flex items-center gap-3 border-2 border-jaune bg-jaune px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-nuit transition-colors hover:bg-nuit hover:border-nuit hover:text-jaune"
            >
              <motion.svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
              Vos places
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

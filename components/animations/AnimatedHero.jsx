'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Hero animé niveau FC Barcelone
 * - Texte avec effet stagger (lettres qui apparaissent)
 * - Badge avec slide + fade
 * - Bouton avec effet magnetic
 * - Overlay avec animation fluide
 */
export function AnimatedHero() {
  const title = "PAU FOOTBALL CLUB";
  const letters = title.split(·);

  return (
    <section className="relative overflow-hidden border-b-4 border-pau-yellow">
      {/* Vidéo background avec fallback */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Vidéo MP4 hébergée */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay pour lisibilité du texte */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Contenu animé */}
      <div className="container-pau relative z-10 px-4 py-16 text-center sm:py-20 md:py-32 lg:py-40">

        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 flex items-center justify-center gap-2 sm:mb-4 sm:gap-3"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-pau-yellow sm:text-sm">
            Saison 2025-2026
          </span>
          <span className="text-pau-yellow/50">·</span>
          <Image
            src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
            alt="Ligue 2 BKT"
            width={100}
            height={28}
            className="h-auto w-16 sm:w-20 md:w-24"
            priority
          />
        </motion.div>

        {/* Titre avec effet stagger lettre par lettre */}
        <h1 className="mb-4 font-display text-4xl font-black uppercase leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
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
          className="mx-auto mb-6 max-w-2xl px-4 text-base text-white/90 sm:mb-8 sm:text-lg"
        >
          Soutenez-nous au Nouste Camp
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
              className="inline-flex items-center gap-2 border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-xs font-bold uppercase tracking-wide text-pau-night transition-colors hover:bg-pau-night hover:border-pau-night hover:text-pau-yellow sm:gap-3 sm:px-8 sm:py-4 sm:text-sm"
            >
              <motion.svg
                className="h-4 w-4 sm:h-5 sm:w-5"
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
              <span>Vos places</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

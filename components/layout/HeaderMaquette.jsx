'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Header refonte - Sticky 80px
 * - Logo à gauche
 * - Menu burger à droite (mobile)
 * - Fond transparent avec gradient
 */
export function HeaderMaquette() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Fond transparent avec gradient */}
      <div className="pointer-events-none absolute inset-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="relative flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo à gauche */}
        <Link href="/" className="relative z-10">
          <Image
            src="/images/homepage/Logo-Pau-FC-2023.png"
            alt="Pau FC"
            width={50}
            height={50}
            className="h-12 w-auto drop-shadow-[0_2px_8px_rgba(255,204,0,0.2)] md:h-14"
            priority
          />
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link
            href="/billetterie"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Billetterie
          </Link>
          <Link
            href="/boutique"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Boutique
          </Link>
          <Link
            href="/calendrier"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Calendrier
          </Link>
          <Link
            href="/equipe"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Équipe
          </Link>
          <Link
            href="/actualites"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Actualités
          </Link>
          <Link
            href="/club"
            className="font-sans text-base font-medium tracking-wide text-white transition-colors hover:text-paufc-yellow"
          >
            Le Club
          </Link>
        </nav>

        {/* Menu burger mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-6 w-8 flex-col justify-between md:hidden"
          aria-label="Menu"
        >
          <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Menu mobile fullscreen */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-pau-night md:hidden">
          <nav className="flex h-full flex-col items-center justify-center space-y-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Accueil
            </Link>
            <Link
              href="/billetterie"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Billetterie
            </Link>
            <Link
              href="/boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Boutique
            </Link>
            <Link
              href="/calendrier"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Calendrier
            </Link>
            <Link
              href="/equipe"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Équipe
            </Link>
            <Link
              href="/actualites"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Actualités
            </Link>
            <Link
              href="/club"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-white transition-colors hover:text-pau-yellow"
            >
              Le Club
            </Link>
            <Link
              href="/partenaires"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl font-bold uppercase tracking-wide text-pau-gold transition-colors hover:text-pau-gold-hover"
            >
              Partenaires
            </Link>

            {/* Séparateur */}
            <div className="w-16 border-t border-white/20" />

            {/* Lien secondaire */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-lg font-light tracking-wide text-white/70 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

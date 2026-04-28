'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Header refonte - Simple et épuré
 * BILLETTERIE - Logo - BOUTIQUE - Hamburger
 */
export function HeaderMaquette() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-pau-night/90 backdrop-blur-sm">
      <div className="container-pau">
        <div className="flex items-center justify-between py-4">

          {/* GAUCHE - Billetterie */}
          <Link
            href="/billetterie"
            className="font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:text-pau-yellow md:text-sm"
          >
            Billetterie
          </Link>

          {/* CENTRE - Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/homepage/Logo-Pau-FC-2023.png"
              alt="Pau FC"
              width={50}
              height={50}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          {/* DROITE - Boutique + Burger */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/boutique"
              className="font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:text-pau-yellow md:text-sm"
            >
              Boutique
            </Link>

            {/* Menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 flex h-5 w-6 flex-col justify-between"
              aria-label="Menu"
            >
              <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu hamburger fullscreen avec catégories + images */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-pau-night">
          {/* Bouton close en haut à droite */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="fixed right-6 top-6 z-[70] text-white hover:text-pau-yellow"
            aria-label="Fermer"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="container-pau py-20">
            <nav className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* LE GROUPE PRO */}
              <Link
                href="/equipe"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-equipe.jpg"
                    alt="Le groupe pro"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    Le Groupe Pro
                  </h3>
                </div>
              </Link>

              {/* LE CLUB */}
              <Link
                href="/club"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-club.jpg"
                    alt="Le club"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    Le Club
                  </h3>
                </div>
              </Link>

              {/* LES MATCHS */}
              <Link
                href="/calendrier"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-calendrier.jpg"
                    alt="Les matchs"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    Les Matchs
                  </h3>
                </div>
              </Link>

              {/* BILLETTERIE */}
              <Link
                href="/billetterie"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-billetterie.jpg"
                    alt="Billetterie"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    Billetterie
                  </h3>
                </div>
              </Link>

              {/* CENTRE PARTENAIRES */}
              <Link
                href="/partenaires"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-partenaires.jpg"
                    alt="Centre partenaires"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-pau-gold md:text-2xl">
                    Centre Partenaires
                  </h3>
                </div>
              </Link>

              {/* BOUTIQUE */}
              <Link
                href="/boutique"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/images/hero-boutique.jpg"
                    alt="Boutique"
                    fill
                    className="object-cover brightness-75 transition-all group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                    Boutique
                  </h3>
                </div>
              </Link>

            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

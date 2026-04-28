'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * Header refonte
 * - Au début : Simple (BILLETTERIE - Logo - BOUTIQUE)
 * - Au scroll : Fond + Menu complet avec tous les liens
 */
export function HeaderMaquette() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-pau-night/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-pau">
        <div className="flex items-center justify-between py-4">

          {/* GAUCHE - Billetterie */}
          <Link
            href="/billetterie"
            className="font-sans text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-pau-yellow md:text-base"
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
          <div className="flex items-center gap-4">
            <Link
              href="/boutique"
              className="hidden font-sans text-sm font-medium uppercase tracking-wide text-white transition-colors hover:text-pau-yellow md:block md:text-base"
            >
              Boutique
            </Link>

            {/* Menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 flex h-6 w-8 flex-col justify-between"
              aria-label="Menu"
            >
              <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu hamburger fullscreen avec catégories */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-pau-night">
          <div className="container-pau py-24">
            <nav className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

              {/* CLUB */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-yellow">
                  Club
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/equipe"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      L'équipe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/club/histoire"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Histoire
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/club/stade"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Stade
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/academie"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Académie
                    </Link>
                  </li>
                </ul>
              </div>

              {/* MATCHS */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-yellow">
                  Matchs
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/calendrier"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Calendrier
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/billetterie"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Billetterie
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resultats"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Résultats
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ACTUALITÉS */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-yellow">
                  Actualités
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/actualites"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/actualites/communiques"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Communiqués
                    </Link>
                  </li>
                </ul>
              </div>

              {/* BOUTIQUE */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-yellow">
                  Boutique
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/boutique"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Produits
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/boutique/collections"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Collections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/boutique/personnalisation"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Configurateur maillot
                    </Link>
                  </li>
                </ul>
              </div>

              {/* PARTENAIRES */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-gold">
                  Partenaires
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/partenaires"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Nos partenaires
                    </Link>
                  </li>
                </ul>
              </div>

              {/* INFORMATIONS */}
              <div>
                <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-pau-yellow">
                  Informations
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cgv"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      CGV
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mentions-legales"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-sans text-base text-white/80 transition-colors hover:text-white"
                    >
                      Mentions légales
                    </Link>
                  </li>
                </ul>
              </div>

            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

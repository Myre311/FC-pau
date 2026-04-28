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

          {/* CENTRE - Menu complet (visible au scroll uniquement) */}
          {isScrolled && (
            <nav className="absolute left-1/2 top-full hidden -translate-x-1/2 md:flex md:gap-6 lg:gap-8">
              <Link
                href="/calendrier"
                className="whitespace-nowrap font-sans text-sm font-medium text-white/90 transition-colors hover:text-pau-yellow"
              >
                Calendrier
              </Link>
              <Link
                href="/equipe"
                className="whitespace-nowrap font-sans text-sm font-medium text-white/90 transition-colors hover:text-pau-yellow"
              >
                Équipe
              </Link>
              <Link
                href="/actualites"
                className="whitespace-nowrap font-sans text-sm font-medium text-white/90 transition-colors hover:text-pau-yellow"
              >
                Actualités
              </Link>
              <Link
                href="/club"
                className="whitespace-nowrap font-sans text-sm font-medium text-white/90 transition-colors hover:text-pau-yellow"
              >
                Le Club
              </Link>
              <Link
                href="/partenaires"
                className="whitespace-nowrap font-sans text-sm font-medium text-pau-gold transition-colors hover:text-pau-gold-hover"
              >
                Partenaires
              </Link>
            </nav>
          )}

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

      {/* Menu mobile fullscreen */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-pau-night">
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
            <div className="w-16 border-t border-white/20" />
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

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Header style maquette client
 * - Caché au chargement initial
 * - Apparaît au scroll avec fond
 * - Logo centré absolu
 * - Billetterie 25% | Boutique 75%
 * - Menu burger mobile
 */
export function HeaderMaquette() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le header après 100px de scroll
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        isScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Fond avec backdrop blur */}
      <div className="absolute inset-0 bg-pau-night/95 backdrop-blur-md" />

      <div className="relative flex items-center justify-between px-6 py-6 md:px-12 md:py-10">
        {/* Spacer gauche (responsive) */}
        <div className="w-8 md:hidden" />

        {/* Logo centré (absolu) */}
        <Link
          href="/"
          className="absolute left-1/2 top-6 -translate-x-1/2 md:top-3"
        >
          <Image
            src="/images/homepage/Logo-Pau-FC-2023.png"
            alt="Pau FC"
            width={80}
            height={80}
            className="h-16 w-auto drop-shadow-[0_2px_8px_rgba(255,204,0,0.2)] md:h-20"
            priority
          />
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden w-full md:flex">
          <Link
            href="/billetterie"
            className="absolute left-1/4 -translate-x-1/2 font-sans text-lg font-light tracking-wide text-white transition-colors hover:text-white/80"
          >
            Billetterie
          </Link>
          <Link
            href="/boutique"
            className="absolute left-3/4 -translate-x-1/2 font-sans text-lg font-light tracking-wide text-white transition-colors hover:text-white/80"
          >
            Boutique
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

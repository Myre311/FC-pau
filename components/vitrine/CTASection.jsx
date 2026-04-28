'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Section CTA double - Billetterie + Boutique
 * 2 grands blocs cliquables côte à côte
 */
export function CTASection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-pau">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bloc Billetterie */}
          <Link
            href="/billetterie"
            className="group relative overflow-hidden border-2 border-pau-night/10 transition-all duration-300 hover:border-pau-yellow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Image de fond */}
              <Image
                src="/images/homepage/billetterie-enfant.jpg"
                alt="Billetterie Pau FC"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="mb-4 inline-block border border-pau-yellow bg-pau-yellow px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
                  Réserver
                </span>
                <h3 className="mb-4 font-display text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl">
                  Billetterie
                </h3>
                <p className="mb-6 max-w-md font-sans text-lg text-white/80">
                  Assistez aux matchs du Pau FC au Nouste Camp
                </p>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-transform group-hover:translate-x-2">
                  Acheter mes places →
                </span>
              </div>
            </div>
          </Link>

          {/* Bloc Boutique */}
          <Link
            href="/boutique"
            className="group relative overflow-hidden border-2 border-pau-night/10 transition-all duration-300 hover:border-pau-yellow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Image de fond */}
              <Image
                src="/images/homepage/Boutique.png"
                alt="Boutique Pau FC"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="mb-4 inline-block border border-pau-yellow bg-pau-yellow px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
                  Shopping
                </span>
                <h3 className="mb-4 font-display text-4xl font-bold uppercase text-white md:text-5xl lg:text-6xl">
                  Boutique
                </h3>
                <p className="mb-6 max-w-md font-sans text-lg text-white/80">
                  Maillots, accessoires et produits officiels
                </p>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-transform group-hover:translate-x-2">
                  Découvrir la boutique →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero split 50/50 - Refonte Homepage
 * Gauche: Noms équipes en serif italic
 * Droite: Photo personnes en maillots avec label BOUTIQUE
 */
export function HeroSplit() {
  return (
    <section className="relative h-screen min-h-[600px] bg-paufc-dark">
      <div className="grid h-full md:grid-cols-2">
        {/* GAUCHE - Noms équipes */}
        <div className="relative flex flex-col items-center justify-center p-8 md:p-12">
          <div className="space-y-8 text-center">
            {/* Pau FC */}
            <div>
              <h1 className="font-serif text-6xl font-bold italic text-white md:text-7xl lg:text-8xl">
                Pau FC
              </h1>
            </div>

            {/* VS */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-paufc-yellow" />
              <span className="font-sans text-sm font-medium uppercase tracking-wider text-paufc-yellow">
                VS
              </span>
              <div className="h-px w-12 bg-paufc-yellow" />
            </div>

            {/* Amiens */}
            <div>
              <h2 className="font-serif text-5xl font-bold italic text-white/80 md:text-6xl lg:text-7xl">
                Amiens
              </h2>
            </div>

            {/* Date et heure */}
            <div className="pt-4">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">
                Samedi 3 mai 2026 · 19h00
              </p>
              <p className="mt-2 font-sans text-base text-white/50">
                Stade du Hameau · Pau
              </p>
            </div>

            {/* CTA Billetterie */}
            <div className="pt-6">
              <Link
                href="/billetterie"
                className="inline-block border-2 border-paufc-yellow bg-paufc-yellow px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-paufc-dark transition-all hover:bg-transparent hover:text-paufc-yellow"
              >
                Réserver ma place
              </Link>
            </div>
          </div>
        </div>

        {/* DROITE - Photo boutique */}
        <div className="relative">
          <Image
            src="/images/homepage/Boutique.png"
            alt="Supporters Pau FC en maillots officiels"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay gradient subtil */}
          <div className="absolute inset-0 bg-gradient-to-t from-paufc-dark/40 to-transparent" />

          {/* Label BOUTIQUE */}
          <div className="absolute bottom-8 left-8">
            <Link
              href="/boutique"
              className="group inline-block"
            >
              <div className="border-2 border-white bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white">
                <span className="font-display text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-paufc-dark">
                  Boutique officielle
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

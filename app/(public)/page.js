import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { ScrollingBanner } from '@/components/ui/ScrollingBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau FC — Club de football professionnel',
  description: 'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  const nextAwayMatch = await prisma.match
    .findFirst({
      where: {
        kickoffAt: { gte: new Date() },
        status: 'scheduled',
        isHome: false,
      },
      orderBy: { kickoffAt: 'asc' },
    })
    .catch(() => null);

  return (
    <>
      <NewsletterPopup />

      {/* SECTION 1 - HERO : Vidéo Badge (gauche) + Photo Maillots (droite) */}
      <section className="relative h-screen min-h-[600px] bg-pau-night">
        <div className="grid h-full md:grid-cols-2">
          {/* GAUCHE - Vidéo */}
          <div className="relative overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* DROITE - Photo Maillots */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/homepage/Boutique.png"
              alt="Maillots Pau FC"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 - NEWSLETTER (gauche) + CARDS MATCH (droite) */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* GAUCHE - NEWSLETTER avec photo stade */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Photo stade en fond */}
              <Image
                src="/images/homepage/Boutique.png"
                alt="Stade Nouste Camp"
                fill
                className="object-cover brightness-50"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/80 to-transparent" />

              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                {/* NEWSLETTER en gros jaune */}
                <h2 className="mb-6 font-display text-5xl font-bold uppercase text-pau-yellow md:text-6xl lg:text-7xl">
                  Newsletter
                </h2>

                <p className="mb-6 font-sans text-sm text-white/90">
                  Restez informé des dernières actualités du club
                </p>

                {/* Formulaire */}
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    className="w-full bg-white px-4 py-3 font-sans text-sm text-pau-night placeholder:text-pau-night/50 focus:outline-none"
                  />
                  <button className="w-full bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-yellow/90">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>

            {/* DROITE - 3 CARDS */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Card BILLETTERIE */}
              <Link
                href="/billetterie"
                className="flex flex-col justify-between border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow md:col-span-2"
              >
                <div>
                  <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                    Billetterie
                  </span>
                  <h3 className="mb-2 font-display text-2xl font-bold uppercase text-white md:text-3xl">
                    Vendredi 16 Mars
                  </h3>
                  <p className="font-mono text-sm text-white/70">20h00 · Domicile</p>
                </div>
              </Link>

              {/* Card BOUTIQUE */}
              <Link
                href="/boutique"
                className="flex flex-col justify-between border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow"
              >
                <div>
                  <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                    Boutique
                  </span>
                  <h3 className="mb-2 font-display text-xl font-bold uppercase text-white md:text-2xl">
                    Vendredi 23 Avril
                  </h3>
                </div>
              </Link>

              {/* Card MATCH EXTÉRIEUR */}
              <Link
                href="/calendrier"
                className="flex flex-col justify-between border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow"
              >
                <div>
                  <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                    Extérieur
                  </span>
                  <h3 className="mb-2 font-display text-xl font-bold uppercase text-white md:text-2xl">
                    Le Mans vs Pau FC
                  </h3>
                  {nextAwayMatch && (
                    <p className="font-mono text-sm text-white/70">
                      {new Date(nextAwayMatch.kickoffAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </p>
                  )}
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - BANDEAU HOLY JAUNE */}
      <ScrollingBanner text="HOLY FC 5 — retire 5€ sur ta première commande" />

      {/* SECTION 4 - INSTAGRAM GRID 4x2 */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">

          {/* Titre */}
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
              @paufootballclub
            </h2>
          </div>

          {/* Grille 4x2 */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <a
                key={i}
                href="https://www.instagram.com/paufootballclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-pau-primary"
              >
                <Image
                  src="/images/homepage/Boutique.png"
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}

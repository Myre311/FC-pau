import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MatchCardWithCountdown } from '@/components/vitrine/MatchCardWithCountdown';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { ScrollingBanner } from '@/components/ui/ScrollingBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau FC — Club de football professionnel',
  description: 'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  // Récupérer le prochain match à domicile
  const upcomingMatch = await prisma.match
    .findFirst({
      where: {
        kickoffAt: { gte: new Date() },
        status: 'scheduled',
        isHome: true,
      },
      orderBy: { kickoffAt: 'asc' },
    })
    .catch(() => null);

  // Récupérer le prochain match extérieur
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
      {/* Newsletter popup */}
      <NewsletterPopup />

      {/* Section 1 - Hero Split Vidéo/Photo Maillots */}
      <section className="relative min-h-screen bg-pau-night">
        <div className="grid min-h-screen md:grid-cols-2">
          {/* GAUCHE - Vidéo Badge Pau FC */}
          <div className="relative flex items-center justify-center overflow-hidden bg-pau-night">
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

      {/* Section 2 - Newsletter (gauche) + Cards Match (droite) */}
      <section className="relative bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* GAUCHE - Newsletter (2/5) */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/homepage/Boutique.png"
                  alt="Stade Pau FC"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

                {/* Contenu Newsletter */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h2 className="mb-4 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
                    Newsletter
                  </h2>
                  <p className="mb-4 font-sans text-sm text-white/80">
                    Restez informé des dernières actualités du club
                  </p>
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    className="mb-3 w-full border-2 border-white/20 bg-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:border-pau-yellow focus:outline-none"
                  />
                  <button className="w-full border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>

            {/* DROITE - Cards Match (3/5) */}
            <div className="space-y-4 lg:col-span-3">
              {/* Card Billetterie */}
              <Link
                href="/billetterie"
                className="block border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow"
              >
                <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
                  Billetterie
                </span>
                <h3 className="mb-2 font-display text-xl font-bold uppercase text-white md:text-2xl">
                  Vendredi 16 Mars
                </h3>
                <p className="font-mono text-sm text-white/70">20h00 • Domicile</p>
              </Link>

              {/* Card Boutique */}
              <Link
                href="/boutique"
                className="block border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow"
              >
                <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
                  Boutique
                </span>
                <h3 className="mb-2 font-display text-xl font-bold uppercase text-white md:text-2xl">
                  Vendredi 23 Avril
                </h3>
                <p className="font-mono text-sm text-white/70">Nouvelle collection</p>
              </Link>

              {/* Card Match Extérieur */}
              {nextAwayMatch && (
                <Link
                  href="/calendrier"
                  className="block border-2 border-white/10 bg-pau-primary p-6 transition-all hover:border-pau-yellow"
                >
                  <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
                    Extérieur
                  </span>
                  <h3 className="mb-2 font-display text-xl font-bold uppercase text-white md:text-2xl">
                    Le Mans vs Pau FC
                  </h3>
                  <p className="font-mono text-sm text-white/70">
                    {new Date(nextAwayMatch.kickoffAt).toLocaleDateString('fr-FR')}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Bandeau HOLY */}
      <ScrollingBanner text="HOLY FC 5 — retire 5€ sur ta première commande" />

      {/* Section 4 - Instagram Grid */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          {/* Titre */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold uppercase text-white md:text-4xl">
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
                  alt={`Instagram ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-pau-night/0 transition-all group-hover:bg-pau-night/20" />
              </a>
            ))}
          </div>

          {/* Bouton Suivre */}
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/paufootballclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-pau-yellow bg-transparent px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
            >
              Suivre @paufootballclub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

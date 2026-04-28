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
  // Récupérer le prochain match à domicile
  const nextHomeMatch = await prisma.match
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

  // Récupérer tous les partenaires actifs pour le bandeau
  const partners = await prisma.partner
    .findMany({
      where: { active: true },
      orderBy: [{ tier: 'asc' }, { position: 'asc' }],
    })
    .catch(() => []);

  return (
    <>
      <NewsletterPopup />

      {/* SECTION 1 - HERO : Badge animé (gauche) + Photo Maillots (droite) */}
      <section className="relative h-screen min-h-[600px] bg-pau-night">
        <div className="grid h-full md:grid-cols-2">

          {/* GAUCHE - Badge avec texte match */}
          <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-pau-night via-pau-primary to-pau-night p-8">
            {/* Badge Pau FC */}
            <div className="relative z-10 text-center">
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Pau FC"
                width={300}
                height={300}
                className="mx-auto mb-8 h-64 w-64 object-contain md:h-80 md:w-80"
                priority
              />

              {/* Texte match */}
              <div className="space-y-2">
                <h1 className="font-display text-4xl font-bold uppercase leading-none text-white md:text-5xl lg:text-6xl">
                  Pau FC
                </h1>
                <p className="font-display text-2xl font-bold uppercase text-white/60 md:text-3xl">
                  vs
                </p>
                <h2 className="font-display text-4xl font-bold uppercase leading-none text-white md:text-5xl lg:text-6xl">
                  Amiens
                </h2>
              </div>
            </div>

            {/* Pattern de fond */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[url('/images/homepage/Logo-Pau-FC-2023.png')] bg-cover bg-center" />
            </div>
          </div>

          {/* DROITE - Photo Maillots */}
          <div className="relative overflow-hidden">
            <Image
              src="/images/hero-boutique.jpg"
              alt="Maillots Pau FC"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 - NEWSLETTER (gauche) + CARDS (droite) */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* GAUCHE - NEWSLETTER avec photo stade */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/hero-stade.jpg"
                alt="Stade Nouste Camp"
                fill
                className="object-cover brightness-50"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                <h2 className="mb-4 font-display text-5xl font-bold uppercase leading-none text-pau-yellow md:text-6xl lg:text-7xl">
                  Newsletter
                </h2>

                <p className="mb-6 font-sans text-sm text-white/90">
                  Restez informé des dernières actualités du club
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    className="flex-1 bg-white px-4 py-3 font-sans text-sm text-pau-night placeholder:text-pau-night/50 focus:outline-none"
                  />
                  <button className="bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-yellow/90">
                    OK
                  </button>
                </div>
              </div>
            </div>

            {/* DROITE - CARDS + SECTION MATCH */}
            <div className="space-y-4">

              {/* 3 CARDS en grille */}
              <div className="grid gap-4 md:grid-cols-2">

                {/* Card BILLETTERIE avec countdown */}
                <Link
                  href="/billetterie"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover md:col-span-2"
                >
                  <div>
                    <span className="mb-2 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                      Billetterie
                    </span>
                    <h3 className="mb-1 font-display text-xl font-bold uppercase text-white">
                      20/4/08
                    </h3>
                    <p className="font-mono text-2xl font-bold text-white">08:00:00:00</p>
                  </div>
                </Link>

                {/* Card BOUTIQUE */}
                <Link
                  href="/boutique"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover"
                >
                  <div>
                    <span className="mb-2 inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                      Boutique
                    </span>
                    <h3 className="mb-3 font-display text-lg font-bold uppercase text-white">
                      Vendredi 16 Avril
                    </h3>
                    <button className="border-2 border-pau-yellow bg-transparent px-4 py-2 font-mono text-xs font-bold uppercase text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night">
                      Voir
                    </button>
                  </div>
                </Link>

                {/* Card MATCH EXTÉRIEUR */}
                <Link
                  href="/calendrier"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover"
                >
                  <div>
                    <h3 className="mb-3 font-display text-lg font-bold uppercase text-white">
                      Le Mans<br />Pau FC
                    </h3>
                    <div className="space-y-2">
                      <p className="font-mono text-xs text-white/70">
                        Vendredi 23 Avril
                      </p>
                      <button className="border-2 border-pau-yellow bg-transparent px-4 py-2 font-mono text-xs font-bold uppercase text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night">
                        Voir
                      </button>
                    </div>
                  </div>
                </Link>

              </div>

              {/* SECTION MATCH avec logos clubs */}
              {nextHomeMatch && (
                <div className="flex items-center justify-between bg-pau-primary p-6">
                  <div className="flex items-center gap-6">
                    <Image
                      src="/images/homepage/Logo-Pau-FC-2023.png"
                      alt="Pau FC"
                      width={60}
                      height={60}
                      className="h-16 w-16 object-contain"
                    />
                    <span className="font-display text-2xl font-bold text-white">vs</span>
                    <div className="h-16 w-16 rounded-full bg-white" />
                  </div>

                  <Link
                    href="/billetterie"
                    className="border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
                  >
                    Billetterie
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - BANDEAU PARTENAIRES */}
      <ScrollingBanner partners={partners} />

      {/* SECTION 4 - INSTAGRAM GRID 4x2 */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
              @paufootballclub
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              '/images/hero-equipe.jpg',
              '/images/hero-boutique.jpg',
              '/images/hero-stade.jpg',
              '/images/hero-calendrier.jpg',
              '/images/hero-actualites.jpg',
              '/images/hero-club.jpg',
              '/images/hero-billetterie.jpg',
              '/images/hero-accueil.jpg'
            ].map((img, i) => (
              <a
                key={i}
                href="https://www.instagram.com/paufootballclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Instagram ${i + 1}`}
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

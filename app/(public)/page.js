import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { ScrollingBanner } from '@/components/ui/ScrollingBanner';
import { AnimateOnScroll, ScaleOnScroll } from '@/components/ui/AnimateOnScroll';

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

  // Récupérer les derniers articles publiés
  const recentArticles = await prisma.article
    .findMany({
      where: {
        publishedAt: { lte: new Date() },
      },
      orderBy: { publishedAt: 'desc' },
      take: 6,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        category: true,
      },
    })
    .catch(() => []);

  return (
    <>
      <NewsletterPopup />

      {/* SECTION 1 - HERO : Vidéo (gauche) + Photo Maillots (droite) */}
      <section className="relative bg-pau-night md:h-screen md:min-h-[600px]">
        <div className="grid h-full grid-cols-1 md:grid-cols-2">

          {/* GAUCHE - Vidéo */}
          <div className="relative min-h-[50vh] overflow-hidden md:min-h-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

            {/* Texte superposé */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
              <div className="mb-4">
                <Image
                  src="/images/hero-calendrier-icon.png"
                  alt="Calendrier"
                  width={120}
                  height={120}
                  className="h-24 w-auto md:h-32 lg:h-40"
                />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Saison 2025/2026
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                Calendrier<br />& Matchs
              </h2>
              <Link
                href="/calendrier"
                className="mt-6 inline-block w-fit border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
              >
                Voir les matchs
              </Link>
            </div>
          </div>

          {/* DROITE - Photo Maillots */}
          <div className="relative min-h-[50vh] overflow-hidden md:min-h-0">
            <Image
              src="/images/hero-boutique.jpg"
              alt="Maillots Pau FC"
              fill
              className="object-cover"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

            {/* Texte superposé */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Nouvelle Collection
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                Boutique<br />Officielle
              </h2>
              <Link
                href="/boutique"
                className="mt-6 inline-block w-fit border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
              >
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - NEWSLETTER (gauche) + CARDS (droite) */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">

            {/* GAUCHE - NEWSLETTER avec photo stade */}
            <AnimateOnScroll delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/hero-stade.jpg"
                alt="Stade Nouste Camp"
                fill
                className="object-cover brightness-50"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10">
                <h2 className="mb-4 font-display text-5xl font-bold uppercase leading-none text-pau-yellow md:text-6xl lg:text-7xl">
                  Newsletter
                </h2>

                <p className="mb-6 font-sans text-sm text-white/90">
                  Recevez toutes les actualités du club directement dans votre boîte mail
                </p>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-1 bg-white px-4 py-3 font-sans text-sm text-pau-night placeholder:text-pau-night/50 focus:outline-none"
                  />
                  <button className="bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-yellow/90">
                    S'abonner
                  </button>
                </div>
              </div>
            </div>
            </AnimateOnScroll>

            {/* DROITE - CARDS + SECTION MATCH */}
            <div className="space-y-4">

              {/* 3 CARDS en grille */}
              <div className="grid gap-5 md:grid-cols-2">

                {/* Card BILLETTERIE avec countdown */}
                <ScaleOnScroll delay={0.1} className="md:col-span-2">
                <Link
                  href="/billetterie"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover hover:scale-[1.02]"
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
                </ScaleOnScroll>

                {/* Card BOUTIQUE */}
                <ScaleOnScroll delay={0.2}>
                <Link
                  href="/boutique"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover hover:scale-[1.02]"
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
                </ScaleOnScroll>

                {/* Card MATCH EXTÉRIEUR */}
                <ScaleOnScroll delay={0.3}>
                <Link
                  href="/calendrier"
                  className="group flex flex-col justify-between bg-pau-primary p-6 transition-all hover:bg-pau-primary-hover hover:scale-[1.02]"
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
                </ScaleOnScroll>

              </div>

              {/* SECTION MATCH avec logos clubs */}
              <ScaleOnScroll delay={0.4}>
              <div className="flex flex-col gap-4 rounded-lg bg-pau-primary p-6">
                {/* Logo Ligue 2 BKT */}
                <div className="flex justify-center">
                  <Image
                    src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
                    alt="Ligue 2 BKT"
                    width={120}
                    height={34}
                    className="h-auto w-24 object-contain md:w-28"
                  />
                </div>

                {/* Équipes */}
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  {/* Pau FC */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 md:h-20 md:w-20">
                      <Image
                        src="/images/homepage/Logo-Pau-FC-2023.png"
                        alt="Pau FC"
                        width={60}
                        height={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-display text-sm font-bold uppercase text-white md:text-base">
                      Pau FC
                    </span>
                  </div>

                  <span className="font-display text-xl font-bold text-white md:text-2xl">vs</span>

                  {/* Équipe adverse */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 md:h-20 md:w-20">
                      <Image
                        src="/images/homepage/Logo-MHSC.png"
                        alt="Montpellier"
                        width={60}
                        height={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-display text-sm font-bold uppercase text-white md:text-base">
                      Montpellier
                    </span>
                  </div>
                </div>

                {/* Bouton Billetterie */}
                <Link
                  href="/billetterie"
                  className="w-full border-2 border-pau-yellow bg-pau-yellow px-6 py-3 text-center font-display text-xs font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow md:text-sm"
                >
                  Billetterie
                </Link>
              </div>
              </ScaleOnScroll>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - BANDEAU PARTENAIRES */}
      <section className="bg-white pb-0 pt-12 md:pt-16">
        <div className="container-pau">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
              Les partenaires
            </h2>
          </div>
        </div>
      </section>
      <ScrollingBanner partners={partners} />

      {/* SECTION 4 - ARTICLES RÉCENTS */}
      <section className="bg-white pb-18 pt-16 md:pb-24 md:pt-20">
        <div className="container-pau">
          <div className="mb-14">
            <h2 className="font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
              Actualités
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article, index) => (
              <AnimateOnScroll key={article.id} delay={index * 0.1}>
              <Link
                href={`/actualites/${article.slug}`}
                className="group block overflow-hidden rounded-lg bg-pau-primary transition-all hover:bg-pau-primary-hover hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {article.coverImageUrl ? (
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-pau-night" />
                  )}
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-pau-yellow">
                      {article.category}
                    </span>
                    <span className="text-white/40">·</span>
                    <time className="font-mono text-xs text-white/60">
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>

                  <h3 className="mb-3 font-display text-xl font-bold uppercase leading-tight text-white line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-sm leading-relaxed text-white/70 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Lien voir tous les articles */}
          <div className="mt-12 text-center">
            <Link
              href="/actualites"
              className="inline-block border-2 border-pau-yellow bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
            >
              Voir toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 - INSTAGRAM GRID 4x2 */}
      <section className="bg-white py-18 md:py-24">
        <div className="container-pau">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
              Suivez-nous sur Instagram
            </h2>
            <p className="mt-2 font-mono text-sm text-pau-yellow">@paufootballclub</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
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
              <ScaleOnScroll key={i} delay={i * 0.05}>
              <a
                href="https://www.instagram.com/paufootballclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Instagram ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
              </a>
              </ScaleOnScroll>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

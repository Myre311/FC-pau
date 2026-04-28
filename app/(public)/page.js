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

      {/* Section Hero - Split Vidéo/Boutique */}
      <section className="relative min-h-screen bg-pau-night">
        <div className="grid min-h-screen md:grid-cols-2">
          {/* GAUCHE - Vidéo */}
          <div className="relative overflow-hidden bg-pau-night">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            {/* Overlay subtil pour contraste */}
            <div className="absolute inset-0 bg-pau-night/10" />
          </div>

          {/* DROITE - Maillots/Boutique */}
          <div className="relative overflow-hidden">
            {/* Image de fond */}
            <Image
              src="/images/homepage/Boutique.png"
              alt="Maillots officiels Pau FC"
              fill
              className="object-cover"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-pau-night/80 via-pau-night/20 to-transparent" />

            {/* Contenu superposé */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="space-y-6">
                {/* Badge */}
                <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                  Prochain match
                </span>

                {/* Infos match */}
                <div>
                  <h2 className="font-display text-3xl font-bold uppercase text-white md:text-4xl lg:text-5xl">
                    Pau FC vs Amiens
                  </h2>
                  <p className="mt-2 font-mono text-sm uppercase tracking-wider text-white/70">
                    Vendredi 26/04 · 20h00 · Nouste Camp
                  </p>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/billetterie"
                    className="border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
                  >
                    Billetterie
                  </Link>
                  <Link
                    href="/boutique"
                    className="border-2 border-white bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-pau-night"
                  >
                    Boutique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Maillots */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-pau">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/boutique/Boutique-1.jpg"
                alt="Maillots officiels Pau FC"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Maillots officiels Pau FC
              </h2>
              <p className="mb-6 font-sans text-lg text-pau-night/70">
                Découvrez la collection officielle des maillots du Pau FC saison 2025/2026.
              </p>
              <Link
                href="/boutique"
                className="inline-block border-2 border-pau-night bg-pau-night px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-pau-yellow hover:border-pau-yellow hover:text-pau-night"
              >
                Voir la boutique
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Prochain Match (avec countdown) */}
      {upcomingMatch && (
        <section className="bg-pau-night py-16 md:py-20">
          <div className="container-pau">
            <div className="mx-auto max-w-4xl">
              <MatchCardWithCountdown match={upcomingMatch} />
            </div>
          </div>
        </section>
      )}

      {/* Prochain Match Extérieur */}
      {nextAwayMatch && (
        <section className="bg-white py-12">
          <div className="container-pau">
            <Link
              href="/calendrier"
              className="block border-2 border-pau-night/10 p-6 transition-all hover:border-pau-yellow md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
                    {new Date(nextAwayMatch.kickoffAt).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })} · Extérieur
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-pau-night md:text-2xl">
                    {nextAwayMatch.opponentName} vs Pau FC
                  </h3>
                  <p className="mt-2 font-sans text-sm text-pau-night/60">
                    {nextAwayMatch.venue}
                  </p>
                </div>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-pau-yellow">
                  Voir →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Bandeau défilant */}
      <ScrollingBanner />

      {/* Section Instagram */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-pau text-center">
          <h2 className="mb-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
            @paufootballclub
          </h2>
          <p className="mb-8 font-sans text-lg text-pau-night/70">
            Suivez-nous sur Instagram pour ne rien manquer
          </p>
          <a
            href="https://www.instagram.com/paufootballclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-pau-night bg-transparent px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-night hover:text-white"
          >
            Suivre
          </a>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { HeaderMaquette } from '@/components/layout/HeaderMaquette';
import { FooterMaquette } from '@/components/layout/FooterMaquette';
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

      {/* Header */}
      <HeaderMaquette />

      {/* Section Hero - Split Newsletter/Boutique comme refonte */}
      <section className="relative min-h-screen bg-pau-night">
        <div className="grid min-h-screen md:grid-cols-2">
          {/* GAUCHE - Newsletter "REJOINS LE CLUB" */}
          <div className="relative flex flex-col items-center justify-center bg-pau-night p-8 md:p-12 lg:p-16">
            <div className="w-full max-w-xl space-y-8">
              {/* Titre */}
              <div>
                <h1 className="font-display text-5xl font-bold uppercase text-white md:text-6xl lg:text-7xl">
                  Rejoins
                  <br />
                  <span className="text-pau-yellow">le Club</span>
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="font-sans text-lg text-white/80">
                  Inscris-toi à la newsletter et profite de{' '}
                  <span className="font-bold text-pau-yellow">10% de réduction</span> sur ta première commande
                </p>
              </div>

              {/* Formulaire Newsletter */}
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Ton adresse email"
                  className="w-full border-2 border-white/20 bg-white/10 px-6 py-4 font-sans text-white placeholder:text-white/40 focus:border-pau-yellow focus:outline-none"
                />
                <button className="w-full border-2 border-pau-yellow bg-pau-yellow px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow">
                  Obtenir mon code
                </button>
              </div>
            </div>
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

      {/* Footer */}
      <FooterMaquette />
    </>
  );
}

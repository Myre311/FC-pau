import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { HeaderMaquette } from '@/components/layout/HeaderMaquette';
import { MatchCardWithCountdown } from '@/components/vitrine/MatchCardWithCountdown';
import { NewsletterPopup } from '@/components/ui/NewsletterPopup';
import { ScrollingBanner } from '@/components/ui/ScrollingBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau FC — Club de football professionnel',
  description:
    'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePageMaquette() {
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

  return (
    <>
      {/* Newsletter popup */}
      <NewsletterPopup />

      {/* Header maquette */}
      <HeaderMaquette />

      {/* Bandeau promotionnel */}
      <div className="fixed bottom-0 left-0 z-40 w-full md:hidden">
        <ScrollingBanner />
      </div>

      {/* Desktop : Layout splitté 50/50 fixe */}
      <div className="hidden md:block">
        <div className="fixed inset-0 h-screen w-full overflow-hidden bg-pau-night">
          {/* Vidéo gauche 50% */}
          <div className="absolute left-0 top-0 h-full w-1/2">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Image boutique droite 50% */}
          <div className="absolute right-0 top-0 h-full w-1/2">
            <Image
              src="/images/homepage/Boutique.png"
              alt="Boutique Pau FC"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Carte match centrée */}
          {upcomingMatch && (
            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-6">
              <MatchCardWithCountdown match={upcomingMatch} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile : Hero vidéo + match card */}
      <div className="block md:hidden">
        <section className="relative min-h-screen overflow-hidden bg-pau-night">
          {/* Vidéo hero mobile */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

          {/* Contenu */}
          <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-20">
            {upcomingMatch && (
              <MatchCardWithCountdown match={upcomingMatch} />
            )}

            {/* Spacer pour éviter que le contenu touche le bas */}
            <div className="h-20" />
          </div>
        </section>

        {/* Section suivante (peut contenir actualités, etc.) */}
        <section className="bg-white px-6 py-12">
          <h2 className="font-display text-3xl font-bold uppercase text-pau-primary">
            Actualités
          </h2>
          {/* ... contenu actualités ... */}
        </section>
      </div>
    </>
  );
}

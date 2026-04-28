import { prisma } from '@/lib/prisma';
import { HeaderMaquette } from '@/components/layout/HeaderMaquette';
import { HeroSplit } from '@/components/homepage/HeroSplit';
import { NewsletterMatchRow } from '@/components/homepage/NewsletterMatchRow';
import { PromoMarquee } from '@/components/homepage/PromoMarquee';
import { InstagramGrid } from '@/components/homepage/InstagramGrid';
import { SponsorsRow } from '@/components/homepage/SponsorsRow';
import { NewsletterFooter } from '@/components/homepage/NewsletterFooter';
import { FooterSitemap } from '@/components/homepage/FooterSitemap';
import { FooterBottom } from '@/components/homepage/FooterBottom';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau FC — Club de football professionnel',
  description: 'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  // Récupérer le prochain match à domicile
  const homeMatch = await prisma.match
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
  const awayMatch = await prisma.match
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
      {/* 1. Header sticky */}
      <HeaderMaquette />

      {/* 2. Hero Split 50/50 - Pau FC vs Amiens */}
      <HeroSplit />

      {/* 3. Newsletter + 2 Match Cards (3 colonnes) */}
      <NewsletterMatchRow homeMatch={homeMatch} awayMatch={awayMatch} />

      {/* 4. Bandeau défilant promotionnel */}
      <PromoMarquee />

      {/* 5. Grille Instagram 4x2 */}
      <InstagramGrid />

      {/* 6. Logos partenaires */}
      <SponsorsRow />

      {/* 7. Newsletter + Réseaux sociaux */}
      <NewsletterFooter />

      {/* 8. Sitemap footer (6 colonnes) */}
      <FooterSitemap />

      {/* 9. Footer bottom (adresse, légal, copyright) */}
      <FooterBottom />
    </>
  );
}

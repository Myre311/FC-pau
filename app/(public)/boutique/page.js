import { prisma } from '@/lib/prisma';
import { HeroCarousel } from '@/components/shop/HeroCarousel';
import { AsymmetricSection } from '@/components/shop/AsymmetricSection';
import { ProductCardMaquette } from '@/components/shop/ProductCardMaquette';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Boutique',
  description:
    'Boutique officielle du Pau FC. Maillots, training, lifestyle et accessoires.',
};

export default async function BoutiqueMaquettePage() {
  // Récupérer les produits par catégorie
  const [tenues, training, lifestyle] = await Promise.all([
    prisma.product.findMany({
      where: {
        status: 'active',
        category: { slug: 'tenues-officielles' },
      },
      include: { category: true, variants: true },
      take: 4,
    }).catch(() => []),
    prisma.product.findMany({
      where: {
        status: 'active',
        category: { slug: 'training' },
      },
      include: { category: true, variants: true },
      take: 4,
    }).catch(() => []),
    prisma.product.findMany({
      where: {
        status: 'active',
        category: { slug: 'lifestyle' },
      },
      include: { category: true, variants: true },
      take: 4,
    }).catch(() => []),
  ]);

  // Slides du carousel
  const heroSlides = [
    {
      image: '/images/boutique/Boutique-1.jpg',
      tag: 'TENUE 25/26',
      title: 'MAILLOT DOMICILE',
      description: 'Du jaune, du bleu et ce côté rétro qui évoque les tuniques des années...',
      cta: 'ACHETER MAINTENANT',
      href: '#tenues',
    },
    {
      image: '/images/boutique/Boutique-2.jpg',
      tag: 'TENUE 25/26',
      title: 'MAILLOT EXTÉRIEUR',
      description: 'L\'élégance du blanc pour briller hors de nos bases...',
      cta: 'DÉCOUVRIR',
      href: '#tenues',
    },
    {
      image: '/images/boutique/Holy-maillot.jpg',
      tag: 'TENUE 25/26',
      title: 'MAILLOT GARDIEN',
      description: 'L\'Alliance de deux univers différents',
      cta: 'DÉCOUVRIR',
      href: '#tenues',
    },
  ];

  return (
    <div className="bg-pau-night">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Section Tenues 25/26 */}
      <AsymmetricSection
        id="tenues"
        tag="TENUE 25/26"
        title="Tenues 25/26"
        ctaText="Acheter maintenant"
        ctaHref="/boutique?categorie=tenues-officielles"
        sidebarImage="/images/boutique/Tenues2526.jpg"
        reverse={false}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tenues.map((product) => (
            <ProductCardMaquette key={product.id} product={product} />
          ))}
        </div>
      </AsymmetricSection>

      {/* Section Training */}
      {training.length > 0 && (
        <AsymmetricSection
          id="training"
          tag="TRAINING 25/26"
          title="Training 25/26"
          ctaText="Découvrir la gamme"
          ctaHref="/boutique?categorie=training"
          sidebarImage="/images/hero-equipe.jpg"
          reverse={true}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {training.map((product) => (
              <ProductCardMaquette key={product.id} product={product} />
            ))}
          </div>
        </AsymmetricSection>
      )}

      {/* Section Lifestyle */}
      {lifestyle.length > 0 && (
        <AsymmetricSection
          id="lifestyle"
          tag="LIFESTYLE"
          title="Lifestyle"
          ctaText="Tout voir"
          ctaHref="/boutique?categorie=lifestyle"
          sidebarImage="/images/hero-club.jpg"
          reverse={false}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lifestyle.map((product) => (
              <ProductCardMaquette key={product.id} product={product} />
            ))}
          </div>
        </AsymmetricSection>
      )}
    </div>
  );
}

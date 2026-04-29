import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Boutique — Pau FC',
  description: 'Boutique officielle du Pau FC. Maillots, training, lifestyle et accessoires.',
};

export default async function BoutiquePage() {
  // Récupérer les produits (avec fallback si erreur DB)
  const products = await prisma.product
    .findMany({
      where: { status: 'active' },
      include: { category: true, variants: true },
      orderBy: { createdAt: 'desc' },
      take: 12,
    })
    .catch(() => []);

  return (
    <div className="bg-pau-night">
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[70vh] md:min-h-[600px]">
        <Image
          src="/images/boutique/Boutique-1.jpg"
          alt="Boutique Pau FC"
          fill
          className="object-cover object-center brightness-50"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Saison 2025/2026
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Boutique Officielle
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Maillots, équipements et accessoires aux couleurs du Pau FC
            </p>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="border-t border-white/10 bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Link
              href="/boutique?categorie=tenues-officielles"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src="/images/boutique/Tenues2526.jpg"
                alt="Tenues officielles"
                fill
                className="object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Tenues 25/26
                </h3>
              </div>
            </Link>

            <Link
              href="/boutique?categorie=training"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src="/images/hero-equipe.jpg"
                alt="Training"
                fill
                className="object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Training
                </h3>
              </div>
            </Link>

            <Link
              href="/boutique?categorie=lifestyle"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src="/images/hero-club.jpg"
                alt="Lifestyle"
                fill
                className="object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Lifestyle
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
              Tous les produits
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border-2 border-white/10 bg-pau-primary p-12 text-center">
              <p className="font-sans text-lg text-white/70">
                La boutique sera bientôt disponible. Revenez prochainement!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/boutique/${product.slug}`}
                  className="group overflow-hidden rounded-lg bg-pau-primary transition-all hover:bg-pau-primary-hover"
                >
                  {product.images?.[0] && (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {product.category && (
                      <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
                        {product.category.name}
                      </span>
                    )}
                    <h3 className="mb-2 font-display text-lg font-bold uppercase text-white">
                      {product.name}
                    </h3>
                    <p className="font-mono text-sm font-bold text-white">
                      {(product.basePrice / 100).toFixed(2)} €
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

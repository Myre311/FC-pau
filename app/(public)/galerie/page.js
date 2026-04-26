import { prisma } from '@/lib/prisma';
import { GalleryGrid } from '@/components/vitrine/GalleryGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Galerie Photos',
  description:
    'Revivez les meilleurs moments du Pau FC en images : matchs, entraînements, événements.',
};

const CATEGORIES = [
  { value: 'all', label: 'Toutes' },
  { value: 'matchday', label: 'Matchs' },
  { value: 'training', label: 'Entraînements' },
  { value: 'event', label: 'Événements' },
  { value: 'stadium', label: 'Stade' },
];

export default async function GaleriePage({ searchParams }) {
  const category = searchParams?.category || 'all';

  const where = {
    active: true,
    ...(category !== 'all' && { category }),
  };

  const photos = await prisma.gallery.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { position: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-jaune bg-nuit py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-4 h-1 w-16 bg-jaune" />
          <h1 className="title-hero text-blanc">Galerie</h1>
          <p className="mt-4 max-w-2xl text-lg text-blanc/80">
            Revivez les meilleurs moments du Pau FC : matchs, entraînements, coulisses du club.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="border-b-2 border-gray-300 bg-blanc py-6">
        <div className="container-pau">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={cat.value === 'all' ? '/galerie' : `/galerie?category=${cat.value}`}
                className={`border-2 px-6 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                  category === cat.value
                    ? 'border-nuit bg-nuit text-jaune'
                    : 'border-gray-300 bg-blanc text-nuit hover:border-nuit'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grid photos */}
      <section className="section-pau bg-blanc">
        <div className="container-pau">
          {photos.length === 0 ? (
            <div className="card-pau mx-auto max-w-2xl p-10 text-center">
              <p className="text-lead">Aucune photo disponible pour cette catégorie.</p>
            </div>
          ) : (
            <GalleryGrid photos={photos} />
          )}
        </div>
      </section>
    </>
  );
}

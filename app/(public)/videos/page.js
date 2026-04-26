import { prisma } from '@/lib/prisma';
import { VideoGrid } from '@/components/videos/VideoGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vidéos',
  description:
    'Revivez les meilleurs moments du Pau FC en vidéo : résumés de matchs, interviews, entraînements et coulisses.',
};

const CATEGORIES = [
  { value: 'all', label: 'Toutes' },
  { value: 'match_highlights', label: 'Résumés matchs' },
  { value: 'interviews', label: 'Interviews' },
  { value: 'training', label: 'Entraînements' },
  { value: 'behind_scenes', label: 'Coulisses' },
  { value: 'academy', label: 'Academy' },
];

export default async function VideosPage({ searchParams }) {
  const category = searchParams?.category || 'all';

  const where = {
    published: true,
    publishedAt: { not: null },
    ...(category !== 'all' && { category }),
  };

  const videos = await prisma.video.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take: 24,
  });

  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-jaune bg-nuit py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-4 h-1 w-16 bg-jaune" />
          <h1 className="title-hero text-blanc">Vidéos</h1>
          <p className="mt-4 max-w-2xl text-lg text-blanc/80">
            Revivez les meilleurs moments : résumés de matchs, interviews exclusives, coulisses de l'entraînement.
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
                href={cat.value === 'all' ? '/videos' : `/videos?category=${cat.value}`}
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

      {/* Grid vidéos */}
      <section className="section-pau bg-blanc">
        <div className="container-pau">
          {videos.length === 0 ? (
            <div className="card-pau mx-auto max-w-2xl p-10 text-center">
              <p className="text-lead">Aucune vidéo disponible pour cette catégorie.</p>
            </div>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </div>
      </section>
    </>
  );
}

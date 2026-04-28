import Link from 'next/link';

/**
 * Rangée de sponsors / partenaires
 * 2 lignes de logos en grayscale
 */
export function SponsorsRow() {
  const sponsors = [
    { id: 1, name: 'Intersport / Joma' },
    { id: 2, name: 'Groupama' },
    { id: 3, name: 'Casino de Pau' },
    { id: 4, name: 'Ville de Pau' },
    { id: 5, name: 'Communauté Agglo' },
    { id: 6, name: 'Nouvelle-Aquitaine' },
    { id: 7, name: 'Holy Energy' },
    { id: 8, name: 'Nouste Energia' },
  ];

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-12">
      <div className="container-pau">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase text-paufc-dark md:text-3xl">
            Nos Partenaires
          </h2>
        </div>

        {/* Grille logos */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex aspect-[3/2] items-center justify-center border border-gray-200 bg-white p-4 grayscale transition-all hover:grayscale-0"
            >
              <span className="text-center font-sans text-xs font-medium text-gray-400">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/partenaires"
            className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-paufc-gold transition-colors hover:text-paufc-dark"
          >
            Devenir partenaire →
          </Link>
        </div>
      </div>
    </section>
  );
}

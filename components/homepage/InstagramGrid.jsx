import Image from 'next/image';

/**
 * Grille Instagram 4x2
 * Photos du feed officiel @paufootballclub
 */
export function InstagramGrid() {
  // Utiliser image boutique comme placeholder pour toutes les photos Instagram
  const photos = [
    { id: 1, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 1' },
    { id: 2, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 2' },
    { id: 3, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 3' },
    { id: 4, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 4' },
    { id: 5, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 5' },
    { id: 6, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 6' },
    { id: 7, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 7' },
    { id: 8, src: '/images/homepage/Boutique.png', alt: 'Pau FC Instagram 8' },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-pau">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-paufc-yellow">
            Suivez-nous
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-paufc-dark md:text-4xl">
            @paufootballclub
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-gray-600">
            Rejoignez notre communauté sur Instagram pour ne rien manquer des coulisses du club.
          </p>

          <div className="mt-8">
            <a
              href="https://www.instagram.com/paufootballclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-paufc-dark bg-paufc-dark px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-transparent hover:text-paufc-dark"
            >
              Suivre sur Instagram
            </a>
          </div>
        </div>

        {/* Grille 4x2 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo) => (
            <a
              key={photo.id}
              href="https://www.instagram.com/paufootballclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-gray-100"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-paufc-dark/0 transition-all group-hover:bg-paufc-dark/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

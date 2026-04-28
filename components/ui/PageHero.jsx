import Image from 'next/image';

/**
 * Hero avec image de fond pour toutes les pages
 * @param {string} image - Chemin de l'image (ex: '/images/hero-boutique.jpg')
 * @param {string} surtitle - Surtitre jaune (ex: 'CATALOGUE OFFICIEL · SAISON 2025-2026')
 * @param {string} title - Titre principal (ex: 'LA BOUTIQUE')
 * @param {string} subtitle - Sous-titre optionnel
 */
export function PageHero({ image, surtitle, title, subtitle }) {
  return (
    <section className="relative h-[280px] md:h-[360px] w-full overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={image || '/images/placeholder-hero.jpg'}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient sombre pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-nuit/40 to-nuit/80" />
      </div>

      {/* Contenu par-dessus */}
      <div className="relative z-10 container-pau flex h-full flex-col justify-center">
        {surtitle && (
          <p className="badge-mono mb-4">{surtitle}</p>
        )}
        <h1 className="font-display text-[clamp(52px,12vw,160px)] uppercase leading-crush tracking-display-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl font-sans text-[17px] leading-relaxed text-white/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

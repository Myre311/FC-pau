import Image from 'next/image';
import Link from 'next/link';

/**
 * Section asymétrique avec sidebar sticky - Style maquette client
 * Sidebar gauche ou droite selon reverse prop
 */
export function AsymmetricSection({
  id,
  tag,
  title,
  ctaText,
  ctaHref,
  sidebarImage,
  reverse = false,
  children,
}) {
  return (
    <section id={id} className="border-t border-white/10 bg-pau-night">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        {/* Sidebar sticky */}
        <div className="relative h-[40vh] md:sticky md:top-0 md:h-screen md:w-2/5">
          {/* Image de fond */}
          <Image
            src={sidebarImage}
            alt=·
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

          {/* Contenu */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            {tag && (
              <span className="mb-3 inline-block self-start border border-pau-yellow bg-pau-yellow px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-pau-night">
                {tag}
              </span>
            )}
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wider text-white transition-colors hover:text-pau-yellow"
            >
              {ctaText} <span className="text-lg">↗</span>
            </Link>
          </div>
        </div>

        {/* Zone de scroll avec grille produits */}
        <div className="min-h-screen bg-pau-night p-6 md:w-3/5 md:p-12">
          {children}
        </div>
      </div>
    </section>
  );
}

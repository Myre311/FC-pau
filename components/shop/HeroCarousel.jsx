'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero Carousel boutique - Style maquette client
 * 3 slides avec navigation thumbnails
 */
export function HeroCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Arrêter l'auto-play après interaction manuelle
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden border-b border-white/10">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Image de fond */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

          {/* Contenu */}
          <div className="relative z-10 flex h-full items-end">
            <div className="w-full px-6 pb-16 md:px-12 md:pb-24">
              <div className="mx-auto max-w-7xl">
                {slide.tag && (
                  <span className="mb-4 inline-block border border-pau-yellow bg-pau-yellow px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-pau-night">
                    {slide.tag}
                  </span>
                )}
                <h1 className="font-display text-5xl font-black uppercase leading-none text-white md:text-7xl lg:text-8xl">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/80 md:text-lg">
                    {slide.description}
                  </p>
                )}
                <div className="mt-6">
                  <Link
                    href={slide.href}
                    className="inline-block border-2 border-white bg-transparent px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-pau-night"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation thumbnails */}
      <div className="absolute bottom-4 left-0 z-20 flex w-full justify-center gap-4 px-6 md:bottom-6">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative h-16 w-24 overflow-hidden border-2 transition-all md:h-20 md:w-32 ${
              index === currentSlide
                ? 'border-pau-yellow'
                : 'border-white/30 hover:border-white/60'
            }`}
            aria-label={`Aller à ${slide.title}`}
            role="tab"
            aria-selected={index === currentSlide}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />
            <div
              className={`absolute inset-0 bg-pau-night transition-opacity ${
                index === currentSlide
                  ? 'opacity-0'
                  : 'opacity-60 group-hover:opacity-40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

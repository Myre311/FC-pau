'use client';

import { useState } from 'react';
import Image from 'next/image';

export function GalleryGrid({ photos }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setLightbox({ photo, index: idx })}
            className="group relative aspect-square overflow-hidden border-2 border-gray-300 bg-gray-100 transition-all hover:border-nuit"
          >
            <Image
              src={photo.thumbnailUrl || photo.imageUrl}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {photo.featured && (
              <div className="absolute right-2 top-2 bg-jaune px-2 py-1 font-mono text-xs font-bold uppercase text-nuit">
                
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-nuit/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border-2 border-blanc text-blanc transition-colors hover:bg-blanc hover:text-nuit"
            aria-label="Fermer"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {lightbox.index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox({ photo: photos[lightbox.index - 1], index: lightbox.index - 1 });
              }}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-blanc text-blanc transition-colors hover:bg-blanc hover:text-nuit"
              aria-label="Photo précédente"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {lightbox.index < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox({ photo: photos[lightbox.index + 1], index: lightbox.index + 1 });
              }}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-blanc text-blanc transition-colors hover:bg-blanc hover:text-nuit"
              aria-label="Photo suivante"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.photo.imageUrl}
              alt={lightbox.photo.title}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
            />
            <div className="mt-4 border-t-2 border-blanc/20 pt-4">
              <h3 className="font-display text-lg font-bold uppercase text-blanc">
                {lightbox.photo.title}
              </h3>
              {lightbox.photo.description && (
                <p className="mt-2 text-sm text-blanc/80">{lightbox.photo.description}</p>
              )}
              {lightbox.photo.photographer && (
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-jaune">
                  © {lightbox.photo.photographer}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

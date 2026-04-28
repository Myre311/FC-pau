'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuickAddModal } from './QuickAddModal';

/**
 * Product Card - Style maquette client
 * Bouton "AJOUTER" au hover + modal quick add
 */
export function ProductCardMaquette({ product }) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const price = product.basePrice
    ? (product.basePrice / 100).toFixed(2)
    : '0.00';

  return (
    <>
      <article className="group relative">
        {/* Image container */}
        <Link href={`/boutique/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white/5">
          <Image
            src={product.images?.[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bouton Quick Add au hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowQuickAdd(true);
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 border-2 border-white bg-transparent px-6 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-all group-hover:opacity-100"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2 inline-block"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            AJOUTER
          </button>
        </Link>

        {/* Détails produit */}
        <div className="mt-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {product.category && (
                <span className="font-sans text-xs uppercase tracking-wider text-white/60">
                  {product.category.name}
                </span>
              )}
              <h3 className="mt-1 font-sans text-base font-medium text-white">
                {product.name}
              </h3>
              <p className="mt-1 font-sans text-lg font-bold text-pau-yellow">
                {price}€
              </p>
            </div>
            <Link
              href={`/boutique/${product.slug}`}
              className="text-white/60 transition-colors hover:text-white"
              aria-label={`Voir ${product.name}`}
            >
              <span className="text-xl">↗</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Modal Quick Add */}
      <QuickAddModal
        product={product}
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/stores/cart';

/**
 * Modal Quick Add - Style maquette client
 * Ajout rapide au panier avec sélecteur taille/quantité
 */
export function QuickAddModal({ product, isOpen, onClose }) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  if (!isOpen || !product) return null;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    // Trouver le variant correspondant à la taille sélectionnée
    const variant = product.variants?.find(v => v.size === selectedSize) || product.variants?.[0];

    if (!variant) {
      alert('Taille non disponible');
      return;
    }

    addItem({
      id: variant.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      variantId: variant.id,
      size: selectedSize,
      price: variant.priceOverride || product.basePrice,
      quantity,
      image: product.images?.[0],
    });

    onClose();
  };

  const totalPrice = ((variant?.priceOverride || product.basePrice) * quantity) / 100;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl rounded-none border border-white/20 bg-pau-night shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-3xl text-white/60 transition-colors hover:text-white"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image produit */}
          <div className="relative aspect-square bg-white/5">
            <Image
              src={product.images?.[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Formulaire */}
          <div className="flex flex-col justify-between p-8">
            <div>
              <h3 className="font-display text-3xl font-black uppercase text-white md:text-4xl">
                {product.name}
              </h3>
              <p className="mt-2 font-sans text-2xl text-pau-yellow">
                {((product.basePrice || 0) / 100).toFixed(2)}€
              </p>

              {/* Sélecteur de taille */}
              <div className="mt-6">
                <label className="mb-3 block font-sans text-sm uppercase tracking-wider text-white/80">
                  Taille
                </label>
                <div className="flex gap-2" role="radiogroup">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 w-12 items-center justify-center border-2 font-sans text-sm font-bold uppercase transition-all ${
                        selectedSize === size
                          ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                          : 'border-white/20 bg-transparent text-white hover:border-white/40'
                      }`}
                      aria-checked={selectedSize === size}
                      role="radio"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélecteur de quantité */}
              <div className="mt-6">
                <label className="mb-3 block font-sans text-sm uppercase tracking-wider text-white/80">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center border border-white/20 bg-transparent font-sans text-xl text-white transition-colors hover:border-white/40"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="h-12 w-20 border border-white/20 bg-transparent text-center font-sans text-white focus:border-pau-yellow focus:outline-none"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="flex h-12 w-12 items-center justify-center border border-white/20 bg-transparent font-sans text-xl text-white transition-colors hover:border-white/40"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bouton ajouter */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full border-2 border-pau-yellow bg-pau-yellow px-6 py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
            >
              AJOUTER AU PANIER — {totalPrice.toFixed(2)}€
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

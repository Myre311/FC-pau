'use client';

import { useCartStore } from '@/stores/cart';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawerMaquette({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-pau-night shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            VOTRE PANIER
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-white/60 transition-colors hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="flex h-[calc(100%-180px)] flex-col overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="font-sans text-white/60">Votre panier est vide.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                  <div className="relative h-20 w-20 flex-shrink-0 bg-white/5">
                    <Image
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/boutique/${item.productSlug}`}
                        onClick={onClose}
                        className="font-sans text-sm font-medium text-white hover:text-pau-yellow"
                      >
                        {item.productName}
                      </Link>
                      <p className="mt-1 font-sans text-xs text-white/60">
                        Taille: {item.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="flex h-6 w-6 items-center justify-center border border-white/20 text-white/80"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-sans text-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center border border-white/20 text-white/80"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-sans text-sm font-bold text-pau-yellow">
                        {((item.price * item.quantity) / 100).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start text-white/40 transition-colors hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-pau-night p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-sm uppercase tracking-wider text-white">
                TOTAL
              </span>
              <span className="font-display text-2xl font-bold text-pau-yellow">
                {(total / 100).toFixed(2)}€
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full border-2 border-pau-yellow bg-pau-yellow py-3 text-center font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
            >
              PROCÉDER AU PAIEMENT
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

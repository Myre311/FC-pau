'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du composant 3D (code splitting)
const Stadium3D = dynamic(() => import('@/components/ticketing/Stadium3D').then((mod) => ({ default: mod.Stadium3D })), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center bg-pau-night">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin border-4 border-pau-yellow border-t-transparent" />
        <p className="font-mono text-xs uppercase tracking-wider text-white">
          Chargement de la vue 3D...
        </p>
      </div>
    </div>
  ),
});

// Mock data : sièges disponibles pour le match
const MOCK_AVAILABLE_SEATS = [
  ...Array.from({ length: 200 }, (_, i) => `tribune-${Math.floor(i / 40)}-${i % 40}`),
  ...Array.from({ length: 150 }, (_, i) => `virage-gauche-${Math.floor(i / 30)}-${i % 30}`),
  ...Array.from({ length: 120 }, (_, i) => `virage-droit-${Math.floor(i / 30)}-${i % 30}`),
];

const SECTION_PRICES = {
  tribune: 35,
  'tribune-opp': 25,
  'virage-gauche': 20,
  'virage-droit': 20,
};

export default function SelectionPlacesPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getPrice = (seatId) => {
    const section = seatId.split('-')[0];
    return SECTION_PRICES[section] || 25;
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => sum + getPrice(seatId), 0);

  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-pau-yellow bg-pau-night py-12">
        <div className="container-pau">
          <div className="mb-4 h-1 w-16 bg-pau-yellow" />
          <h1 className="title-hero text-white">Sélection de places</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Match : Pau FC vs Clermont Foot · Ligue 2 BKT<br />
            <span className="font-mono text-sm">Samedi 10 mai 2026 · 19h00 · Nouste Camp</span>
          </p>
        </div>
      </section>

      {/* Vue 3D */}
      <section className="bg-white py-8">
        <div className="container-pau">
          <div className="mb-6">
            <h2 className="mb-2 font-display text-xl font-bold uppercase text-pau-night">
              Vue 3D du stade
            </h2>
            <p className="font-mono text-xs text-gray-600">
              Cliquez sur les sièges pour les sélectionner · Utilisez la souris pour pivoter la caméra
            </p>
          </div>

          <div className="overflow-hidden border-4 border-pau-night">
            <Stadium3D
              onSeatSelect={handleSeatSelect}
              selectedSeats={selectedSeats}
              availableSeats={MOCK_AVAILABLE_SEATS}
            />
          </div>
        </div>
      </section>

      {/* Récapitulatif et paiement */}
      <section className="border-t-4 border-gray-300 bg-gray-50 py-12">
        <div className="container-pau">
          <div className="mx-auto max-w-2xl">
            <div className="border-2 border-pau-night bg-white p-8">
              <h2 className="mb-6 font-display text-2xl font-bold uppercase text-pau-night">
                Votre sélection
              </h2>

              {selectedSeats.length === 0 ? (
                <p className="py-8 text-center text-pau-yellow">
                  Aucune place sélectionnée. Cliquez sur les sièges verts dans la vue 3D.
                </p>
              ) : (
                <>
                  <div className="mb-6 space-y-3">
                    {selectedSeats.map((seatId) => {
                      const [section, row, seat] = seatId.split('-');
                      const price = getPrice(seatId);

                      return (
                        <div
                          key={seatId}
                          className="flex items-center justify-between border-b border-gray-200 pb-3"
                        >
                          <div>
                            <p className="font-display text-sm font-bold uppercase text-pau-night">
                              {section.replace('-', ' ')}
                            </p>
                            <p className="font-mono text-xs text-gray-600">
                              Rangée {parseInt(row) + 1} · Siège {parseInt(seat) + 1}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-display text-lg font-bold text-pau-night">
                              {price}€
                            </p>
                            <button
                              onClick={() => handleSeatSelect(seatId)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Retirer"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-6 border-t-2 border-pau-night pt-4">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg font-bold uppercase text-pau-night">
                        Total
                      </p>
                      <p className="font-display text-3xl font-black text-pau-night">
                        {totalPrice}€
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full border-2 border-pau-night bg-pau-night py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-pau-yellow  hover:text-pau-night"
                  >
                    Continuer vers le paiement
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

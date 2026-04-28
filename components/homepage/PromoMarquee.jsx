'use client';

/**
 * Bandeau promotionnel défilant
 * Style: fond jaune, texte sombre, défilement infini
 */
export function PromoMarquee({ text = 'HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5 — HOLY — PAU FC 5' }) {
  return (
    <section className="overflow-hidden bg-paufc-yellow py-4">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-8">
          <span className="font-display text-2xl font-bold uppercase tracking-wide text-paufc-dark md:text-3xl">
            {text}
          </span>
        </div>
        <div className="animate-marquee flex items-center gap-8" aria-hidden="true">
          <span className="font-display text-2xl font-bold uppercase tracking-wide text-paufc-dark md:text-3xl">
            {text}
          </span>
        </div>
      </div>
    </section>
  );
}

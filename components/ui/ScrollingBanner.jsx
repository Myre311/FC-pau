/**
 * Bandeau défilant promotionnel - Style maquette client
 * Animation infinie horizontale
 */
export function ScrollingBanner({ text = "HOLY — PAU FC 5 · retire 5€ sur ta première commande" }) {
  // Répéter le texte pour créer l'illusion d'infini
  const repeatedText = Array(20).fill(text).join(' · ');

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-pau-yellow py-3">
      <div className="animate-scroll whitespace-nowrap font-display text-sm font-bold uppercase tracking-wider text-pau-night">
        {repeatedText}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

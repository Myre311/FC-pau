// Bandeau scrollant infini — porté de fcpau-index.html (#mq).
// Le contenu est dupliqué pour boucler sans saut visuel.

const ITEMS = [
  'Pau FC Boutique',
  'Saison 2025-2026',
  'Maillots authentiques',
  'Personnalisation flocage',
  'Livraison offerte dès 80€',
  'Retours gratuits 14 jours',
];

export function Marquee() {
  const all = [...ITEMS, ...ITEMS]; // duplicate for seamless loop
  return (
    <div className="overflow-hidden bg-pau-yellow py-[10px]">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[10px] px-[26px] font-display text-[11px] uppercase tracking-[0.17em] text-pau-night"
          >
            {item}
            <span className="h-[3px] w-[3px] rounded-full bg-pau-night/30" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

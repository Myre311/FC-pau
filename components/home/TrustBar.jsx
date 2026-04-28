// Bandeau de confiance porté de fcpau-index.html (#trust).

const ITEMS = [
  {
    title: 'Livraison offerte',
    sub: 'Dès 80€ · Sous 48h',
    icon: (
      <path d="M3 7h13l3 4v6h-3a2 2 0 0 1-4 0h-3a2 2 0 0 1-4 0H3V7z" strokeLinecap="square" />
    ),
  },
  {
    title: 'Paiement sécurisé',
    sub: 'Stripe · 3DS · Apple Pay',
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" />
        <path d="M3 10h18" strokeLinecap="square" />
      </>
    ),
  },
  {
    title: 'Personnalisation officielle',
    sub: 'Flocage nom + numéro',
    icon: (
      <path d="M3 17l6-6 4 4 8-8M21 7v6h-6" strokeLinecap="square" />
    ),
  },
  {
    title: 'Retours 14 jours',
    sub: 'Hors flocage perso',
    icon: (
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" strokeLinecap="square" />
    ),
  },
];

export function TrustBar() {
  return (
    <section className="relative z-10 border-t border-white/10 bg-white/[0.022]">
      <div className="wrap">
        <div className="flex items-center gap-0 overflow-x-auto py-[14px]">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`relative flex flex-shrink-0 items-center gap-[10px] px-[28px] ${
                i > 0 ? 'border-l border-white/[0.07]' : ''
              }`}
            >
              <span className="clip-cta flex h-7 w-7 items-center justify-center border border-pau-yellow/15 bg-pau-yellow/[0.07]">
                <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-jaune" fill="none" strokeWidth="1.8" aria-hidden="true">
                  {item.icon}
                </svg>
              </span>
              <div>
                <p className="font-sans text-[12px] font-bold text-white">{item.title}</p>
                <p className="mt-[1px] font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/20">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

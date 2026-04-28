// Carte partenaire — la SEULE zone qui utilise la charte dorée #CBA74D.
// L'identité club (jaune #FFCC00) reste discrète ici pour bien hierarchiser.

export function PartnerCard({ partner, tier }) {
  const isPremium = tier === 'premium';
  return (
    <a
      href={partner.websiteUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center justify-between border border-pau-gold/30 p-6 transition-colors hover:border-pau-gold ${
        isPremium ? 'md:p-10' : 'md:p-8'
      }`}
    >
      <div
        className={`flex w-full flex-1 items-center justify-center ${
          isPremium ? 'min-h-32' : 'min-h-20'
        }`}
      >
        {partner.logoUrl && partner.logoUrl !== '#' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-full max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100"
            style={{
              filter: 'brightness(0) saturate(100%) invert(67%) sepia(73%) saturate(462%) hue-rotate(3deg) brightness(95%) contrast(102%)',
            }}
          />
        ) : (
          <span
            className={`font-display uppercase leading-crush tracking-tightest text-pau-gold ${
              isPremium ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
            }`}
          >
            {partner.name}
          </span>
        )}
      </div>

      <div className="mt-6 w-full border-t border-pau-gold/20 pt-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold">
          {partner.name}
        </p>
        {partner.description && isPremium && (
          <p className="mt-2 font-sans text-xs text-pau-primary/60">
            {partner.description}
          </p>
        )}
      </div>
    </a>
  );
}

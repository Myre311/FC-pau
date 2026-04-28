import Link from 'next/link';

export const metadata = {
  title: 'Offres Cashless · Billetterie',
  description:
    'Profite d\'offres exclusives avec ta carte cashless : bonus de rechargement, menus spéciaux, promos buvette.',
};

export default function OffresCashlessPage() {
  return (
    <article>
      {/* Hero */}
      <section className="bg-pau-primary py-16 md:py-24">
        <div className="container-fc">
          <p className="badge-mono">Billetterie · Cashless · Offres</p>
          <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px] text-white">
            OFFRES <span className="text-pau-yellow">CASHLESS</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
            Profite d'offres exclusives en rechargeant ta carte cashless. Bonus,
            menus spéciaux, promotions buvette réservées aux détenteurs de carte.
          </p>
        </div>
      </section>

      {/* Offres en cours */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Offres en cours
        </h2>

        <div className="space-y-8">
          <OffreCard
            badge="Nouveau"
            title="Recharge 30€ = 5€ offerts"
            description="Recharge ta carte de 30€ ou plus et reçois 5€ de bonus immédiatement crédités sur ta carte. Valable jusqu'au 31 mai 2026."
            conditions="Offre valable une seule fois par carte. Non cumulable avec d'autres promotions."
            ctaText="Recharger maintenant"
            ctaHref="#"
            active
          />

          <OffreCard
            badge="Premium"
            title="Abonnés : +10% sur chaque recharge"
            description="Tu es abonné du club ? Profite d'un bonus de 10% sur toutes tes recharges cashless, toute la saison."
            conditions="Réservé aux abonnés saison 2025-2026. Vérification automatique via ton compte client."
            ctaText="Voir mon espace abonné"
            ctaHref="/compte"
            active
          />

          <OffreCard
            badge="Menu"
            title="Menu Match : Burger + Frites + Boisson = 12€"
            description="Profite du menu spécial cashless au stand buvette principale. Disponible 2h avant et pendant la mi-temps."
            conditions="Valable uniquement avec paiement carte cashless. Dans la limite des stocks disponibles."
            ctaText="Voir les menus"
            ctaHref="#"
            active
          />
        </div>
      </section>

      {/* Offres à venir */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Offres à venir
        </h2>

        <div className="space-y-8">
          <OffreCard
            badge="Prochainement"
            title="Opération Fan Day : Double bonus"
            description="Lors du prochain Fan Day (samedi 24 mai), recharge ta carte et profite d'un bonus doublé : 30€ = 10€ offerts !"
            conditions="Date et conditions exactes communiquées ultérieurement."
            ctaText="S'inscrire aux alertes"
            ctaHref="#"
            active={false}
          />

          <OffreCard
            badge="Été 2026"
            title="Carte famille : Offre spéciale vacances"
            description="Carte cashless famille à venir pour la saison prochaine. Recharges groupées, menus enfants offerts, avantages boutique."
            conditions="Disponible à partir de la saison 2026-2027."
            ctaText="En savoir plus"
            ctaHref="#"
            active={false}
          />
        </div>
      </section>

      {/* Comment en profiter */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Comment en profiter
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            <p>
              <strong className="text-pau-primary">1. Obtiens ta carte</strong> —
              Commande ta carte cashless gratuitement en ligne ou récupère-la au
              stade.
            </p>
            <p>
              <strong className="text-pau-primary">2. Recharge</strong> — Recharge ta
              carte depuis ton espace client avant le match. Les bonus sont
              automatiquement crédités.
            </p>
            <p>
              <strong className="text-pau-primary">3. Profite</strong> — Utilise ta
              carte aux bornes cashless du stade pour bénéficier des offres
              exclusives.
            </p>
            <div className="mt-6">
              <Link
                href="/billetterie/cashless"
                className="inline-block bg-pau-yellow px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-night transition-transform hover:scale-105"
              >
                Commander ma carte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CGV */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Conditions générales
          </h2>
          <div className="mt-6 space-y-4 font-sans text-base text-pau-primary/75">
            <p>
              Les offres cashless sont soumises aux conditions générales de
              vente du Pau FC. Les bonus de rechargement ne sont pas
              remboursables en espèces.
            </p>
            <p>
              Les offres sont valables dans la limite des stocks disponibles et
              peuvent être modifiées ou annulées à tout moment par le club.
            </p>
            <p>
              Le club se réserve le droit de vérifier l'éligibilité des
              bénéficiaires (abonnés, groupes, etc.).
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/cgv-billetterie"
              className="font-mono text-sm uppercase tracking-wider text-pau-primary/60 hover:text-pau-yellow"
            >
              Lire les CGV complètes →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant Offre Card
function OffreCard({
  badge,
  title,
  description,
  conditions,
  ctaText,
  ctaHref,
  active = true,
}) {
  return (
    <div
      className={`border bg-white p-8 md:p-10 ${
        active ? 'border-pau-yellow' : 'border-gray-200/10'
      }`}
    >
      <span
        className={`inline-block font-mono text-xs uppercase tracking-wider ${
          active ? 'text-pau-yellow' : 'text-pau-primary/40'
        }`}
      >
        {badge}
      </span>
      <h3 className="mt-4 font-display text-4xl uppercase leading-tight tracking-tight text-pau-primary md:text-5xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
        {description}
      </p>
      <p className="mt-4 font-sans text-sm italic text-pau-primary/60">
        {conditions}
      </p>
      <div className="mt-6">
        {active ? (
          <Link
            href={ctaHref}
            className="inline-block border border-gray-200 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:bg-gray-50"
          >
            {ctaText}
          </Link>
        ) : (
          <span className="inline-block border border-gray-200/10 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary/40">
            {ctaText}
          </span>
        )}
      </div>
    </div>
  );
}

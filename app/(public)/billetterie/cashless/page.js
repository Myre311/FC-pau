import Link from 'next/link';

export const metadata = {
  title: 'Carte Cashless · Billetterie',
  description:
    'Le Nouste Camp est 100% cashless. Recharge ta carte en ligne, paye sans contact, profite d\'avantages exclusifs.',
};

export default function CashlessPage() {
  return (
    <article>
      {/* Hero */}
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Billetterie · Cashless</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          100% <span className="text-jaune">CASHLESS</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Le Nouste Camp est entièrement cashless. Paye tes consommations avec
          ta carte sans contact ou ton smartphone. Rapide, sécurisé, moderne.
        </p>
      </section>

      {/* Comment ça marche */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Comment ça marche
        </h2>

        <div className="space-y-8">
          <Step
            number="1"
            title="Obtiens ta carte"
            description="Commande ta carte cashless en ligne (gratuite) ou récupère-la directement au stade le jour du match (guichets dédiés)."
          />
          <Step
            number="2"
            title="Recharge en ligne"
            description="Recharge ta carte depuis ton espace client avant le match. Paiement par carte bancaire, Apple Pay ou Google Pay. Montant minimum : 10€."
          />
          <Step
            number="3"
            title="Paye au stade"
            description="Présente ta carte cashless aux bornes de la buvette, boutique ou food-trucks. Le montant est débité automatiquement."
          />
          <Step
            number="4"
            title="Récupère ton solde"
            description="Solde non utilisé remboursé à tout moment depuis ton espace client. Traitement sous 7 jours."
          />
        </div>
      </section>

      {/* Avantages */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Avantages
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <AvantageCard
            icon="⚡"
            title="Rapidité"
            description="File d'attente réduite : paye en 2 secondes au lieu de chercher de la monnaie."
          />
          <AvantageCard
            icon="🔒"
            title="Sécurité"
            description="Zéro risque de perte ou vol d'espèces. Carte bloquable depuis ton compte en cas de perte."
          />
          <AvantageCard
            icon="💰"
            title="Remboursable"
            description="Solde non utilisé remboursé à tout moment. Aucune perte d'argent."
          />
          <AvantageCard
            icon="🎁"
            title="Offres exclusives"
            description="Promos et bons plans réservés aux détenteurs de carte cashless."
          />
          <AvantageCard
            icon="📱"
            title="Application mobile"
            description="Consulte ton solde, recharge ta carte et gère tes dépenses depuis l'app."
          />
          <AvantageCard
            icon="🌍"
            title="Écologique"
            description="Moins de plastique jetable, moins de papier. Un geste pour la planète."
          />
        </div>
      </section>

      {/* Offres */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Offres cashless
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
            <p>
              Profite d'offres exclusives en rechargeant ta carte cashless avant
              le match. Bonus de rechargement, promos buvette, menus spéciaux.
            </p>
            <p>
              <strong className="text-blanc">Offre du moment</strong> — Recharge
              30€, reçois 5€ de bonus offerts. Valable jusqu'au 31 mai 2026.
            </p>
            <div className="mt-6">
              <Link
                href="/billetterie/cashless/offres"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Voir toutes les offres
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Questions fréquentes
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Tu as des questions sur le système cashless ? Consulte notre FAQ
              complète ou contacte le service billetterie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/billetterie/cashless/faq"
                className="inline-block bg-jaune px-6 py-3 font-mono text-sm uppercase tracking-wider text-nuit transition-transform hover:scale-105"
              >
                Voir la FAQ
              </Link>
              <a
                href="mailto:billetterie@paufc.fr"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Nous contacter
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Commander ma carte
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Commande ta carte cashless gratuitement. Réception sous 7 jours
              par courrier, ou retrait au stade le jour du match.
            </p>
            <div className="mt-8">
              <button
                type="button"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Commander (bientôt disponible)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Besoin d&apos;aide ?
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
            Pour toute question sur le système cashless, les rechargements ou
            les remboursements :
          </p>

          <div className="mt-6 space-y-3 font-sans text-base text-blanc/75">
            <p>
              Email :{' '}
              <a
                href="mailto:cashless@paufc.fr"
                className="text-jaune hover:underline"
              >
                cashless@paufc.fr
              </a>
            </p>
            <p>
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-jaune hover:underline">
                +33 5 59 00 00 00
              </a>
            </p>
            <p>Horaires : Lundi au vendredi, 9h-17h</p>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant Step
function Step({ number, title, description }) {
  return (
    <div className="grid gap-6 md:grid-cols-[100px_1fr] md:gap-12">
      {/* Numéro */}
      <div className="relative">
        <div className="font-display text-6xl uppercase leading-none tracking-tightest text-jaune md:text-7xl">
          {number}
        </div>
      </div>

      {/* Contenu */}
      <div className="border-l-2 border-blanc/10 pl-6 md:pl-10">
        <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-blanc md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

// Composant Avantage Card
function AvantageCard({ icon, title, description }) {
  return (
    <div>
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 font-display text-2xl uppercase leading-tight tracking-tight text-blanc md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 font-sans text-base text-blanc/75">{description}</p>
    </div>
  );
}

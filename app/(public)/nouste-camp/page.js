export const metadata = {
  title: 'Nouste Camp',
  description:
    'Le stade du Pau FC : Nouste Camp, écrin moderne en Béarn. Capacité, accès, hospitalités, plan d’accès.',
};

export default function NousteCampPage() {
  return (
    <article>
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Le stade · Pau · Boulevard de la Paix</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          NOUSTE
          <br />
          <span className="text-jaune">CAMP</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          « Notre stade » en béarnais. Un écrin sportif modernisé, ancré au
          cœur de Pau, qui vibre tous les quinze jours pour accueillir le club
          et ses supporters.
        </p>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          <Stat label="Capacité actuelle" value="8 200" />
          <Stat label="Capacité 2026-2027" value="9 800" />
          <Stat label="Pelouse" value="105 × 68 m" />
          <Stat label="Année de rénovation" value="2024-2026" />
        </dl>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Les tribunes
          </h2>
          <ul className="space-y-6">
            <Tribune
              name="Tribune Béarn"
              capacity="3 200 places"
              note="En cours de modernisation — livraison été 2026"
            />
            <Tribune
              name="Tribune Présidentielle"
              capacity="2 100 places"
              note="Loges, hospitalités, espaces presse"
            />
            <Tribune
              name="Tribune Pyrénées"
              capacity="1 600 places"
              note="Tribune debout supporters"
            />
            <Tribune
              name="Tribune Henri IV"
              capacity="1 300 places"
              note="Familles · accès PMR"
            />
          </ul>
        </div>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
              Accès
            </h2>
            <ul className="mt-6 space-y-4 font-sans text-base text-blanc/75">
              <Access label="Voiture" text="A64 sortie 11 · Parking gratuit derrière la tribune Pyrénées (700 places)" />
              <Access label="Bus" text="Lignes 4, 6 et 14 du réseau Idelis · Arrêt Nouste Camp" />
              <Access label="Train" text="Gare de Pau (centre) puis bus ou marche (15 min)" />
              <Access label="Vélo" text="Pistes cyclables jusqu'aux abords du stade · arceaux gratuits" />
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
              Jour de match
            </h2>
            <ul className="mt-6 space-y-4 font-sans text-base text-blanc/75">
              <Access label="Ouverture" text="2h avant le coup d'envoi" />
              <Access label="Buvettes" text="Présentes dans chaque tribune · paiement sans contact" />
              <Access label="Boutique" text="Ouverte 1h30 avant et 30 min après le match" />
              <Access label="Fan zone" text="Animations DJ + food trucks dès 1h avant le coup d'envoi" />
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
        {label}
      </dt>
      <dd className="mt-2 font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
        {value}
      </dd>
    </div>
  );
}

function Tribune({ name, capacity, note }) {
  return (
    <li className="flex flex-col justify-between gap-2 border-t border-blanc/10 pt-5 md:flex-row md:items-center">
      <div>
        <p className="font-display text-2xl uppercase leading-crush tracking-tightest text-blanc">
          {name}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
          {capacity}
        </p>
      </div>
      <p className="font-sans text-sm text-blanc/60 md:max-w-xs md:text-right">
        {note}
      </p>
    </li>
  );
}

function Access({ label, text }) {
  return (
    <li>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
        {label}
      </p>
      <p className="mt-1 leading-relaxed">{text}</p>
    </li>
  );
}

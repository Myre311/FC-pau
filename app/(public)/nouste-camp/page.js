import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Nouste Camp',
  description:
    'Le stade du Pau FC : Nouste Camp, ecrin moderne en Bearn. Capacite, acces, hospitalites, plan d\'acces.',
};

export default function NousteCampPage() {
  return (
    <article>
      <PageHero
        image="/images/hero-nouste-camp.jpg"
        surtitle="Le stade · Pau · Boulevard de la Paix"
        title="NOUSTE CAMP"
        subtitle="« Notre stade » en bearnais. Un ecrin sportif modernise, ancre au cœur de Pau, qui vibre tous les quinze jours pour accueillir le club et ses supporters."
      />

      <SectionLight>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          <Stat label="Capacite actuelle" value="8 200" />
          <Stat label="Capacite 2026-2027" value="9 800" />
          <Stat label="Pelouse" value="105 × 68 m" />
          <Stat label="Annee de renovation" value="2024-2026" />
        </dl>
      </SectionLight>

      <SectionLight className="border-t border-pau-primary/10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Les tribunes
          </h2>
          <ul className="space-y-6">
            <Tribune
              name="Tribune Bearn"
              capacity="3 200 places"
              note="En cours de modernisation - livraison ete 2026"
            />
            <Tribune
              name="Tribune Presidentielle"
              capacity="2 100 places"
              note="Loges, hospitalites, espaces presse"
            />
            <Tribune
              name="Tribune Pyrenees"
              capacity="1 600 places"
              note="Tribune debout supporters"
            />
            <Tribune
              name="Tribune Henri IV"
              capacity="1 300 places"
              note="Familles · acces PMR"
            />
          </ul>
        </div>
      </SectionLight>

      <SectionLight className="border-t border-pau-primary/10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-5xl">
              Acces
            </h2>
            <ul className="mt-6 space-y-4 font-sans text-base text-pau-primary/75">
              <Access label="Voiture" text="A64 sortie 11 · Parking gratuit derriere la tribune Pyrenees (700 places)" />
              <Access label="Bus" text="Lignes 4, 6 et 14 du reseau Idelis · Arret Nouste Camp" />
              <Access label="Train" text="Gare de Pau (centre) puis bus ou marche (15 min)" />
              <Access label="Velo" text="Pistes cyclables jusqu'aux abords du stade · arceaux gratuits" />
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-5xl">
              Jour de match
            </h2>
            <ul className="mt-6 space-y-4 font-sans text-base text-pau-primary/75">
              <Access label="Ouverture" text="2h avant le coup d'envoi" />
              <Access label="Buvettes" text="Presentes dans chaque tribune · paiement sans contact" />
              <Access label="Boutique" text="Ouverte 1h30 avant et 30 min apres le match" />
              <Access label="Fan zone" text="Animations DJ + food trucks des 1h avant le coup d'envoi" />
            </ul>
          </div>
        </div>
      </SectionLight>
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/40">
        {label}
      </dt>
      <dd className="mt-2 font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-5xl">
        {value}
      </dd>
    </div>
  );
}

function Tribune({ name, capacity, note }) {
  return (
    <li className="flex flex-col justify-between gap-2 border-t border-pau-primary/10 pt-5 md:flex-row md:items-center">
      <div>
        <p className="font-display text-2xl uppercase leading-crush tracking-tightest text-pau-primary">
          {name}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          {capacity}
        </p>
      </div>
      <p className="font-sans text-sm text-pau-primary/60 md:max-w-xs md:text-right">
        {note}
      </p>
    </li>
  );
}

function Access({ label, text }) {
  return (
    <li>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
        {label}
      </p>
      <p className="mt-1 leading-relaxed">{text}</p>
    </li>
  );
}

export const metadata = {
  title: 'Le Club',
  description:
    'Histoire, valeurs et projet du Pau FC. Un club professionnel ancré en Béarn depuis 1920.',
};

export default function ClubPage() {
  return (
    <article>
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Le Club · Béarn · Depuis 1920</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          LE <span className="text-jaune">CLUB</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Le Pau FC est un club de football professionnel français basé à Pau,
          en Béarn. Plus d&apos;un siècle d&apos;histoire, une identité forte,
          un ancrage territorial revendiqué.
        </p>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Notre histoire
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
            <p>
              Fondé en 1920, le Pau FC plonge ses racines dans le sport
              amateur béarnais avant de se professionnaliser dans les années
              2000. Le club évolue aujourd&apos;hui en Ligue 2 BKT et porte
              fièrement les couleurs du Béarn.
            </p>
            <p>
              Au fil des décennies, le Pau FC s&apos;est construit autour
              d&apos;une philosophie claire : former, faire grandir, puis
              valoriser. Beaucoup de joueurs sont passés par le centre
              d&apos;entraînement avant de rejoindre l&apos;élite.
            </p>
            <p>
              La saison 2025-2026 s&apos;inscrit dans le plan stratégique
              2024-2028 piloté par la direction du club : montée en puissance
              sportive, modernisation des infrastructures, ouverture sur le
              territoire.
            </p>
          </div>
        </div>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Nos valeurs
          </h2>
          <ul className="space-y-8">
            <ValueItem
              num="01"
              title="Engagement"
              text="Sur le terrain comme en dehors. Chaque match, chaque entraînement, chaque interaction compte."
            />
            <ValueItem
              num="02"
              title="Territoire"
              text="Ancrage en Béarn revendiqué. Le club se construit avec et pour son public, ses partenaires, ses bénévoles."
            />
            <ValueItem
              num="03"
              title="Formation"
              text="Faire grandir les talents — joueurs, staff, encadrants. Donner du temps, transmettre, exiger."
            />
            <ValueItem
              num="04"
              title="Exigence"
              text="Pas de sentimentalisme tactique. On bosse, on apprend de chaque rencontre, on ajuste."
            />
          </ul>
        </div>
      </section>

      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Le projet
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Le plan stratégique 2024-2028 articule trois axes : performance
              sportive, modernisation des installations (dont la nouvelle
              tribune Béarn livrée en août 2026), et politique RSE renforcée
              via la Fondation Pau FC.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
            <Stat label="Année de fondation" value="1920" />
            <Stat label="Niveau" value="Ligue 2" />
            <Stat label="Nouste Camp" value="9 800 places" />
            <Stat label="Saison en cours" value="2025-2026" />
          </dl>
        </div>
      </section>
    </article>
  );
}

function ValueItem({ num, title, text }) {
  return (
    <li className="flex gap-6 border-t border-blanc/10 pt-6">
      <span className="flex-none font-display text-3xl leading-none text-jaune">
        {num}
      </span>
      <div>
        <h3 className="font-display text-2xl uppercase leading-crush tracking-tightest text-blanc">
          {title}
        </h3>
        <p className="mt-2 font-sans text-base leading-relaxed text-blanc/70">
          {text}
        </p>
      </div>
    </li>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border-t border-blanc/10 pt-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
        {label}
      </dt>
      <dd className="mt-2 font-display text-3xl uppercase leading-crush tracking-tightest text-blanc md:text-4xl">
        {value}
      </dd>
    </div>
  );
}

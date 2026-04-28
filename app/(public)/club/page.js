import Image from 'next/image';

export const metadata = {
  title: 'Le Club',
  description:
    'Histoire, valeurs et projet du Pau FC. Un club professionnel ancré en Béarn depuis 1920.',
};

export default function ClubPage() {
  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-club.jpg"
          alt="Le Club Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Le Club · Béarn · Depuis 1920
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              Le Club
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Plus d'un siècle d'histoire, une identité forte, un ancrage territorial revendiqué.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* Notre histoire */}
        <div className="grid gap-10 md:grid-cols-2">
          <h2 className="font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
            Notre histoire
          </h2>
          <div className="space-y-4 text-sm text-pau-primary/75">
            <p>
              Fondé en 1920, le Pau FC plonge ses racines dans le sport
              amateur béarnais avant de se professionnaliser dans les années
              2000. Le club évolue aujourd'hui en Ligue 2 BKT et porte
              fièrement les couleurs du Béarn.
            </p>
            <p>
              Au fil des décennies, le Pau FC s'est construit autour
              d'une philosophie claire : former, faire grandir, puis
              valoriser. Beaucoup de joueurs sont passés par le centre
              d'entraînement avant de rejoindre l'élite.
            </p>
            <p>
              La saison 2025-2026 s'inscrit dans le plan stratégique
              2024-2028 piloté par la direction du club : montée en puissance
              sportive, modernisation des installations, ouverture sur le
              territoire.
            </p>
          </div>
        </div>

        {/* Nos valeurs */}
        <div className="mt-12 grid gap-10 border-t border-gray-200 pt-12 md:grid-cols-2">
          <h2 className="font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
            Nos valeurs
          </h2>
          <ul className="space-y-6">
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

        {/* Le projet */}
        <div className="mt-12 grid gap-10 border-t border-gray-200 pt-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
              Le projet
            </h2>
            <p className="mt-4 text-sm text-pau-primary/75">
              Le plan stratégique 2024-2028 articule trois axes : performance
              sportive, modernisation des installations (dont la nouvelle
              tribune Béarn livrée en août 2026), et politique RSE renforcée
              via la Fondation Pau FC.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-6">
            <Stat label="Année de fondation" value="1920" />
            <Stat label="Niveau" value="Ligue 2" />
            <Stat label="Nouste Camp" value="9 800 places" />
            <Stat label="Saison en cours" value="2025-2026" />
          </dl>
        </div>

        {/* Direction */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
            Direction
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <FounderCard
              name="Bernard Laporte-Fray"
              role="Président"
              image="/images/club/BernardLaporte-Fray.png"
            />
            <FounderCard
              name="Luis de Sousa"
              role="Dirigeant"
              image="/images/club/luis-de-sousa-1.png"
            />
            <FounderCard
              name="Direction Générale"
              role="Membre de la direction"
              image="/images/club/DSC00082.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueItem({ num, title, text }) {
  return (
    <li className="flex gap-4 border-t border-gray-200 pt-4">
      <span className="flex-none font-display text-xl text-pau-yellow">
        {num}
      </span>
      <div>
        <h3 className="font-display text-base font-bold uppercase text-pau-primary">
          {title}
        </h3>
        <p className="mt-1 text-sm text-pau-primary/70">
          {text}
        </p>
      </div>
    </li>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <dt className="font-mono text-xs uppercase tracking-wider text-pau-primary/50">
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl font-bold uppercase text-pau-primary">
        {value}
      </dd>
    </div>
  );
}

function FounderCard({ name, role, image }) {
  return (
    <div className="border border-gray-200">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="border-t-2 border-pau-yellow p-4">
        <h3 className="font-display text-base font-bold uppercase text-pau-primary">
          {name}
        </h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-pau-yellow">
          {role}
        </p>
      </div>
    </div>
  );
}

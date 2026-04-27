import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Le Club',
  description:
    'Histoire, valeurs et projet du Pau FC. Un club professionnel ancré en Béarn depuis 1920.',
};

export default function ClubPage() {
  return (
    <article>
      <PageHero
        image="/images/hero-club.jpg"
        surtitle="Le Club · Béarn · Depuis 1920"
        title="LE CLUB"
        subtitle="Le Pau FC est un club de football professionnel français basé à Pau, en Béarn. Plus d'un siècle d'histoire, une identité forte, un ancrage territorial revendiqué."
      />

      <SectionLight>
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
            Notre histoire
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-[#0F1E45]/75 md:text-lg">
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
              sportive, modernisation des installations, ouverture sur le
              territoire.
            </p>
          </div>
        </div>
      </SectionLight>

      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
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
      </SectionLight>

      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
              Le projet
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-[#0F1E45]/75 md:text-lg">
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
      </SectionLight>

      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="space-y-10">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
            Direction
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
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
      </SectionLight>
    </article>
  );
}

function ValueItem({ num, title, text }) {
  return (
    <li className="flex gap-6 border-t border-[#0F1E45]/10 pt-6">
      <span className="flex-none font-display text-3xl leading-none text-[#FFD60A]">
        {num}
      </span>
      <div>
        <h3 className="font-display text-2xl uppercase leading-crush tracking-tightest text-[#0F1E45]">
          {title}
        </h3>
        <p className="mt-2 font-sans text-base leading-relaxed text-[#0F1E45]/70">
          {text}
        </p>
      </div>
    </li>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border-t border-[#0F1E45]/10 pt-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1E45]/40">
        {label}
      </dt>
      <dd className="mt-2 font-display text-3xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-4xl">
        {value}
      </dd>
    </div>
  );
}

function FounderCard({ name, role, image }) {
  return (
    <div className="group relative overflow-hidden bg-pau-primary">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="border-t-4 border-pau-yellow p-6">
        <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-white">
          {name}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-pau-yellow">
          {role}
        </p>
      </div>
    </div>
  );
}

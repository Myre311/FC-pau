import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Histoire du club',
  description:
    'Les grandes dates et moments clés de l\'histoire du Pau FC depuis sa fondation en 1920.',
};

export default function HistoirePage() {
  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-histoire.jpg"
          alt="Histoire du Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Le Club · Histoire
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              105 ans d'histoire
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Des racines amateurs béarnaises aux ambitions professionnelles actuelles.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* Citation */}
        <blockquote className="border-l-2 border-pau-yellow bg-pau-yellow/5 px-8 py-8">
          <p className="font-display text-xl font-bold uppercase text-pau-primary md:text-2xl">
            Un club ancré en Béarn, porté par ses supporters et ouvert sur l'avenir.
          </p>
          <footer className="mt-4 font-mono text-xs uppercase tracking-wider text-pau-primary/60">
            — Devise officielle du Pau FC
          </footer>
        </blockquote>

        {/* Timeline */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <h2 className="mb-8 font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
            Dates clés
          </h2>

          <div className="space-y-8">
            <TimelineItem
              year="1920"
              title="Fondation du club"
              description="Création du Pau Football Club par des passionnés béarnais. Le club évolue en championnats régionaux amateurs pendant plusieurs décennies."
            />

            <TimelineItem
              year="1974"
              title="Premier titre national amateur"
              description="Le Pau FC remporte le championnat de France amateur et accède pour la première fois à un niveau semi-professionnel."
            />

            <TimelineItem
              year="2000-2010"
              title="Professionnalisation"
              description="Le club change de statut et devient société sportive professionnelle. Début d'un projet structuré autour de la formation et de la montée en puissance sportive."
            />

            <TimelineItem
              year="2019"
              title="Montée en Ligue 2"
              description="Victoire en National et accession à la Ligue 2 BKT, deuxième division française. Le Pau FC retrouve le football professionnel de haut niveau après plusieurs décennies."
            />

            <TimelineItem
              year="2020"
              title="Centenaire"
              description="Le club célèbre ses 100 ans d'histoire. Une saison symbolique malgré le contexte sanitaire, marquée par la fierté d'un siècle d'ancrage béarnais."
            />

            <TimelineItem
              year="2024"
              title="Plan stratégique 2024-2028"
              description="Le Pau FC dévoile son projet à moyen terme : infrastructures modernisées (nouvelle tribune Béarn), académie renforcée, objectif de maintien solide en Ligue 2 et ambition de montée vers l'élite."
            />

            <TimelineItem
              year="2026"
              title="Aujourd'hui"
              description="Le Pau FC évolue en Ligue 2 BKT avec une identité revendiquée : un club formateur, ancré en Béarn, porté par ses supporters et ouvert sur l'avenir."
              isCurrent
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 grid gap-6 border-t border-gray-200 pt-12 md:grid-cols-2">
          <div className="border border-gray-200 p-6">
            <h2 className="font-display text-xl font-bold uppercase text-pau-primary">
              Découvrir le club
            </h2>
            <p className="mt-3 text-sm text-pau-primary/70">
              Plongez dans l'univers du Pau FC : effectif, calendrier, actualités, espace partenaires.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/club"
                className="inline-block bg-pau-yellow px-4 py-2 font-mono text-xs font-bold uppercase text-pau-night hover:bg-pau-yellow/90"
              >
                Présentation
              </Link>
              <Link
                href="/equipe"
                className="inline-block border border-pau-primary px-4 py-2 font-mono text-xs font-bold uppercase text-pau-primary hover:bg-pau-primary hover:text-white"
              >
                Effectif
              </Link>
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="font-display text-xl font-bold uppercase text-pau-primary">
              Nouste Camp
            </h2>
            <p className="mt-3 text-sm text-pau-primary/70">
              Découvrez le stade du Pau FC, son histoire, ses travaux de modernisation et comment venir assister aux matchs.
            </p>
            <div className="mt-6">
              <Link
                href="/nouste-camp"
                className="inline-block border border-pau-primary px-4 py-2 font-mono text-xs font-bold uppercase text-pau-primary hover:bg-pau-primary hover:text-white"
              >
                Le stade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, description, isCurrent = false }) {
  return (
    <div className="border-l-2 border-gray-200 pl-6">
      <p
        className={`font-display text-3xl font-bold uppercase ${
          isCurrent ? 'text-pau-yellow' : 'text-pau-primary/50'
        }`}
      >
        {year}
        {isCurrent && (
          <span className="ml-3 font-mono text-xs tracking-wider text-pau-yellow">
            Aujourd'hui
          </span>
        )}
      </p>
      <h3 className="mt-3 font-display text-lg font-bold uppercase text-pau-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm text-pau-primary/70">
        {description}
      </p>
    </div>
  );
}

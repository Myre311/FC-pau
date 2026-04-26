export const metadata = {
  title: 'Histoire du club',
  description:
    'Les grandes dates et moments clés de l\'histoire du Pau FC depuis sa fondation en 1920.',
};

export default function HistoirePage() {
  return (
    <article>
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Le Club · Histoire</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          DATES <span className="text-jaune">CLÉS</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Plus d'un siècle d'histoire paloise. Des racines amateurs béarnaises
          aux ambitions professionnelles actuelles, retour sur les moments qui
          ont forgé l'identité du club.
        </p>
      </section>

      {/* Timeline */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="space-y-12">
          {/* 1920 */}
          <TimelineItem
            year="1920"
            title="Fondation du club"
            description="Création du Pau Football Club par des passionnés béarnais. Le club évolue en championnats régionaux amateurs pendant plusieurs décennies."
          />

          {/* 1974 */}
          <TimelineItem
            year="1974"
            title="Premier titre national amateur"
            description="Le Pau FC remporte le championnat de France amateur et accède pour la première fois à un niveau semi-professionnel."
          />

          {/* 2000s */}
          <TimelineItem
            year="2000-2010"
            title="Professionnalisation"
            description="Le club change de statut et devient société sportive professionnelle. Début d'un projet structuré autour de la formation et de la montée en puissance sportive."
          />

          {/* 2019 */}
          <TimelineItem
            year="2019"
            title="Montée en Ligue 2"
            description="Victoire en National et accession à la Ligue 2 BKT, deuxième division française. Le Pau FC retrouve le football professionnel de haut niveau après plusieurs décennies."
          />

          {/* 2020 */}
          <TimelineItem
            year="2020"
            title="Centenaire"
            description="Le club célèbre ses 100 ans d'histoire. Une saison symbolique malgré le contexte sanitaire, marquée par la fierté d'un siècle d'ancrage béarnais."
          />

          {/* 2024 */}
          <TimelineItem
            year="2024"
            title="Lancement du plan stratégique 2024-2028"
            description="Le Pau FC dévoile son projet à moyen terme : infrastructures modernisées (nouvelle tribune Béarn), académie renforcée, objectif de maintien solide en Ligue 2 et ambition de montée vers l'élite."
          />

          {/* 2026 */}
          <TimelineItem
            year="2026"
            title="Aujourd'hui"
            description="Le Pau FC évolue en Ligue 2 BKT avec une identité revendiquée : un club formateur, ancré en Béarn, porté par ses supporters et ouvert sur l'avenir."
            isCurrent
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Découvrir le club
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Plongez dans l'univers du Pau FC : effectif, calendrier,
              actualités, espace partenaires.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/club"
                className="inline-block bg-blanc px-6 py-3 font-mono text-sm uppercase tracking-wider text-nuit transition-transform hover:scale-105"
              >
                Présentation
              </a>
              <a
                href="/equipe"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Effectif
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Nouste Camp
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Découvrez le stade du Pau FC, son histoire, ses travaux de
              modernisation et comment venir assister aux matchs.
            </p>
            <div className="mt-8">
              <a
                href="/nouste-camp"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Le stade
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant réutilisable pour chaque événement de la timeline
function TimelineItem({ year, title, description, isCurrent = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
      {/* Année */}
      <div className="relative">
        <div
          className={`font-display text-6xl uppercase leading-none tracking-tightest md:text-7xl ${
            isCurrent ? 'text-jaune' : 'text-blanc/30'
          }`}
        >
          {year}
        </div>
        {isCurrent && (
          <span className="mt-2 inline-block font-mono text-xs uppercase tracking-wider text-jaune">
            Aujourd'hui
          </span>
        )}
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

import Link from 'next/link';

export const metadata = {
  title: 'Pôle Masculin · Academy',
  description:
    'Le pôle masculin de l\'Academy Pau FC forme les jeunes joueurs de 12 à 19 ans. Préformation, formation, internat, suivi scolaire renforcé.',
};

export default function PoleMasculinPage() {
  return (
    <article>
      {/* Hero */}
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Academy · Garçons</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          PÔLE <span className="text-pau-yellow">MASCULIN</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-pau-primary/70 md:text-xl">
          Depuis plus de 20 ans, le pôle masculin de l'Academy Pau FC forme les
          talents béarnais vers le football professionnel et le haut niveau
          amateur.
        </p>
      </section>

      {/* Présentation */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Le projet
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            <p>
              Le pôle masculin du Pau FC accueille chaque saison une
              cinquantaine de joueurs, de la catégorie U13 à U19. Le projet
              s'articule autour de trois piliers : excellence sportive, réussite
              scolaire, développement personnel.
            </p>
            <p>
              Nos équipes évoluent en championnats régionaux et nationaux. Les
              joueurs les plus performants intègrent le groupe professionnel
              dès 17-18 ans, suivant un parcours de progression individualisé.
            </p>
            <p>
              Au fil des années, l'Academy a vu partir des dizaines de joueurs
              vers des clubs de Ligue 1, Ligue 2 et championnats étrangers. Le
              Pau FC s'affirme comme un club formateur reconnu en
              Nouvelle-Aquitaine.
            </p>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Catégories
        </h2>

        <div className="space-y-8">
          <CategoryItem
            title="U13 · U14 · U15 — Préformation"
            description="Détection et apprentissage des fondamentaux. Technique individuelle, culture tactique de base, initiation au jeu collectif. Championnat régional. Entraînements 3 à 4 fois par semaine."
          />
          <CategoryItem
            title="U16 · U17 — Formation"
            description="Intensification du volume d'entraînement (5 à 6 séances/semaine). Championnats nationaux U17. Suivi renforcé : physique, mental, nutrition. Possibilité d'internat au Nouste Camp."
          />
          <CategoryItem
            title="U18 · U19 — Accession pro"
            description="Préparation au football professionnel. Championnat National U19. Entraînements avec le groupe pro selon les profils. Projet post-formation (signature pro, université, club étranger)."
          />
        </div>
      </section>

      {/* Internat */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Internat
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                L'Academy dispose d'un internat au sein du complexe du Nouste
                Camp. Les joueurs en provenance de l'extérieur du département
                peuvent y résider toute la semaine.
              </p>
              <p>
                <strong className="text-pau-primary">Hébergement</strong> — Chambres
                doubles ou individuelles, accès WiFi.
              </p>
              <p>
                <strong className="text-pau-primary">Restauration</strong> —
                Petit-déjeuner, déjeuner, dîner. Menus équilibrés adaptés aux
                besoins sportifs.
              </p>
              <p>
                <strong className="text-pau-primary">Encadrement</strong> —
                Éducateurs présents 24/7. Règlement intérieur strict.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Scolarité
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                L'Academy a noué des partenariats avec des établissements
                scolaires locaux pour permettre un aménagement horaires optimal.
              </p>
              <p>
                <strong className="text-pau-primary">Collège</strong> — Cours le
                matin, entraînements l'après-midi.
              </p>
              <p>
                <strong className="text-pau-primary">Lycée</strong> — Sections
                sportives. Bac général, technologique ou professionnel.
              </p>
              <p>
                <strong className="text-pau-primary">Études</strong> — Salle de
                travail dédiée avec accompagnement scolaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Encadrement
        </h2>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <StaffCard
            title="Staff technique"
            items={[
              'Entraîneurs diplômés UEFA Pro/A/B',
              'Coordinateur formation',
              'Analystes vidéo',
              'Entraîneurs des gardiens',
            ]}
          />
          <StaffCard
            title="Staff médical"
            items={[
              'Médecin du sport',
              'Kinésithérapeutes',
              'Préparateurs physiques',
              'Psychologue du sport',
            ]}
          />
          <StaffCard
            title="Suivi global"
            items={[
              'Responsable scolarité',
              'Nutritionniste',
              'Éducateurs internat',
              'Coordinateur administratif',
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Rejoindre le pôle masculin
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Tu as entre 12 et 18 ans, tu es passionné de football et tu veux
            intégrer un centre de formation reconnu ? Découvre comment
            candidater au pôle masculin de l'Academy Pau FC.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/academy/integrer"
              className="inline-block bg-pau-yellow px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-night transition-transform hover:scale-105"
            >
              Candidater
            </Link>
            <Link
              href="/academy"
              className="inline-block border border-gray-200/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:border-pau-yellow hover:text-pau-yellow"
            >
              Retour Academy
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant réutilisable pour chaque catégorie
function CategoryItem({ title, description }) {
  return (
    <div className="border-l-2 border-pau-yellow pl-6 md:pl-10">
      <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-pau-primary md:text-4xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
        {description}
      </p>
    </div>
  );
}

// Composant Staff Card
function StaffCard({ title, items }) {
  return (
    <div>
      <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-pau-yellow md:text-3xl">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 font-sans text-base text-pau-primary/75">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

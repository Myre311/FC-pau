import Link from 'next/link';

export const metadata = {
  title: 'Pôle Féminin · Academy',
  description:
    'Le pôle féminin de l\'Academy Pau FC forme les jeunes joueuses de 12 à 18 ans dans un cadre professionnel et bienveillant.',
};

export default function PoleFemininPage() {
  return (
    <article>
      {/* Hero */}
      <section className="bg-pau-primary py-16 md:py-24">
        <div className="container-fc">
          <p className="badge-mono">Academy · Filles</p>
          <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px] text-white">
            PÔLE <span className="text-pau-yellow">FÉMININ</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
            Former les joueuses de demain. Le pôle féminin de l'Academy Pau FC
            accompagne les jeunes filles passionnées de football vers le haut
            niveau.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Le projet
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            <p>
              Le pôle féminin du Pau FC s'inscrit dans le développement du
              football féminin en Béarn et en Nouvelle-Aquitaine. Lancé il y a
              quelques années, il accueille aujourd'hui des joueuses de U13 à
              U19 dans un environnement professionnel et structuré.
            </p>
            <p>
              Nos joueuses évoluent en championnats régionaux et nationaux selon
              leur catégorie d'âge. L'objectif est double : progresser
              techniquement et tactiquement, tout en maintenant un parcours
              scolaire de qualité.
            </p>
            <p>
              Le staff technique est composé d'entraîneurs diplômés, spécialisés
              dans la formation féminine. Un suivi individualisé est proposé à
              chaque joueuse pour l'aider à atteindre ses objectifs sportifs et
              personnels.
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
            title="U13 · U14 · U15"
            description="Initiation au haut niveau · Apprentissage des fondamentaux techniques et tactiques · Encadrement bienveillant · Championnat régional."
          />
          <CategoryItem
            title="U16 · U17"
            description="Perfectionnement · Intensification du volume d'entraînement · Compétitions régionales et nationales · Suivi renforcé (physique, mental, nutrition)."
          />
          <CategoryItem
            title="U18 · U19"
            description="Préparation au haut niveau amateur ou professionnel · Championnat national · Lien avec l'équipe senior féminine · Projet post-formation (université, club professionnel)."
          />
        </div>
      </section>

      {/* Encadrement */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Encadrement
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                <strong className="text-pau-primary">Staff technique</strong> —
                Entraîneurs diplômés UEFA B/A, spécialisés football féminin.
              </p>
              <p>
                <strong className="text-pau-primary">Préparation physique</strong> —
                Programme adapté à chaque catégorie d'âge.
              </p>
              <p>
                <strong className="text-pau-primary">Suivi médical</strong> — Médecin
                du sport, kinésithérapeutes.
              </p>
              <p>
                <strong className="text-pau-primary">Suivi scolaire</strong> —
                Partenariats avec des établissements locaux pour aménagement
                horaires.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Infrastructures
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                <strong className="text-pau-primary">Terrains</strong> — Accès aux
                terrains du Nouste Camp et installations annexes.
              </p>
              <p>
                <strong className="text-pau-primary">Vestiaires</strong> — Espaces
                dédiés au pôle féminin.
              </p>
              <p>
                <strong className="text-pau-primary">Salle de musculation</strong> —
                Équipements professionnels.
              </p>
              <p>
                <strong className="text-pau-primary">Salle vidéo</strong> — Analyse
                tactique et débriefing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Rejoindre le pôle féminin
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Tu as entre 12 et 18 ans, tu es passionnée de football et tu veux
            intégrer un projet ambitieux ? Découvre comment candidater au pôle
            féminin de l'Academy Pau FC.
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
              className="inline-block border border-gray-200 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:bg-gray-50"
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

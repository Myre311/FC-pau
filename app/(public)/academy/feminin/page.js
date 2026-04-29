import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Pôle Féminin · Academy',
  description:
    'Le pôle féminin de l\'Academy Pau FC forme les jeunes joueuses de 12 Ã  18 ans dans un cadre professionnel et bienveillant.',
};

export default function PoleFemininPage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy-feminin.jpg"
          alt="Pôle Féminin Academy Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Academy · Filles
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Pôle Féminin
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Former les joueuses de demain. Le pôle féminin de l'Academy Pau FC
              accompagne les jeunes filles passionnées de football vers le haut
              niveau.
            </p>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Le projet
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
                Former les joueuses
              </h2>
            </div>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
              <p>
                Le pôle féminin du Pau FC s'inscrit dans le développement du
                football féminin en Béarn et en Nouvelle-Aquitaine. Lancé il y a
                quelques années, il accueille aujourd'hui des joueuses de U13 Ã 
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
                dans la formation féminine. Un suivi individualisé est proposé Ã 
                chaque joueuse pour l'aider Ã  atteindre ses objectifs sportifs et
                personnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Nos catégories
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              De U13 Ã  U19
            </h2>
          </div>

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
        </div>
      </section>

      {/* Encadrement */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Encadrement
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Staff technique
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  <strong className="text-pau-night">Staff technique</strong> "”
                  Entraîneurs diplômés UEFA B/A, spécialisés football féminin.
                </p>
                <p>
                  <strong className="text-pau-night">Préparation physique</strong> "”
                  Programme adapté Ã  chaque catégorie d'âge.
                </p>
                <p>
                  <strong className="text-pau-night">Suivi médical</strong> "” Médecin
                  du sport, kinésithérapeutes.
                </p>
                <p>
                  <strong className="text-pau-night">Suivi scolaire</strong> "”
                  Partenariats avec des établissements locaux pour aménagement
                  horaires.
                </p>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Infrastructures
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Équipements
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  <strong className="text-pau-night">Terrains</strong> "” Accès aux
                  terrains du Nouste Camp et installations annexes.
                </p>
                <p>
                  <strong className="text-pau-night">Vestiaires</strong> "” Espaces
                  dédiés au pôle féminin.
                </p>
                <p>
                  <strong className="text-pau-night">Salle de musculation</strong> "”
                  Équipements professionnels.
                </p>
                <p>
                  <strong className="text-pau-night">Salle vidéo</strong> "” Analyse
                  tactique et débriefing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Rejoindre
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Intégrer le pôle féminin
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              Vous avez entre 12 et 18 ans, vous êtes passionnée de football et vous souhaitez
              intégrer un projet ambitieux ? Découvrez comment candidater au pôle
              féminin de l'Academy Pau FC.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/academy/integrer"
                className="inline-block border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
              >
                Candidater
              </Link>
              <Link
                href="/academy"
                className="inline-block border-2 border-white bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-pau-primary"
              >
                Retour Academy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function CategoryItem({ title, description }) {
  return (
    <div className="border-l-4 border-pau-yellow pl-6 md:pl-10">
      <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-white/70 md:text-lg">
        {description}
      </p>
    </div>
  );
}

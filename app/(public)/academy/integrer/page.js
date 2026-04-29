import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Rejoindre l\'Academy',
  description:
    'Comment intégrer l\'Academy du Pau FC : critères, candidature, détections, calendrier. Pôle masculin et féminin.',
};

export default function IntegrerPage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy-integrer.jpg"
          alt="Rejoindre l'Academy Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Academy · Candidature
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Rejoindre l'Academy
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Vous avez entre 12 et 18 ans et vous souhaitez intégrer un projet ambitieux ?
              Découvrez comment candidater au pôle masculin ou féminin de l'Academy
              Pau FC.
            </p>
          </div>
        </div>
      </section>

      {/* Critères */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Profil recherché
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
                Critères d'entrée
              </h2>
            </div>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
              <p>
                L'Academy Pau FC recrute des jeunes joueurs et joueuses motivés,
                talentueux et capables de s'inscrire dans un projet exigeant à la
                fois sur le plan sportif et scolaire.
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong className="text-pau-night">Âge</strong> : 12 à 18 ans
                  (U13 à U19)
                </li>
                <li>
                  <strong className="text-pau-night">Niveau</strong> : Joueur/joueuse
                  évoluant en club, niveau district minimum, idéalement ligue
                </li>
                <li>
                  <strong className="text-pau-night">Motivation</strong> : Envie de
                  progresser et de s'investir pleinement
                </li>
                <li>
                  <strong className="text-pau-night">Scolarité</strong> : Résultats
                  scolaires satisfaisants, assiduité
                </li>
                <li>
                  <strong className="text-pau-night">Attitude</strong> : Respect,
                  engagement, esprit d'équipe
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Processus
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Comment candidater
            </h2>
          </div>

          <div className="space-y-8">
            <Step
              number="1"
              title="Candidature en ligne"
              description="Remplis le formulaire de candidature sur notre site web. Documents à fournir : CV sportif, bulletin scolaire du dernier trimestre, lettre de motivation (optionnel)."
            />
            <Step
              number="2"
              title="Présélection"
              description="Le staff de l'Academy étudie les candidatures reçues. Les profils retenus sont contactés par email ou téléphone dans un délai de 2 à 3 semaines."
            />
            <Step
              number="3"
              title="Détection"
              description="Les candidats présélectionnés sont invités à une journée de détection (tests physiques, techniques, matchs). Le staff observe les qualités footballistiques et l'attitude sur le terrain."
            />
            <Step
              number="4"
              title="Entretien"
              description="Entretien avec le responsable de l'Academy, le joueur/la joueuse et les parents. Discussion sur le projet sportif, scolaire, et les conditions d'intégration (internat, transports, etc.)."
            />
            <Step
              number="5"
              title="Décision finale"
              description="Le staff se réunit pour prendre une décision. Les familles sont contactées sous 7 jours. En cas de réponse positive, inscription administrative et médicale."
            />
          </div>
        </div>
      </section>

      {/* Détections */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Calendrier
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Détections
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  Les détections ont lieu plusieurs fois par an, généralement
                  pendant les vacances scolaires et en fin de saison.
                </p>
                <p>
                  <strong className="text-pau-night">Printemps</strong> — Avril / Mai
                </p>
                <p>
                  <strong className="text-pau-night">Été</strong> — Juin / Juillet
                </p>
                <p>
                  <strong className="text-pau-night">Automne</strong> — Octobre
                </p>
                <p>
                  Les dates exactes sont communiquées par email aux candidats
                  présélectionnés.
                </p>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Hébergement
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Internat & Scolarité
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  Les joueurs résidant en dehors du département peuvent intégrer
                  l'internat du Nouste Camp (pôle masculin uniquement pour
                  l'instant).
                </p>
                <p>
                  <strong className="text-pau-night">Hébergement</strong> —
                  Pension complète, chambres doubles, encadrement 24/7.
                </p>
                <p>
                  <strong className="text-pau-night">Scolarité</strong> —
                  Partenariats avec collèges et lycées locaux. Aménagement
                  horaires pour concilier sport et études.
                </p>
                <p>
                  <strong className="text-pau-night">Coût</strong> — Tarif internat
                  et inscription communiqués lors de l'entretien.
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
              Action
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Candidater maintenant
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              Prêt(e) à rejoindre l'Academy du Pau FC ? Envoyez votre dossier de
              candidature par email avec les documents suivants :
            </p>
            <ul className="mt-4 ml-5 list-disc space-y-2 font-sans text-base text-white/70">
              <li>CV sportif (parcours club, poste, niveau)</li>
              <li>Bulletin scolaire du dernier trimestre</li>
              <li>Lettre de motivation (optionnel mais apprécié)</li>
              <li>Coordonnées des parents/tuteurs</li>
            </ul>

            <div className="mt-8 space-y-3 font-sans text-base text-white/70">
              <p>
                Email :{' '}
                <a
                  href="mailto:recrutement.academy@paufc.fr"
                  className="font-medium text-pau-yellow hover:underline"
                >
                  recrutement.academy@paufc.fr
                </a>
              </p>
              <p>
                Téléphone :{' '}
                <a href="tel:+33559000000" className="font-medium text-pau-yellow hover:underline">
                  +33 5 59 00 00 00
                </a>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:recrutement.academy@paufc.fr?subject=Candidature Academy Pau FC"
                className="inline-block border-2 border-white bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-white"
              >
                Envoyer ma candidature
              </a>
              <Link
                href="/academy"
                className="inline-block border-2 border-white bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-pau-night"
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

function Step({ number, title, description }) {
  return (
    <div className="grid gap-6 md:grid-cols-[100px_1fr] md:gap-12">
      <div className="relative">
        <div className="font-display text-6xl font-bold uppercase leading-none text-pau-yellow md:text-7xl">
          {number}
        </div>
      </div>

      <div className="border-l-4 border-white/10 pl-6 md:pl-10">
        <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 font-sans text-base leading-relaxed text-white/70 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

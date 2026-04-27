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
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Academy · Candidature</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          REJOINDRE <span className="text-pau-yellow">L&apos;ACADEMY</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-pau-primary/70 md:text-xl">
          Tu as entre 12 et 18 ans et tu veux intégrer un projet ambitieux ?
          Découvre comment candidater au pôle masculin ou féminin de l'Academy
          Pau FC.
        </p>
      </section>

      {/* Critères */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Critères d&apos;entrée
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            <p>
              L'Academy Pau FC recrute des jeunes joueurs et joueuses motivés,
              talentueux et capables de s'inscrire dans un projet exigeant à la
              fois sur le plan sportif et scolaire.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-pau-primary">Âge</strong> : 12 à 18 ans
                (U13 à U19)
              </li>
              <li>
                <strong className="text-pau-primary">Niveau</strong> : Joueur/joueuse
                évoluant en club, niveau district minimum, idéalement ligue
              </li>
              <li>
                <strong className="text-pau-primary">Motivation</strong> : Envie de
                progresser et de s'investir pleinement
              </li>
              <li>
                <strong className="text-pau-primary">Scolarité</strong> : Résultats
                scolaires satisfaisants, assiduité
              </li>
              <li>
                <strong className="text-pau-primary">Attitude</strong> : Respect,
                engagement, esprit d'équipe
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Processus de candidature
        </h2>

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
      </section>

      {/* Détections */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Calendrier détections
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                Les détections ont lieu plusieurs fois par an, généralement
                pendant les vacances scolaires et en fin de saison.
              </p>
              <p>
                <strong className="text-pau-primary">Printemps</strong> — Avril / Mai
              </p>
              <p>
                <strong className="text-pau-primary">Été</strong> — Juin / Juillet
              </p>
              <p>
                <strong className="text-pau-primary">Automne</strong> — Octobre
              </p>
              <p>
                Les dates exactes sont communiquées par email aux candidats
                présélectionnés.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Internat & Scolarité
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                Les joueurs résidant en dehors du département peuvent intégrer
                l'internat du Nouste Camp (pôle masculin uniquement pour
                l'instant).
              </p>
              <p>
                <strong className="text-pau-primary">Hébergement</strong> —
                Pension complète, chambres doubles, encadrement 24/7.
              </p>
              <p>
                <strong className="text-pau-primary">Scolarité</strong> —
                Partenariats avec collèges et lycées locaux. Aménagement
                horaires pour concilier sport et études.
              </p>
              <p>
                <strong className="text-pau-primary">Coût</strong> — Tarif internat
                et inscription communiqués lors de l'entretien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Candidater maintenant
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Prêt(e) à rejoindre l'Academy du Pau FC ? Envoie ton dossier de
            candidature par email avec les documents suivants :
          </p>
          <ul className="mt-4 ml-5 list-disc space-y-2 font-sans text-base text-pau-primary/75">
            <li>CV sportif (parcours club, poste, niveau)</li>
            <li>Bulletin scolaire du dernier trimestre</li>
            <li>Lettre de motivation (optionnel mais apprécié)</li>
            <li>Coordonnées des parents/tuteurs</li>
          </ul>

          <div className="mt-8 space-y-4">
            <p className="font-sans text-base text-pau-primary/75">
              Email :{' '}
              <a
                href="mailto:recrutement.academy@paufc.fr"
                className="text-pau-yellow hover:underline"
              >
                recrutement.academy@paufc.fr
              </a>
            </p>
            <p className="font-sans text-base text-pau-primary/75">
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-pau-yellow hover:underline">
                +33 5 59 00 00 00
              </a>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:recrutement.academy@paufc.fr?subject=Candidature Academy Pau FC"
              className="inline-block bg-jaune px-6 py-3 font-mono text-sm uppercase tracking-wider text-nuit transition-transform hover:scale-105"
            >
              Envoyer ma candidature
            </a>
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

// Composant Step
function Step({ number, title, description }) {
  return (
    <div className="grid gap-6 md:grid-cols-[100px_1fr] md:gap-12">
      {/* Numéro */}
      <div className="relative">
        <div className="font-display text-6xl uppercase leading-none tracking-tightest text-pau-yellow md:text-7xl">
          {number}
        </div>
      </div>

      {/* Contenu */}
      <div className="border-l-2 border-gray-200/10 pl-6 md:pl-10">
        <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-pau-primary md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

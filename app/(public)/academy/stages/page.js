import Link from 'next/link';

export const metadata = {
  title: 'Stages Academy',
  description:
    'Stages de football pendant les vacances scolaires pour les jeunes de 8 à 16 ans. Encadrement professionnel par le staff de l\'Academy Pau FC.',
};

export default function StagesPage() {
  return (
    <article>
      {/* Hero */}
      <section className="bg-pau-primary py-16 md:py-24">
        <div className="container-fc">
          <p className="badge-mono">Academy · Stages vacances</p>
          <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px] text-white">
            STAGES <span className="text-pau-yellow">ACADEMY</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
            Des stages intensifs de football pendant les vacances scolaires pour
            les jeunes de 8 à 16 ans, encadrés par le staff de l'Academy Pau FC.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Le concept
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            <p>
              Les stages Academy du Pau FC offrent aux jeunes passionnés de
              football l'opportunité de progresser dans un cadre professionnel
              pendant les vacances scolaires.
            </p>
            <p>
              Encadrés par les éducateurs de l'Academy (diplômés UEFA B/A), les
              stagiaires bénéficient d'un programme complet : technique
              individuelle, tactique collective, préparation physique, coaching
              mental.
            </p>
            <p>
              Les stages sont ouverts à tous les niveaux, du débutant au joueur
              de club confirmé. L'objectif : progresser, prendre du plaisir et
              vivre une expérience inoubliable au Nouste Camp.
            </p>
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Formules
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <FormuleCard
            title="Stage Demi-journée"
            badge="8-12 ans"
            duration="9h-12h ou 14h-17h"
            description="Idéal pour les plus jeunes. 3h d'entraînement par jour, du lundi au vendredi. Technique de base, jeux, mini-matchs."
            price="120€"
            priceDetail="la semaine"
          />

          <FormuleCard
            title="Stage Journée complète"
            badge="10-16 ans"
            duration="9h-17h"
            description="Programme complet : technique, tactique, physique, mental. Repas du midi inclus. Matchs en fin de semaine."
            price="220€"
            priceDetail="la semaine"
          />
        </div>

        <p className="mt-8 font-sans text-sm text-pau-primary/60">
          Réduction de 10% à partir du 2ème enfant inscrit. Réduction de 15%
          pour les abonnés du club.
        </p>
      </section>

      {/* Programme */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Programme type
        </h2>

        <div className="space-y-8">
          <ProgramItem
            title="Technique individuelle"
            description="Conduite de balle, dribbles, frappes, contrôles orientés, jonglage. Exercices ludiques adaptés à chaque niveau."
          />
          <ProgramItem
            title="Tactique collective"
            description="Positionnement, placement, déplacements, jeu sans ballon. Comprendre les principes du jeu à 11."
          />
          <ProgramItem
            title="Préparation physique"
            description="Renforcement musculaire, coordination, vivacité, endurance. Adaptée à chaque catégorie d'âge."
          />
          <ProgramItem
            title="Mental & coaching"
            description="Gestion du stress, confiance en soi, esprit d'équipe. Sessions animées par le psychologue du sport de l'Academy."
          />
          <ProgramItem
            title="Matchs & tournois"
            description="Mise en application en fin de semaine. Matchs inter-groupes, remise de diplômes et photos avec les joueurs pros (selon disponibilités)."
          />
        </div>
      </section>

      {/* Calendrier */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Calendrier 2026
        </h2>

        <div className="space-y-6">
          <CalendarItem
            period="Vacances de printemps"
            dates="14 - 18 avril & 21 - 25 avril"
            status="Inscriptions ouvertes"
            available
          />
          <CalendarItem
            period="Vacances d'été — Session 1"
            dates="7 - 11 juillet"
            status="Inscriptions ouvertes"
            available
          />
          <CalendarItem
            period="Vacances d'été — Session 2"
            dates="14 - 18 juillet"
            status="Inscriptions ouvertes"
            available
          />
          <CalendarItem
            period="Vacances d'été — Session 3"
            dates="21 - 25 juillet"
            status="Complet"
            available={false}
          />
          <CalendarItem
            period="Vacances de la Toussaint"
            dates="20 - 24 octobre"
            status="Ouverture prochaine"
            available
          />
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Infos pratiques
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                <strong className="text-pau-primary">Lieu</strong> — Nouste Camp, 8
                Boulevard de l'Aviation, 64320 Bizanos
              </p>
              <p>
                <strong className="text-pau-primary">À prévoir</strong> — Tenue de
                sport, chaussures de foot (crampons moulés), gourde, casquette
              </p>
              <p>
                <strong className="text-pau-primary">Encadrement</strong> —
                Éducateurs diplômés UEFA, 1 encadrant pour 12 stagiaires
              </p>
              <p>
                <strong className="text-pau-primary">Assurance</strong> — Obligatoire
                (attestation à fournir à l'inscription)
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Inscription
            </h2>
            <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                Les inscriptions se font en ligne ou par email. Nombre de places
                limité à 60 stagiaires par session.
              </p>
              <p>
                <strong className="text-pau-primary">Paiement</strong> — Carte
                bancaire en ligne, chèque ou espèces (sur place)
              </p>
              <p>
                <strong className="text-pau-primary">Annulation</strong> —
                Remboursement intégral jusqu'à 7 jours avant le début du stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Inscrire mon enfant
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Pour inscrire ton enfant à l'un de nos stages, contacte-nous par
            email ou téléphone. Nous te transmettrons le formulaire
            d'inscription et les modalités de paiement.
          </p>

          <div className="mt-8 space-y-4">
            <p className="font-sans text-base text-pau-primary/75">
              Email :{' '}
              <a
                href="mailto:stages@paufc.fr"
                className="text-pau-yellow hover:underline"
              >
                stages@paufc.fr
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
              href="mailto:stages@paufc.fr?subject=Inscription stage Academy"
              className="inline-block bg-pau-yellow px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-night transition-transform hover:scale-105"
            >
              Demander une inscription
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

// Composant Formule Card
function FormuleCard({ title, badge, duration, description, price, priceDetail }) {
  return (
    <div className="border border-gray-200/10 bg-white p-8 md:p-10">
      <span className="inline-block font-mono text-xs uppercase tracking-wider text-pau-yellow">
        {badge}
      </span>
      <h3 className="mt-4 font-display text-4xl uppercase leading-tight tracking-tight text-pau-primary md:text-5xl">
        {title}
      </h3>
      <p className="mt-2 font-mono text-sm uppercase tracking-wider text-pau-primary/60">
        {duration}
      </p>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75">
        {description}
      </p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-5xl text-pau-yellow">{price}</span>
        <span className="font-mono text-sm uppercase tracking-wider text-pau-primary/60">
          {priceDetail}
        </span>
      </div>
    </div>
  );
}

// Composant Program Item
function ProgramItem({ title, description }) {
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

// Composant Calendar Item
function CalendarItem({ period, dates, status, available }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/10 pb-6">
      <div>
        <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-pau-primary md:text-3xl">
          {period}
        </h3>
        <p className="mt-1 font-mono text-sm uppercase tracking-wider text-pau-primary/60">
          {dates}
        </p>
      </div>
      <div>
        <span
          className={`inline-block px-4 py-2 font-mono text-xs uppercase tracking-wider ${
            available
              ? 'bg-pau-yellow/20 text-pau-yellow'
              : 'bg-gray-100 text-pau-primary/40'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

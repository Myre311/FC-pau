import Image from 'next/image';
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
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy-stages.jpg"
          alt="Stages Academy Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Academy · Stages vacances
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Stages Academy
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Des stages intensifs de football pendant les vacances scolaires pour les jeunes de 8 à 16 ans, encadrés par le staff de l'Academy Pau FC.
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
                Le concept
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
                Progresser pendant les vacances
              </h2>
            </div>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
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
        </div>
      </section>

      {/* Formules */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Nos formules
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Choisissez votre formule
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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

          <p className="mt-8 font-sans text-sm text-white/60">
            Réduction de 10% à partir du 2ème enfant inscrit. Réduction de 15%
            pour les abonnés du club.
          </p>
        </div>
      </section>

      {/* Programme */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Programme
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Contenu des stages
            </h2>
          </div>

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
        </div>
      </section>

      {/* Calendrier */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Calendrier
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Dates 2026
            </h2>
          </div>

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
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Pratique
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Infos pratiques
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  <strong className="text-pau-night">Lieu</strong> — Nouste Camp, 8
                  Boulevard de l'Aviation, 64320 Bizanos
                </p>
                <p>
                  <strong className="text-pau-night">À prévoir</strong> — Tenue de
                  sport, chaussures de foot (crampons moulés), gourde, casquette
                </p>
                <p>
                  <strong className="text-pau-night">Encadrement</strong> —
                  Éducateurs diplômés UEFA, 1 encadrant pour 12 stagiaires
                </p>
                <p>
                  <strong className="text-pau-night">Assurance</strong> — Obligatoire
                  (attestation à fournir à l'inscription)
                </p>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Inscription
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Modalités
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  Les inscriptions se font en ligne ou par email. Nombre de places
                  limité à 60 stagiaires par session.
                </p>
                <p>
                  <strong className="text-pau-night">Paiement</strong> — Carte
                  bancaire en ligne, chèque ou espèces (sur place)
                </p>
                <p>
                  <strong className="text-pau-night">Annulation</strong> —
                  Remboursement intégral jusqu'à 7 jours avant le début du stage
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
              Inscription
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Inscrire mon enfant
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              Pour inscrire votre enfant à l'un de nos stages, contactez-nous par
              email ou téléphone. Nous vous transmettrons le formulaire
              d'inscription et les modalités de paiement.
            </p>

            <div className="mt-8 space-y-3 font-sans text-base text-white/70">
              <p>
                Email :{' '}
                <a
                  href="mailto:stages@paufc.fr"
                  className="font-medium text-pau-yellow hover:underline"
                >
                  stages@paufc.fr
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
                href="mailto:stages@paufc.fr?subject=Inscription stage Academy"
                className="inline-block border-2 border-white bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-white"
              >
                Demander une inscription
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

function FormuleCard({ title, badge, duration, description, price, priceDetail }) {
  return (
    <div className="border border-white/10 bg-pau-night p-8 md:p-10">
      <span className="inline-block font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
        {badge}
      </span>
      <h3 className="mt-4 font-display text-3xl font-bold uppercase text-white md:text-4xl">
        {title}
      </h3>
      <p className="mt-2 font-mono text-sm uppercase tracking-wider text-white/60">
        {duration}
      </p>
      <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
        {description}
      </p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-pau-yellow md:text-5xl">{price}</span>
        <span className="font-mono text-sm uppercase tracking-wider text-white/60">
          {priceDetail}
        </span>
      </div>
    </div>
  );
}

function ProgramItem({ title, description }) {
  return (
    <div className="border-l-4 border-pau-yellow pl-6 md:pl-10">
      <h3 className="font-display text-2xl font-bold uppercase text-pau-night md:text-3xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
        {description}
      </p>
    </div>
  );
}

function CalendarItem({ period, dates, status, available }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
          {period}
        </h3>
        <p className="mt-1 font-mono text-sm uppercase tracking-wider text-white/60">
          {dates}
        </p>
      </div>
      <div>
        <span
          className={`inline-block px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider ${
            available
              ? 'bg-pau-yellow/20 text-pau-yellow'
              : 'bg-white/10 text-white/40'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

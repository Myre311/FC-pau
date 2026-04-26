import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Academy · Formation',
  description:
    'L\'Academy du Pau FC forme les talents de demain. Pôle féminin, masculin, stages et intégration : découvrez notre centre de formation.',
};

export default function AcademyPage() {
  return (
    <article>
      {/* Hero */}
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Academy · Formation · Excellence</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px]">
          PAU FC <span className="text-jaune">ACADEMY</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Former, faire grandir, valoriser. L'Academy du Pau FC accompagne les
          jeunes talents béarnais vers le haut niveau, dans un cadre exigeant
          et bienveillant.
        </p>
      </section>

      {/* Mission */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Notre mission
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
            <p>
              L'Academy du Pau FC s'inscrit dans le projet global du club :
              détecter, former et accompagner les jeunes joueurs et joueuses
              vers le football professionnel ou de haut niveau amateur.
            </p>
            <p>
              Depuis sa création, l'Academy a vu passer des dizaines de joueurs
              qui ont rejoint des clubs de Ligue 1, Ligue 2 ou des championnats
              étrangers. La philosophie est claire : un encadrement
              professionnel, un suivi scolaire rigoureux, et une éthique basée
              sur le respect et le dépassement de soi.
            </p>
            <p>
              Au-delà du terrain, l'Academy prépare les jeunes à devenir des
              adultes responsables et autonomes, capables de construire un
              projet de vie équilibré.
            </p>
          </div>
        </div>
      </section>

      {/* Pôles */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Nos pôles
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Pôle Masculin */}
          <PoleTile
            title="Pôle Masculin"
            description="U13 à U19 · Préformation et formation · Championnat National · Suivi scolaire renforcé · Internat."
            href="/academy/masculin"
            badge="Garçons"
          />

          {/* Pôle Féminin */}
          <PoleTile
            title="Pôle Féminin"
            description="U13 à U19 · Formation féminine · Championnat régional et national · Projet sportif en développement."
            href="/academy/feminin"
            badge="Filles"
          />
        </div>
      </section>

      {/* Rejoindre l'Academy */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Intégrer l&apos;Academy
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Tu as entre 12 et 18 ans, tu es passionné(e) de football et tu
              veux progresser dans un environnement professionnel ? Découvre
              comment rejoindre l'Academy du Pau FC.
            </p>
            <div className="mt-8">
              <Link
                href="/academy/integrer"
                className="inline-block bg-jaune px-6 py-3 font-mono text-sm uppercase tracking-wider text-nuit transition-transform hover:scale-105"
              >
                Candidater
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Stages Academy
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
              Des stages intensifs pendant les vacances scolaires pour les
              jeunes de 8 à 16 ans : technique, tactique, physique et mental,
              encadrés par le staff de l'Academy.
            </p>
            <div className="mt-8">
              <Link
                href="/academy/stages"
                className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc transition-colors hover:border-jaune hover:text-jaune"
              >
                Voir les stages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Nos valeurs
        </h2>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <ValeurCard
            title="Excellence"
            description="Nous visons le plus haut niveau sportif tout en maintenant un équilibre scolaire et personnel."
          />
          <ValeurCard
            title="Respect"
            description="Respect des éducateurs, des coéquipiers, des adversaires et des règles du jeu."
          />
          <ValeurCard
            title="Engagement"
            description="Travail, rigueur, dépassement de soi et esprit d'équipe sont au cœur de notre projet."
          />
        </div>
      </section>

      {/* Contact */}
      <section className="container-fc border-t border-blanc/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
            Contact Academy
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-blanc/75 md:text-lg">
            Pour toute question sur l'Academy, les pôles, les stages ou les
            candidatures :
          </p>
          <div className="mt-6 space-y-3 font-sans text-base text-blanc/75">
            <p>
              Email :{' '}
              <a
                href="mailto:academy@paufc.fr"
                className="text-jaune hover:underline"
              >
                academy@paufc.fr
              </a>
            </p>
            <p>
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-jaune hover:underline">
                +33 5 59 00 00 00
              </a>
            </p>
            <p>
              Adresse : Nouste Camp, 8 Boulevard de l&apos;Aviation, 64320
              Bizanos
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant Pôle Tile
function PoleTile({ title, description, href, badge }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden border border-blanc/10 bg-primaire p-8 transition-all hover:border-jaune md:p-10"
    >
      <span className="mb-4 inline-block font-mono text-xs uppercase tracking-wider text-jaune">
        {badge}
      </span>
      <h3 className="font-display text-4xl uppercase leading-tight tracking-tight text-blanc transition-colors group-hover:text-jaune md:text-5xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-blanc/75">
        {description}
      </p>
      <div className="mt-6 font-mono text-sm uppercase tracking-wider text-blanc transition-colors group-hover:text-jaune">
        En savoir plus →
      </div>
    </Link>
  );
}

// Composant Valeur Card
function ValeurCard({ title, description }) {
  return (
    <div className="border-l-2 border-jaune pl-6">
      <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-blanc">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-blanc/75">
        {description}
      </p>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const metadata = {
  title: 'Academy · Formation',
  description:
    'L\'Academy du Pau FC forme les talents de demain. Pôle féminin, masculin, stages et intégration : découvrez notre centre de formation.',
};

export default function AcademyPage() {
  return (
    <article>
      <PageHero
        image="/images/hero-academy.jpg"
        surtitle="Academy · Formation · Excellence"
        title="PAU FC ACADEMY"
        subtitle="Former, faire grandir, valoriser. L'Academy du Pau FC accompagne les jeunes talents béarnais vers le haut niveau, dans un cadre exigeant et bienveillant."
      />

      <SectionLight>

      {/* Mission */}
      <section className="py-12 md:py-20">
        <ScrollReveal>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
              Notre mission
            </h2>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
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
        </ScrollReveal>
      </section>

      {/* Pôles */}
      <section className="border-t border-pau-primary/10 py-12 md:py-20">
        <ScrollReveal>
          <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
            Nos pôles
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Pôle Masculin */}
          <ScrollReveal delay={0}>
            <PoleTile
              title="Pôle Masculin"
              description="U13 à U19 · Préformation et formation · Championnat National · Suivi scolaire renforcé · Internat."
              href="/academy/masculin"
            />
          </ScrollReveal>

          {/* Pôle Féminin */}
          <ScrollReveal delay={100}>
            <PoleTile
              title="Pôle Féminin"
              description="U13 à U19 · Formation féminine · Championnat régional et national · Projet sportif en développement."
              href="/academy/feminin"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Rejoindre l'Academy */}
      <section className="border-t border-pau-primary/10 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <ScrollReveal delay={0}>
            <div>
              <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
                Intégrer l&apos;Academy
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
                Vous avez entre 12 et 18 ans, vous êtes passionné(e) de football et vous
                souhaitez progresser dans un environnement professionnel ? Découvrez
                comment rejoindre l'Academy du Pau FC.
              </p>
              <div className="mt-8">
                <Link
                  href="/academy/integrer"
                  className="inline-block bg-pau-yellow px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-night transition-transform hover:scale-105"
                >
                  Candidater
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div>
              <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
                Stages Academy
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
                Des stages intensifs pendant les vacances scolaires pour les
                jeunes de 8 à 16 ans : technique, tactique, physique et mental,
                encadrés par le staff de l'Academy.
              </p>
              <div className="mt-8">
                <Link
                  href="/academy/stages"
                  className="inline-block border border-gray-200 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:bg-gray-50"
                >
                  Voir les stages
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-t border-pau-primary/10 py-12 md:py-20">
        <ScrollReveal>
          <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
            Nos valeurs
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <ScrollReveal delay={0}>
            <ValeurCard
              title="Excellence"
              description="Nous visons le plus haut niveau sportif tout en maintenant un équilibre scolaire et personnel."
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <ValeurCard
              title="Respect"
              description="Respect des éducateurs, des coéquipiers, des adversaires et des règles du jeu."
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ValeurCard
              title="Engagement"
              description="Travail, rigueur, dépassement de soi et esprit d'équipe sont au cœur de notre projet."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-pau-primary/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
            Contact Academy
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Pour toute question sur l'Academy, les pôles, les stages ou les
            candidatures :
          </p>
          <div className="mt-6 space-y-3 font-sans text-base text-pau-primary/75">
            <p>
              Email :{' '}
              <a
                href="mailto:academy@paufc.fr"
                className="text-pau-yellow hover:underline"
              >
                academy@paufc.fr
              </a>
            </p>
            <p>
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-pau-yellow hover:underline">
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
      </SectionLight>
    </article>
  );
}

// Composant Pôle Tile
function PoleTile({ title, description, href }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden border border-gray-200 bg-white p-8 transition-all hover:bg-gray-50 md:p-10"
    >
      <h3 className="font-display text-4xl uppercase leading-tight tracking-tight text-pau-primary md:text-5xl">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75">
        {description}
      </p>
      <div className="mt-6 font-mono text-sm uppercase tracking-wider transition-colors group-hover:text-pau-yellow">
        En savoir plus →
      </div>
    </Link>
  );
}

// Composant Valeur Card
function ValeurCard({ title, description }) {
  return (
    <div className="border-l-2 border-pau-yellow pl-6">
      <h3 className="font-display text-3xl uppercase leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75">
        {description}
      </p>
    </div>
  );
}

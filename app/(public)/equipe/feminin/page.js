import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Équipe Féminine',
  description:
    'L\'équipe féminine du Pau FC. Découvrez le pôle féminin et son effectif.',
};

export default function EquipeFemininPage() {
  return (
    <>
      <PageHero
        image="/images/hero-equipe-feminin.jpg"
        surtitle="Football Féminin · Saison 2025-2026"
        title="ÉQUIPE FÉMININE"
        subtitle="Le pôle féminin du Pau FC, engagé pour le développement du football féminin béarnais."
      />

      <SectionLight>
        {/* Présentation */}
        <section className="container-fc py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Le projet féminin
            </h2>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              <p>
                Le Pau FC développe un pôle féminin ambitieux avec pour objectif de
                porter haut les couleurs du club et de la région.
              </p>
              <p>
                Encadrées par un staff diplômé et passionné, nos joueuses évoluent
                dans un environnement professionnel avec des installations de
                premier plan au Nouste Camp.
              </p>
              <p>
                Le projet s'articule autour de trois axes : performance sportive,
                formation des jeunes talents et rayonnement du football féminin en
                Béarn.
              </p>
            </div>
          </div>
        </section>

        {/* Objectifs */}
        <section className="container-fc border-t border-pau-primary/10 py-12 md:py-20">
          <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Nos objectifs
          </h2>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            <ObjectifCard
              title="Performance"
              description="Viser les plus hauts sommets du football féminin français avec un collectif compétitif et ambitieux."
            />
            <ObjectifCard
              title="Formation"
              description="Développer les jeunes talents féminines de la région et leur offrir un parcours d'excellence."
            />
            <ObjectifCard
              title="Rayonnement"
              description="Promouvoir le football féminin en Béarn et servir de modèle pour les jeunes générations."
            />
          </div>
        </section>

        {/* Rejoindre */}
        <section className="container-fc border-t border-pau-primary/10 py-12 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
              Rejoindre l&apos;équipe féminine
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
              Le pôle féminin du Pau FC recrute des joueuses motivées et
              talentueuses. Si tu as entre 16 et 25 ans et que tu souhaites
              t&apos;investir dans un projet ambitieux, contacte-nous.
            </p>

            <div className="mt-8 space-y-4">
              <p className="font-sans text-base text-pau-primary/75">
                Email :{' '}
                <a
                  href="mailto:feminin@paufc.fr"
                  className="text-pau-yellow hover:underline"
                >
                  feminin@paufc.fr
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
                href="mailto:feminin@paufc.fr?subject=Candidature équipe féminine"
                className="inline-block bg-pau-yellow px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-night transition-transform hover:scale-105"
              >
                Candidater
              </a>
              <a
                href="/equipe"
                className="inline-block border border-gray-200 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:bg-gray-50"
              >
                Retour Équipe
              </a>
            </div>
          </div>
        </section>
      </SectionLight>
    </>
  );
}

// Composant Objectif Card
function ObjectifCard({ title, description }) {
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

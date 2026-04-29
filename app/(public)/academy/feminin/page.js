import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'PÃ´le FÃ©minin Â· Academy',
  description:
    'Le pÃ´le fÃ©minin de l\'Academy Pau FC forme les jeunes joueuses de 12 Ã  18 ans dans un cadre professionnel et bienveillant.',
};

export default function PoleFemininPage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy-feminin.jpg"
          alt="PÃ´le FÃ©minin Academy Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Academy Â· Filles
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              PÃ´le FÃ©minin
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Former les joueuses de demain. Le pÃ´le fÃ©minin de l'Academy Pau FC
              accompagne les jeunes filles passionnÃ©es de football vers le haut
              niveau.
            </p>
          </div>
        </div>
      </section>

      {/* PrÃ©sentation */}
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
                Le pÃ´le fÃ©minin du Pau FC s'inscrit dans le dÃ©veloppement du
                football fÃ©minin en BÃ©arn et en Nouvelle-Aquitaine. LancÃ© il y a
                quelques annÃ©es, il accueille aujourd'hui des joueuses de U13 Ã 
                U19 dans un environnement professionnel et structurÃ©.
              </p>
              <p>
                Nos joueuses Ã©voluent en championnats rÃ©gionaux et nationaux selon
                leur catÃ©gorie d'Ã¢ge. L'objectif est double : progresser
                techniquement et tactiquement, tout en maintenant un parcours
                scolaire de qualitÃ©.
              </p>
              <p>
                Le staff technique est composÃ© d'entraÃ®neurs diplÃ´mÃ©s, spÃ©cialisÃ©s
                dans la formation fÃ©minine. Un suivi individualisÃ© est proposÃ© Ã 
                chaque joueuse pour l'aider Ã  atteindre ses objectifs sportifs et
                personnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CatÃ©gories */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Nos catÃ©gories
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              De U13 Ã  U19
            </h2>
          </div>

          <div className="space-y-8">
            <CategoryItem
              title="U13 Â· U14 Â· U15"
              description="Initiation au haut niveau Â· Apprentissage des fondamentaux techniques et tactiques Â· Encadrement bienveillant Â· Championnat rÃ©gional."
            />
            <CategoryItem
              title="U16 Â· U17"
              description="Perfectionnement Â· Intensification du volume d'entraÃ®nement Â· CompÃ©titions rÃ©gionales et nationales Â· Suivi renforcÃ© (physique, mental, nutrition)."
            />
            <CategoryItem
              title="U18 Â· U19"
              description="PrÃ©paration au haut niveau amateur ou professionnel Â· Championnat national Â· Lien avec l'Ã©quipe senior fÃ©minine Â· Projet post-formation (universitÃ©, club professionnel)."
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
                  <strong className="text-pau-night">Staff technique</strong> â€”
                  EntraÃ®neurs diplÃ´mÃ©s UEFA B/A, spÃ©cialisÃ©s football fÃ©minin.
                </p>
                <p>
                  <strong className="text-pau-night">PrÃ©paration physique</strong> â€”
                  Programme adaptÃ© Ã  chaque catÃ©gorie d'Ã¢ge.
                </p>
                <p>
                  <strong className="text-pau-night">Suivi mÃ©dical</strong> â€” MÃ©decin
                  du sport, kinÃ©sithÃ©rapeutes.
                </p>
                <p>
                  <strong className="text-pau-night">Suivi scolaire</strong> â€”
                  Partenariats avec des Ã©tablissements locaux pour amÃ©nagement
                  horaires.
                </p>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Infrastructures
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Ã‰quipements
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
                <p>
                  <strong className="text-pau-night">Terrains</strong> â€” AccÃ¨s aux
                  terrains du Nouste Camp et installations annexes.
                </p>
                <p>
                  <strong className="text-pau-night">Vestiaires</strong> â€” Espaces
                  dÃ©diÃ©s au pÃ´le fÃ©minin.
                </p>
                <p>
                  <strong className="text-pau-night">Salle de musculation</strong> â€”
                  Ã‰quipements professionnels.
                </p>
                <p>
                  <strong className="text-pau-night">Salle vidÃ©o</strong> â€” Analyse
                  tactique et dÃ©briefing.
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
              IntÃ©grer le pÃ´le fÃ©minin
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              Vous avez entre 12 et 18 ans, vous Ãªtes passionnÃ©e de football et vous souhaitez
              intÃ©grer un projet ambitieux ? DÃ©couvrez comment candidater au pÃ´le
              fÃ©minin de l'Academy Pau FC.
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

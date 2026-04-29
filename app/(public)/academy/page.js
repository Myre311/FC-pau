import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Academy â€” Pau FC',
  description:
    'L\'Academy du Pau FC forme les talents de demain. PÃ´le fÃ©minin, masculin, stages et intÃ©gration : dÃ©couvrez notre centre de formation.',
};

export default function AcademyPage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy.jpg"
          alt="Academy Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Formation Â· Excellence
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Pau FC Academy
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Former, faire grandir, valoriser. L'Academy accompagne les jeunes talents vers le haut niveau.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Notre mission
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
                Former les talents de demain
              </h2>
            </div>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
              <p>
                L'Academy du Pau FC s'inscrit dans le projet global du club :
                dÃ©tecter, former et accompagner les jeunes joueurs et joueuses
                vers le football professionnel ou de haut niveau amateur.
              </p>
              <p>
                Depuis sa crÃ©ation, l'Academy a vu passer des dizaines de joueurs
                qui ont rejoint des clubs de Ligue 1, Ligue 2 ou des championnats
                Ã©trangers. La philosophie est claire : un encadrement
                professionnel, un suivi scolaire rigoureux, et une Ã©thique basÃ©e
                sur le respect et le dÃ©passement de soi.
              </p>
              <p>
                Au-delÃ  du terrain, l'Academy prÃ©pare les jeunes Ã  devenir des
                adultes responsables et autonomes, capables de construire un
                projet de vie Ã©quilibrÃ©.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PÃ´les */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Nos pÃ´les
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Deux pÃ´les d'excellence
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/academy/masculin"
              className="group border border-white/10 bg-pau-night p-8 transition-all hover:border-pau-yellow md:p-10"
            >
              <h3 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
                PÃ´le Masculin
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                U13 Ã  U19 Â· PrÃ©formation et formation Â· Championnat National Â· Suivi scolaire renforcÃ© Â· Internat
              </p>
              <div className="mt-6 font-mono text-sm uppercase tracking-wider text-pau-yellow transition-colors">
                En savoir plus â†’
              </div>
            </Link>

            <Link
              href="/academy/feminin"
              className="group border border-white/10 bg-pau-night p-8 transition-all hover:border-pau-yellow md:p-10"
            >
              <h3 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
                PÃ´le FÃ©minin
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                U13 Ã  U19 Â· Formation fÃ©minine Â· Championnat rÃ©gional et national Â· Projet sportif en dÃ©veloppement
              </p>
              <div className="mt-6 font-mono text-sm uppercase tracking-wider text-pau-yellow transition-colors">
                En savoir plus â†’
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Rejoindre + Stages */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Candidature
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                IntÃ©grer l'Academy
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-pau-night/70">
                Vous avez entre 12 et 18 ans, vous Ãªtes passionnÃ©(e) de football et vous
                souhaitez progresser dans un environnement professionnel ? DÃ©couvrez
                comment rejoindre l'Academy du Pau FC.
              </p>
              <div className="mt-8">
                <Link
                  href="/academy/integrer"
                  className="inline-block border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
                >
                  Candidater
                </Link>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Vacances scolaires
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Stages Academy
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-pau-night/70">
                Des stages intensifs pendant les vacances scolaires pour les
                jeunes de 8 Ã  16 ans : technique, tactique, physique et mental,
                encadrÃ©s par le staff de l'Academy.
              </p>
              <div className="mt-8">
                <Link
                  href="/academy/stages"
                  className="inline-block border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
                >
                  Voir les stages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Nos valeurs
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Ce qui nous guide
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="border-l-4 border-pau-yellow pl-6">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                Excellence
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Nous visons le plus haut niveau sportif tout en maintenant un Ã©quilibre scolaire et personnel.
              </p>
            </div>

            <div className="border-l-4 border-pau-yellow pl-6">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                Respect
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Respect des Ã©ducateurs, des coÃ©quipiers, des adversaires et des rÃ¨gles du jeu.
              </p>
            </div>

            <div className="border-l-4 border-pau-yellow pl-6">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                Engagement
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Travail, rigueur, dÃ©passement de soi et esprit d'Ã©quipe sont au cÅ“ur de notre projet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Contact
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Une question ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-pau-night/70">
              Pour toute question sur l'Academy, les pÃ´les, les stages ou les candidatures
            </p>

            <div className="mt-8 space-y-3 font-sans text-base text-pau-night/70">
              <p>
                Email :{' '}
                <a
                  href="mailto:academy@paufc.fr"
                  className="font-medium text-pau-yellow hover:underline"
                >
                  academy@paufc.fr
                </a>
              </p>
              <p>
                TÃ©lÃ©phone :{' '}
                <a
                  href="tel:+33559000000"
                  className="font-medium text-pau-yellow hover:underline"
                >
                  +33 5 59 00 00 00
                </a>
              </p>
              <p className="text-sm">
                Nouste Camp, 8 Boulevard de l'Aviation, 64320 Bizanos
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

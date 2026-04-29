import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'PÃ´le Masculin â€” Academy Pau FC',
  description:
    'Le pÃ´le masculin de l\'Academy Pau FC forme les jeunes joueurs de 12 Ã  19 ans. PrÃ©formation, formation, internat, suivi scolaire renforcÃ©.',
};

export default function PoleMasculinPage() {
  return (
    <article>
      {/* Hero */}
      <section className="relative min-h-[400px] overflow-hidden bg-pau-night md:h-[60vh] md:min-h-[500px]">
        <Image
          src="/images/hero-academy.jpg"
          alt="PÃ´le Masculin Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Academy Â· GarÃ§ons
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              PÃ´le Masculin
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Former les talents bÃ©arnais vers le football professionnel depuis plus de 20 ans
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
                Excellence et formation
              </h2>
            </div>
            <div className="space-y-5 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
              <p>
                Le pÃ´le masculin du Pau FC accueille chaque saison une
                cinquantaine de joueurs, de la catÃ©gorie U13 Ã  U19. Le projet
                s'articule autour de trois piliers : excellence sportive, rÃ©ussite
                scolaire, dÃ©veloppement personnel.
              </p>
              <p>
                Nos Ã©quipes Ã©voluent en championnats rÃ©gionaux et nationaux. Les
                joueurs les plus performants intÃ¨grent le groupe professionnel
                dÃ¨s 17-18 ans, suivant un parcours de progression individualisÃ©.
              </p>
              <p>
                Au fil des annÃ©es, l'Academy a vu partir des dizaines de joueurs
                vers des clubs de Ligue 1, Ligue 2 et championnats Ã©trangers. Le
                Pau FC s'affirme comme un club formateur reconnu en
                Nouvelle-Aquitaine.
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
              CatÃ©gories
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              De U13 Ã  U19
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-pau-yellow bg-pau-night p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                U13 Â· U14 Â· U15 â€” PrÃ©formation
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                DÃ©tection et apprentissage des fondamentaux. Technique individuelle, culture tactique de base, initiation au jeu collectif. Championnat rÃ©gional. EntraÃ®nements 3 Ã  4 fois par semaine.
              </p>
            </div>

            <div className="border-l-4 border-pau-yellow bg-pau-night p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                U16 Â· U17 â€” Formation
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Intensification du volume d'entraÃ®nement (5 Ã  6 sÃ©ances/semaine). Championnats nationaux U17. Suivi renforcÃ© : physique, mental, nutrition. PossibilitÃ© d'internat au Nouste Camp.
              </p>
            </div>

            <div className="border-l-4 border-pau-yellow bg-pau-night p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold uppercase text-white md:text-3xl">
                U18 Â· U19 â€” Accession pro
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                PrÃ©paration au football professionnel. Championnat National U19. EntraÃ®nements avec le groupe pro selon les profils. Projet post-formation (signature pro, universitÃ©, club Ã©tranger).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internat + ScolaritÃ© */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                HÃ©bergement
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                Internat
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70">
                <p>
                  L'Academy dispose d'un internat au sein du complexe du Nouste
                  Camp. Les joueurs en provenance de l'extÃ©rieur du dÃ©partement
                  peuvent y rÃ©sider toute la semaine.
                </p>
                <p>
                  <strong className="text-pau-night">HÃ©bergement</strong> â€” Chambres
                  doubles ou individuelles, accÃ¨s WiFi.
                </p>
                <p>
                  <strong className="text-pau-night">Restauration</strong> â€”
                  Petit-dÃ©jeuner, dÃ©jeuner, dÃ®ner. Menus Ã©quilibrÃ©s adaptÃ©s aux
                  besoins sportifs.
                </p>
                <p>
                  <strong className="text-pau-night">Encadrement</strong> â€”
                  Ã‰ducateurs prÃ©sents 24/7. RÃ¨glement intÃ©rieur strict.
                </p>
              </div>
            </div>

            <div className="border border-pau-primary/10 bg-pau-primary/5 p-8 md:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
                Ã‰tudes
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-pau-night md:text-4xl">
                ScolaritÃ©
              </h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-pau-night/70">
                <p>
                  L'Academy a nouÃ© des partenariats avec des Ã©tablissements
                  scolaires locaux pour permettre un amÃ©nagement horaires optimal.
                </p>
                <p>
                  <strong className="text-pau-night">CollÃ¨ge</strong> â€” Cours le
                  matin, entraÃ®nements l'aprÃ¨s-midi.
                </p>
                <p>
                  <strong className="text-pau-night">LycÃ©e</strong> â€” Sections
                  sportives. Bac gÃ©nÃ©ral, technologique ou professionnel.
                </p>
                <p>
                  <strong className="text-pau-night">Ã‰tudes</strong> â€” Salle de
                  travail dÃ©diÃ©e avec accompagnement scolaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="border-y border-white/10 bg-pau-primary py-14 md:py-20">
        <div className="container-pau">
          <div className="mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Encadrement
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Un staff professionnel
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-white/10 bg-pau-night p-6">
              <h3 className="font-display text-2xl font-bold uppercase text-pau-yellow md:text-3xl">
                Staff technique
              </h3>
              <ul className="mt-4 space-y-2 font-sans text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>EntraÃ®neurs diplÃ´mÃ©s UEFA Pro/A/B</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Coordinateur formation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Analystes vidÃ©o</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>EntraÃ®neurs des gardiens</span>
                </li>
              </ul>
            </div>

            <div className="border border-white/10 bg-pau-night p-6">
              <h3 className="font-display text-2xl font-bold uppercase text-pau-yellow md:text-3xl">
                Staff mÃ©dical
              </h3>
              <ul className="mt-4 space-y-2 font-sans text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>MÃ©decin du sport</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>KinÃ©sithÃ©rapeutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>PrÃ©parateurs physiques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Psychologue du sport</span>
                </li>
              </ul>
            </div>

            <div className="border border-white/10 bg-pau-night p-6">
              <h3 className="font-display text-2xl font-bold uppercase text-pau-yellow md:text-3xl">
                Suivi global
              </h3>
              <ul className="mt-4 space-y-2 font-sans text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Responsable scolaritÃ©</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Nutritionniste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Ã‰ducateurs internat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 bg-pau-yellow" />
                  <span>Coordinateur administratif</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pau-yellow">
              Rejoignez-nous
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              IntÃ©grer le pÃ´le masculin
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-pau-night/70">
              Vous avez entre 12 et 18 ans et vous souhaitez intÃ©grer un centre de formation reconnu ?
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/academy/integrer"
                className="inline-block border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
              >
                Candidater
              </Link>
              <Link
                href="/academy"
                className="inline-block border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
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

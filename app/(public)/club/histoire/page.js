import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Histoire du club',
  description:
    'Les grandes dates et moments clés de l\'histoire du Pau FC depuis sa fondation en 1920.',
};

export default function HistoirePage() {
  return (
    <article>
      <PageHero
        image="/images/hero-histoire.jpg"
        surtitle="Le Club · Histoire"
        title="105 ans d'histoire"
        subtitle="Plus d'un siècle d'histoire paloise. Des racines amateurs béarnaises aux ambitions professionnelles actuelles, retour sur les moments qui ont forgé l'identité du club."
      />

      {/* Pull quote */}
      <SectionLight>
        <blockquote className="relative border-l-4 border-[#FFD60A] bg-[#FFD60A]/5 px-10 py-12 md:px-16 md:py-16">
          <svg
            className="absolute left-8 top-8 h-12 w-12 text-[#FFD60A]/20 md:h-16 md:w-16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <p className="relative z-10 font-display text-[clamp(24px,4vw,40px)] uppercase leading-crush-medium tracking-display-base text-[#0F1E45]">
            « Un club ancré en Béarn, <span className="text-[#FFD60A]">porté par ses supporters</span> et ouvert sur l'avenir. »
          </p>
          <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F1E45]/60">
            — Devise officielle du Pau FC
          </footer>
        </blockquote>
      </SectionLight>

      {/* Timeline premium */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <h2 className="mb-16 font-display text-[clamp(36px,6vw,64px)] uppercase leading-crush-medium tracking-display-tight text-[#0F1E45]">
          Dates <span className="text-[#FFD60A]">clés</span>
        </h2>

        <div className="relative space-y-20">
          {/* Ligne verticale continue */}
          <div className="absolute left-[99px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#FFD60A]/30 to-transparent md:block" />

          <TimelineItemPremium
            year="1920"
            title="Fondation du club"
            description="Création du Pau Football Club par des passionnés béarnais. Le club évolue en championnats régionaux amateurs pendant plusieurs décennies."
            stat="1"
            statLabel="Siècle d'histoire"
          />

          <TimelineItemPremium
            year="1974"
            title="Premier titre national amateur"
            description="Le Pau FC remporte le championnat de France amateur et accède pour la première fois à un niveau semi-professionnel."
          />

          <TimelineItemPremium
            year="2000-2010"
            title="Professionnalisation"
            description="Le club change de statut et devient société sportive professionnelle. Début d'un projet structuré autour de la formation et de la montée en puissance sportive."
          />

          <TimelineItemPremium
            year="2019"
            title="Montée en Ligue 2"
            description="Victoire en National et accession à la Ligue 2 BKT, deuxième division française. Le Pau FC retrouve le football professionnel de haut niveau après plusieurs décennies."
            stat="50+"
            statLabel="Années d'attente"
          />

          <TimelineItemPremium
            year="2020"
            title="Centenaire"
            description="Le club célèbre ses 100 ans d'histoire. Une saison symbolique malgré le contexte sanitaire, marquée par la fierté d'un siècle d'ancrage béarnais."
            stat="100"
            statLabel="Ans"
          />

          <TimelineItemPremium
            year="2024"
            title="Plan stratégique 2024-2028"
            description="Le Pau FC dévoile son projet à moyen terme : infrastructures modernisées (nouvelle tribune Béarn), académie renforcée, objectif de maintien solide en Ligue 2 et ambition de montée vers l'élite."
          />

          <TimelineItemPremium
            year="2026"
            title="Aujourd'hui"
            description="Le Pau FC évolue en Ligue 2 BKT avec une identité revendiquée : un club formateur, ancré en Béarn, porté par ses supporters et ouvert sur l'avenir."
            isCurrent
            stat="15k"
            statLabel="Supporters"
          />
        </div>
      </SectionLight>

      {/* CTA Grid */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          <div className="group relative overflow-hidden border border-[#0F1E45]/10 bg-gradient-to-br from-[#1A1D38]/10 to-[#0F1E45]/5 p-10 transition-all duration-400 hover:border-[#FFD60A]/30 hover:shadow-card-hover md:p-12">
            <span className="absolute right-4 top-4 font-display text-[100px] leading-none text-[#0F1E45]/5">?</span>
            <h2 className="relative z-10 font-display text-[clamp(32px,5vw,52px)] uppercase leading-crush tracking-display-tight text-[#0F1E45]">
              Découvrir<br />le club
            </h2>
            <p className="relative z-10 mt-6 font-sans text-[15px] leading-relaxed text-[#0F1E45]/85">
              Plongez dans l'univers du Pau FC : effectif, calendrier,
              actualités, espace partenaires.
            </p>
            <div className="relative z-10 mt-10 flex flex-wrap gap-3">
              <Link href="/club">
                <Button variant="primary" size="md" cornerCut className="btn-ripple">
                  Présentation
                </Button>
              </Link>
              <Link href="/equipe">
                <Button variant="ghost" size="md" className="btn-ripple">
                  Effectif
                </Button>
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#0F1E45]/10 bg-gradient-to-br from-[#1A1D38]/10 to-[#0F1E45]/5 p-10 transition-all duration-400 hover:border-[#FFD60A]/30 hover:shadow-card-hover md:p-12">
            <span className="absolute right-4 top-4 font-display text-[100px] leading-none text-[#0F1E45]/5"></span>
            <h2 className="relative z-10 font-display text-[clamp(32px,5vw,52px)] uppercase leading-crush tracking-display-tight text-[#0F1E45]">
              Nouste<br />Camp
            </h2>
            <p className="relative z-10 mt-6 font-sans text-[15px] leading-relaxed text-[#0F1E45]/85">
              Découvrez le stade du Pau FC, son histoire, ses travaux de
              modernisation et comment venir assister aux matchs.
            </p>
            <div className="relative z-10 mt-10">
              <Link href="/nouste-camp">
                <Button variant="ghost" size="md" className="btn-ripple">
                  Le stade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionLight>
    </article>
  );
}

// Timeline item premium avec stats inline
function TimelineItemPremium({ year, title, description, isCurrent = false, stat, statLabel }) {
  return (
    <div className="group grid gap-8 md:grid-cols-[200px_1fr] md:gap-16">
      {/* Année + dot */}
      <div className="relative">
        {/* Dot sur la ligne verticale (desktop uniquement) */}
        <div className="absolute -right-[101px] top-8 hidden h-3 w-3 rounded-full border-2 border-[#FFD60A] bg-white transition-transform md:block group-hover:scale-150" />

        <div
          className={`font-display text-[clamp(56px,8vw,88px)] uppercase leading-none tracking-display-tight transition-colors ${
            isCurrent ? 'text-[#FFD60A]' : 'text-[#0F1E45]/40 group-hover:text-[#0F1E45]/70'
          }`}
        >
          {year}
        </div>
        {isCurrent && (
          <span className="mt-3 inline-block animate-pulse-dot font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFD60A]">
            → Aujourd'hui
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="border-l-2 border-[#0F1E45]/10 pl-8 transition-colors group-hover:border-[#FFD60A]/30 md:pl-12">
        <h3 className="font-display text-[clamp(28px,4vw,44px)] uppercase leading-crush-soft tracking-display-base text-[#0F1E45]">
          {title}
        </h3>
        <p className="mt-5 max-w-2xl font-sans text-[16px] leading-relaxed text-[#0F1E45]/85">
          {description}
        </p>
        {stat && (
          <div className="mt-6 inline-flex items-baseline gap-2">
            <span className="font-display text-[36px] leading-none text-[#FFD60A]">{stat}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1E45]/60">{statLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

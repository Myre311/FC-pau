import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { MatchCountdown } from '@/components/vitrine/MatchCountdown';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'FC Pau — Club de football professionnel',
  description:
    'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.',
};

export default async function HomePage() {
  // Récupérer les 2 prochains matchs à domicile
  const upcomingMatches = await prisma.match
    .findMany({
      where: {
        kickoffAt: { gte: new Date() },
        status: 'scheduled',
      },
      orderBy: { kickoffAt: 'asc' },
      take: 2,
    })
    .catch(() => []);

  return (
    <>
      {/* ─── HERO AVEC VIDEO/IMAGE ──────────────────────────── */}
      <section className="relative overflow-hidden border-b-4 border-jaune">
        {/* Background - vidéo ou image */}
        <div className="absolute inset-0">
          {/* Conteneur vidéo prêt à l'emploi */}
          {/* Pour ajouter une vidéo : remplacer le div suivant par :
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
          */}
          <div className="h-full w-full bg-gradient-to-br from-[#1a1d38] via-[#262646] to-[#04091D]" />
          {/* Overlay pour contraste texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Contenu */}
        <div className="container-pau relative z-10 py-24 text-center md:py-32 lg:py-40">
          <p className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-jaune">
            Saison 2025-2026 · Ligue 2 BKT
          </p>
          <h1 className="mb-6 font-display text-5xl font-black uppercase leading-tight text-blanc md:text-6xl lg:text-7xl">
            Pau Football Club
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blanc/90">
            Soutenez les Sang et Or au Nouste Camp
          </p>
          <Link href="/billetterie" className="inline-flex items-center gap-3 border-2 border-jaune bg-jaune px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-nuit transition-colors hover:bg-nuit hover:border-nuit hover:text-jaune">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Vos places
          </Link>
        </div>
      </section>

      {/* ─── PROCHAINS MATCHS ──────────────────────────── */}
      <section className="section-pau border-t border-blanc/10">
        <div className="container-pau">
          {upcomingMatches.length === 0 ? (
            <div className="card-pau mx-auto max-w-2xl p-10 text-center">
              <p className="text-lead text-blanc/70">
                Aucun match programmé pour le moment. Le calendrier sera mis à jour prochainement.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {upcomingMatches.map((match, idx) => (
                <div
                  key={match.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <MatchCountdown match={match} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PARTENAIRES ──────────────────────────────────────────────── */}
      <section className="section-pau border-y border-blanc/10">
        <div className="container-pau">
          <div className="mb-12">
            <div className="mb-4 h-1 w-16 bg-jaune" />
            <h2 className="font-display text-3xl font-bold uppercase text-blanc md:text-4xl">
              Nos partenaires
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {['Joma', 'Holy', 'Intersport', 'Groupama', 'Sarthou', 'Ville de Pau'].map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center border-2 border-blanc/20 bg-blanc/5 p-6 transition-colors hover:border-jaune hover:bg-blanc/10"
              >
                <span className="font-display text-base font-bold uppercase text-blanc/70">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ──────────────────────────────────────────────── */}
      <section className="section-pau border-t border-jaune/40 bg-nuit">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-block">
              <div className="h-1 w-20 bg-jaune" />
            </div>
            <h2 className="title-section mb-6 text-blanc">
              Restez informé
            </h2>
            <p className="text-lead mb-8 text-blanc/80">
              Recevez les actualités, offres exclusives et informations billetterie directement dans votre boîte mail.
            </p>
            <form className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 rounded-lg border-2 border-blanc/20 bg-blanc/10 px-6 py-4 font-sans text-blanc placeholder-blanc/50 transition-all focus:border-jaune focus:bg-blanc/20 focus:outline-none"
              />
              <button type="submit" className="btn-pau-accent whitespace-nowrap">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


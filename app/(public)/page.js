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
        {/* Background - image/video à remplacer */}
        <div className="absolute inset-0">
          {/* Temporaire : fond bleu avec pattern jusqu'à ajout d'une vraie image/vidéo */}
          <div className="h-full w-full bg-[#1E40AF]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.08'%3E%3Cpath d='M50 25c-1.8 0-3.2 1.4-3.2 3.2 0 1.3.8 2.4 2 2.8-1.1.4-1.8 1.5-1.8 2.7 0 1.6 1.4 3 3 3 .4 0 .9-.1 1.3-.3-.3.7-.4 1.5-.4 2.3 0 3 2.4 5.4 5.4 5.4 1.1 0 2.1-.3 2.9-.9-.2.4-.3.9-.3 1.4 0 1.6 1.4 3 3 3 1.2 0 2.2-.7 2.7-1.8.4 1.1 1.4 1.8 2.5 1.8 1.4 0 2.5-.9 2.9-2.1.4 1.1 1.5 1.8 2.7 1.8 1.6 0 3-1.4 3-3 0-.5-.1-.9-.3-1.4.8.6 1.8.9 2.9.9 3 0 5.4-2.4 5.4-5.4 0-.8-.2-1.6-.4-2.3.4.2.8.3 1.3.3 1.6 0 3-1.4 3-3 0-1.2-.7-2.3-1.8-2.7 1.1-.4 2-1.5 2-2.8 0-1.8-1.4-3.2-3.2-3.2h-23z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            backgroundAttachment: 'fixed'
          }} />
          {/* Overlay pour contraste */}
          <div className="absolute inset-0 bg-nuit/50" />
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
      <section className="section-pau bg-blanc">
        <div className="container-pau">
          {upcomingMatches.length === 0 ? (
            <div className="card-pau mx-auto max-w-2xl p-10 text-center">
              <p className="text-lead">
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
      <section className="section-pau border-y-4 border-gray-300 bg-gray-50">
        <div className="container-pau">
          <div className="mb-12">
            <div className="mb-4 h-1 w-16 bg-jaune" />
            <h2 className="font-display text-3xl font-bold uppercase text-nuit md:text-4xl">
              Nos partenaires
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {['Joma', 'Holy', 'Intersport', 'Groupama', 'Sarthou', 'Ville de Pau'].map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center border-2 border-gray-300 bg-blanc p-6 transition-colors hover:border-jaune"
              >
                <span className="font-display text-base font-bold uppercase text-gray-500">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ──────────────────────────────────────────────── */}
      <section className="section-pau bg-nuit">
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


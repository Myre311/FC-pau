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
      {/* ═══════════════════════ HERO - PROCHAINS MATCHS ═══════════════════════ */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="wrap">
          <div className="mb-12 text-center">
            <p className="badge-mono mb-4">Saison 2025-2026 · Ligue 2 BKT</p>
            <h1 className="font-display text-[clamp(40px,8vw,72px)] uppercase leading-tight tracking-tight text-pau-blue">
              Prochains matchs
            </h1>
          </div>

          {upcomingMatches.length === 0 ? (
            <div className="card mx-auto max-w-2xl p-10 text-center">
              <p className="text-gray-600">
                Aucun match programmé pour le moment. Le calendrier sera mis à jour prochainement.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {upcomingMatches.map((match, idx) => (
                <div
                  key={match.id}
                  className={`animate-fade-up`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <MatchCountdown match={match} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ ACCÈS RAPIDES ═══════════════════════ */}
      <section className="border-y border-gray-200 bg-white py-16">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-3">
            <QuickLink
              href="/billetterie"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Billetterie"
              description="Réservez vos places pour les matchs à domicile"
            />
            <QuickLink
              href="/boutique"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Boutique"
              description="Maillots, accessoires et produits officiels"
            />
            <QuickLink
              href="/calendrier"
              icon={
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Calendrier"
              description="Tous les matchs et résultats de la saison"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ACTUALITÉS ═══════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="wrap">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="badge-mono mb-3">À la une</p>
              <h2 className="font-display text-[clamp(36px,6vw,64px)] uppercase leading-tight text-gray-900">
                Actualités
              </h2>
            </div>
            <Link
              href="/actualites"
              className="link-hover hidden font-display text-sm uppercase tracking-wider text-pau-blue md:inline-flex"
            >
              Toutes les actus →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200" />
                <div className="p-6">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-500">
                    Il y a {i} jour{i > 1 ? 's' : ''}
                  </p>
                  <h3 className="mb-3 font-display text-xl uppercase leading-tight text-gray-900">
                    Article à venir
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Les actualités du club seront affichées ici après le seed de la base de données.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER ═══════════════════════ */}
      <section className="border-y border-gray-200 bg-white py-16">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-display text-[clamp(32px,5vw,48px)] uppercase leading-tight text-gray-900">
              Restez informé
            </h2>
            <p className="mb-8 text-gray-600">
              Recevez les actualités, offres exclusives et informations billetterie directement dans votre boîte mail.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 border-2 border-gray-200 px-4 py-3 font-sans text-sm transition-colors focus:border-pau-blue focus:outline-none"
              />
              <button type="submit" className="btn-primary btn-ripple whitespace-nowrap">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function QuickLink({ href, icon, title, description }) {
  return (
    <Link
      href={href}
      className="group card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-soft"
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-pau-blue transition-all duration-300 group-hover:scale-110 group-hover:from-pau-blue group-hover:to-pau-blue-dark group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 font-display text-2xl uppercase leading-tight text-gray-900">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600">
        {description}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-pau-blue transition-all group-hover:gap-3">
        Accéder
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { HeroCanvas } from '@/components/home/HeroCanvas';
import { TrustBar } from '@/components/home/TrustBar';
import { Marquee } from '@/components/layout/Marquee';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Boutique officielle',
  description:
    'Boutique officielle du Pau FC — maillots, lifestyle, accessoires, configurateur de flocage. Hala Pau · Béarn · 1920.',
};

export default async function HomePage() {
  const featured = await prisma.product
    .findMany({
      where: { status: 'active', featured: true },
      include: {
        category: true,
        variants: { include: { stockItem: true } },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-n4">
        <HeroCanvas />
        {/* Noise + vignette overlays */}
        <span className="hero-noise pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />
        <span className="hero-vignette pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />
        {/* Ligne jaune verticale */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[5] h-full w-[2px] bg-gradient-to-b from-transparent via-jaune to-transparent"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, #FFCC00 18%, #FFCC00 82%, transparent 100%)',
          }}
        />

        <div className="wrap relative z-10 flex flex-1 items-center pt-[110px]">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Hero Left */}
            <div className="max-w-[660px]">
              <p className="mb-[32px] inline-flex items-center gap-2 animate-count-up">
                <span className="h-px w-6 bg-jaune" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jaune/70">
                  Saison 2025-2026 · Boutique Officielle
                </span>
              </p>

              <h1 className="mb-1 font-display text-[clamp(68px,11vw,144px)] uppercase leading-[0.82] tracking-[-0.03em] animate-count-up [animation-delay:.35s]">
                <span className="block text-blanc">Hala</span>
                <span className="block text-shimmer">Pau FC</span>
                <span className="text-ghost block">2025·26</span>
              </h1>

              <span className="my-[26px] block h-[2px] origin-left scale-x-0 bg-jaune animate-slide-x [animation-delay:.9s]" />

              <p className="mb-9 max-w-[420px] font-sans text-[15px] leading-[1.7] text-blanc/50 animate-count-up [animation-delay:1s]">
                Maillots officiels, lifestyle, accessoires, et personnalisation
                en flocage live. La boutique du Pau FC, faite à Pau, faite pour les
                supporters.
              </p>

              <div className="flex flex-wrap gap-3 animate-count-up [animation-delay:1.1s]">
                <Link href="/boutique">
                  <Button variant="primary" size="lg" cornerCut>
                    Voir la boutique
                    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] stroke-current" fill="none" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/boutique/maillot-domicile-2026/personnaliser">
                  <Button variant="ghost" size="lg">
                    Personnaliser un maillot
                  </Button>
                </Link>
              </div>

              <dl className="mt-8 flex gap-9 border-t border-blanc/[0.06] pt-8 animate-count-up [animation-delay:1.2s]">
                <Stat value="2 000+" label="Supporters équipés" />
                <Stat value="100%" label="Officiel club" />
                <Stat value="48h" label="Préparation" />
              </dl>
            </div>

            {/* Hero Right — Jersey card */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:pb-10">
              <JerseyCard />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST BAR ═══════════════════════ */}
      <TrustBar />

      {/* ═══════════════════════ MARQUEE ═══════════════════════ */}
      <Marquee />

      {/* ═══════════════════════ PRODUITS PHARES ═══════════════════════ */}
      <section className="relative bg-gradient-to-b from-n4 to-n2 py-[96px]">
        <div className="wrap">
          <header className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="badge-mono">Top de la saison</p>
              <h2 className="mt-3 font-display text-[clamp(40px,6.5vw,84px)] uppercase leading-[0.86] tracking-[-0.02em]">
                Produits<br />
                <span className="text-jaune">phares</span>
              </h2>
            </div>
            <Link
              href="/boutique"
              className="hidden font-display text-[12px] uppercase tracking-[0.1em] text-blanc/60 transition-colors hover:text-jaune md:inline-flex md:items-center md:gap-2"
            >
              Tout voir
              <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
              </svg>
            </Link>
          </header>

          {featured.length === 0 ? (
            <p className="border border-dashed border-blanc/15 p-10 text-center font-sans text-blanc/60">
              Aucun produit en avant pour le moment. Lance le seed (
              <code className="font-mono text-blanc">npm run db:seed</code>) pour
              peupler la boutique.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════ CONFIGURATEUR TEASER ═══════════════════════ */}
      <section className="relative overflow-hidden py-[96px]" style={{ background: 'linear-gradient(135deg, #080c1a 0%, #1A1D38 50%, #080c1a 100%)' }}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-15px] top-1/2 -translate-y-1/2 select-none font-display text-[clamp(180px,28vw,340px)] leading-none tracking-[-0.05em] text-jaune/[0.022]"
        >
          3D
        </span>
        <div className="wrap relative z-10">
          <div className="grid items-center gap-[72px] lg:grid-cols-2">
            <div>
              <p className="badge-mono">Personnalisation officielle</p>
              <h2 className="mt-4 font-display text-[clamp(40px,6vw,72px)] uppercase leading-[0.86] tracking-[-0.02em]">
                Votre nom.<br />
                <span className="text-jaune">Votre numéro.</span>
              </h2>
              <ul className="my-[26px] mt-6">
                {[
                  'Aperçu 3D temps réel',
                  '3 polices officielles (Club / Stadium / Vintage)',
                  'Flocage thermocollé en atelier Pau',
                  'Production sous 7-10 jours',
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-[13px] border-b border-blanc/[0.04] py-[11px]"
                  >
                    <span className="block h-1 w-1 rounded-full bg-jaune animate-pulse-dot" />
                    <span className="font-sans text-[13.5px] text-blanc/50">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/boutique/maillot-domicile-2026/personnaliser">
                <Button variant="primary" size="lg" cornerCut>
                  Lancer le configurateur 3D
                </Button>
              </Link>
            </div>
            <div className="relative flex h-[390px] items-center justify-center">
              <div className="clip-card-lg relative flex h-full w-full items-center justify-center overflow-hidden border border-jaune/10 bg-gradient-to-br from-[#141728] to-[#0c0f1e]">
                <span className="pointer-events-none absolute inset-0 select-none font-display text-[190px] leading-none tracking-[-0.05em] text-jaune/[0.04]" aria-hidden="true">
                  10
                </span>
                <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
                <div className="relative z-[2] text-center">
                  <p className="font-display text-[42px] uppercase leading-none tracking-[0.1em] text-jaune" style={{ textShadow: '0 0 38px rgba(255,204,0,.28)' }}>
                    DUPONT
                  </p>
                  <p className="font-display text-[108px] leading-[0.92] text-blanc" style={{ textShadow: '0 0 55px rgba(255,255,255,.09)' }}>
                    10
                  </p>
                  <p className="mt-[11px] font-mono text-[9.5px] uppercase tracking-[0.22em] text-blanc/20">
                    PAU · 2025-2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <dt className="font-display text-[26px] leading-none text-jaune">{value}</dt>
      <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/20">
        {label}
      </dd>
    </div>
  );
}

function Corner({ pos }) {
  const styles = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-5 left-3 border-b border-l',
    br: 'bottom-5 right-3 border-b border-r',
  };
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-[18px] w-[18px] border-jaune/20 ${styles[pos]}`}
    />
  );
}

function JerseyCard() {
  return (
    <div className="relative h-[410px] w-[310px] animate-float">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-[50px] animate-glow"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,204,0,0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Card */}
      <div className="clip-card-lg relative h-full w-full overflow-hidden border border-jaune/10 bg-gradient-to-br from-[#1c2342] to-[#0b1020]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-jaune/[0.04] to-transparent to-[52%]"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-[2px] opacity-45"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #FFCC00 35%, transparent 100%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[190px] leading-none tracking-[-0.05em] text-jaune/[0.04]"
        >
          10
        </span>
        <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center">
          <span
            className="font-display text-[74px] leading-none text-jaune"
            style={{ textShadow: '0 0 45px rgba(255,204,0,.32)' }}
          >
            10
          </span>
          <span className="mt-[5px] font-display text-[22px] uppercase tracking-[0.12em] text-blanc">
            DUPONT
          </span>
          <span className="mt-[10px] font-mono text-[9px] uppercase tracking-[0.22em] text-blanc/20">
            PAU FC · MAILLOT DOMICILE
          </span>
        </div>
      </div>
      {/* Badge */}
      <span
        className="clip-mark absolute -right-[7px] -top-[7px] z-20 animate-glow bg-jaune px-[10px] py-[5px] font-display text-[8.5px] uppercase tracking-[0.14em] text-nuit"
      >
        Officiel
      </span>
      {/* Pills bottom */}
      <div className="absolute -bottom-[18px] left-0 right-0 flex gap-[6px]">
        {[
          { v: '89€', l: 'Prix' },
          { v: 'XS-XXL', l: 'Tailles' },
          { v: '48h', l: 'Délai' },
        ].map((p) => (
          <div
            key={p.l}
            className="flex-1 border border-blanc/[0.07] bg-blanc/[0.04] px-[6px] py-[9px] text-center"
          >
            <p className="font-display text-[17px] leading-none text-jaune">{p.v}</p>
            <p className="mt-[2px] font-mono text-[7.5px] uppercase tracking-[0.14em] text-blanc/20">
              {p.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import { PartnerCard } from '@/components/vitrine/PartnerCard';
import {
  PARTNER_TIER_LABELS,
  PARTNER_TIER_ORDER,
} from '@/lib/labels';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Partenaires',
  description:
    'Le Pau FC remercie ses partenaires Premium, Officiels et Locaux qui accompagnent le club dans son développement.',
};

// =====================================================================
// IMPORTANT — Cette page est la SEULE qui utilise la charte dorée
// #CBA74D (token `dore`). Le jaune club (`jaune`) est volontairement
// retiré du chrome pour bien hiérarchiser : ici, on parle d'argent et
// d'engagement long terme, pas d'identité supporter.
// =====================================================================

export default async function PartenairesPage() {
  const partners = await prisma.partner.findMany({
    where: { active: true },
    orderBy: [{ tier: 'asc' }, { position: 'asc' }],
  });

  const grouped = PARTNER_TIER_ORDER.reduce((acc, tier) => {
    acc[tier] = partners.filter((p) => p.tier === tier);
    return acc;
  }, {});

  return (
    <>
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dore">
          Soutiens & Engagements
        </p>
        <h1 className="mt-6 text-[16vw] md:text-[11vw] lg:text-[150px]">
          PARTE<span className="text-dore">NAIRES</span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-blanc/70 md:text-xl">
          Le Pau FC avance avec ses partenaires. Entreprises pionnières,
          institutions béarnaises, marques nationales — chacun contribue à
          écrire la suite du club.
        </p>
      </section>

      {PARTNER_TIER_ORDER.map((tier) => {
        const list = grouped[tier];
        if (!list || list.length === 0) return null;

        const isPremium = tier === 'premium';
        return (
          <section
            key={tier}
            className="container-fc border-t border-dore/15 py-12 md:py-20"
          >
            <header className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dore">
                  {PARTNER_TIER_LABELS[tier]}
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
                  {tier === 'premium'
                    ? 'À nos côtés'
                    : tier === 'officiel'
                      ? 'Avec nous'
                      : 'Le Béarn'}
                </h2>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-dore/60 md:inline">
                {list.length} {list.length > 1 ? 'partenaires' : 'partenaire'}
              </span>
            </header>

            <div
              className={`grid gap-4 ${
                isPremium
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {list.map((p) => (
                <PartnerCard key={p.id} partner={p} tier={tier} />
              ))}
            </div>
          </section>
        );
      })}

      {partners.length === 0 && (
        <section className="container-fc py-24">
          <div className="border border-dashed border-dore/30 p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dore">
              Programme partenaires
            </p>
            <p className="mt-4 font-sans text-blanc/70">
              Devenez partenaire du Pau FC. Pour échanger sur nos offres et
              programmes d&apos;hospitalité, contactez le service partenariats.
            </p>
          </div>
        </section>
      )}

      <section className="container-fc border-t border-dore/15 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dore">
              Devenir partenaire
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
              Rejoignez le club
            </h2>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-blanc/70">
              Visibilité au Nouste Camp, hospitalités sur-mesure, opérations
              co-brandées avec nos joueurs, soutien d&apos;un projet sportif et
              territorial. Nos équipes construisent chaque programme à votre
              mesure.
            </p>
          </div>
          <aside className="border border-dore/30 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dore">
              Contact
            </p>
            <dl className="mt-5 space-y-3 font-sans text-sm">
              <div>
                <dt className="text-blanc/40">Service partenariats</dt>
                <dd className="mt-1 text-blanc">partenariats@paufc.fr</dd>
              </div>
              <div>
                <dt className="text-blanc/40">Téléphone</dt>
                <dd className="mt-1 text-blanc">+33 5 59 00 00 00</dd>
              </div>
              <div>
                <dt className="text-blanc/40">Adresse</dt>
                <dd className="mt-1 text-blanc">
                  Nouste Camp · Boulevard de la Paix · 64000 Pau
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

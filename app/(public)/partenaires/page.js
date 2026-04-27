import { prisma } from '@/lib/prisma';
import { PartnerCard } from '@/components/vitrine/PartnerCard';
import {
  PARTNER_TIER_LABELS,
  PARTNER_TIER_ORDER,
} from '@/lib/labels';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Partenaires',
  description:
    'Le Pau FC remercie ses partenaires Premium, Officiels et Locaux qui accompagnent le club dans son développement.',
};

// =====================================================================
// IMPORTANT — Cette page est la SEULE qui utilise la charte dorée
// #CBA74D (token pau-gold). Le jaune club est volontairement
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
      <PageHero
        image="/images/hero-partenaires.jpg"
        surtitle="Soutiens & Engagements"
        title="PARTENAIRES"
        subtitle="Le Pau FC avance avec ses partenaires. Entreprises pionnières, institutions béarnaises, marques nationales."
      />

      <SectionLight>

        {PARTNER_TIER_ORDER.map((tier) => {
          const list = grouped[tier];
          if (!list || list.length === 0) return null;

          const isPremium = tier === 'premium';
          return (
            <div
              key={tier}
              className="border-t border-pau-gold/15 py-12 md:py-20"
            >
              <header className="mb-10 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold">
                    {PARTNER_TIER_LABELS[tier]}
                  </p>
                  <h2 className="mt-3 font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
                    {tier === 'premium'
                      ? 'À nos côtés'
                      : tier === 'officiel'
                        ? 'Avec nous'
                        : 'Le Béarn'}
                  </h2>
                </div>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold/60 md:inline">
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
            </div>
          );
        })}

        {partners.length === 0 && (
          <div className="py-24">
            <div className="border border-dashed border-pau-gold/30 p-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold">
                Programme partenaires
              </p>
              <p className="mt-4 font-sans text-pau-primary/70">
                Devenez partenaire du Pau FC. Pour échanger sur nos offres et
                programmes d&apos;hospitalité, contactez le service partenariats.
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-pau-gold/15 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold">
                Devenir partenaire
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
                Rejoignez le club
              </h2>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-pau-primary/70">
                Visibilité au Nouste Camp, hospitalités sur-mesure, opérations
                co-brandées avec nos joueurs, soutien d&apos;un projet sportif et
                territorial. Nos équipes construisent chaque programme à votre
                mesure.
              </p>
            </div>
            <aside className="border border-pau-gold/30 p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-gold">
                Contact
              </p>
              <dl className="mt-5 space-y-3 font-sans text-sm">
                <div>
                  <dt className="text-pau-primary/40">Service partenariats</dt>
                  <dd className="mt-1 text-pau-primary">partenariats@paufc.fr</dd>
                </div>
                <div>
                  <dt className="text-pau-primary/40">Téléphone</dt>
                  <dd className="mt-1 text-pau-primary">+33 5 59 00 00 00</dd>
                </div>
                <div>
                  <dt className="text-pau-primary/40">Adresse</dt>
                  <dd className="mt-1 text-pau-primary">
                    Nouste Camp · Boulevard de la Paix · 64000 Pau
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </SectionLight>
    </>
  );
}

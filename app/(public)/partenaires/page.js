import Image from 'next/image';
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
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-partenaires.jpg"
          alt="Partenaires Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Soutiens & Engagements
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              Partenaires
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Le Pau FC avance avec ses partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {PARTNER_TIER_ORDER.map((tier) => {
          const list = grouped[tier];
          if (!list || list.length === 0) return null;

          const isPremium = tier === 'premium';
          return (
            <div
              key={tier}
              className="border-t border-gray-200 py-12"
            >
              <header className="mb-8 flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-pau-gold">
                    {PARTNER_TIER_LABELS[tier]}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
                    {tier === 'premium'
                      ? 'À nos côtés'
                      : tier === 'officiel'
                        ? 'Avec nous'
                        : 'Le Béarn'}
                  </h2>
                </div>
                <span className="hidden font-mono text-xs uppercase tracking-wider text-pau-gold/60 md:inline">
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
          <div className="py-12">
            <div className="border border-dashed border-pau-gold/30 p-10 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-pau-gold">
                Programme partenaires
              </p>
              <p className="mt-4 text-sm text-pau-primary/70">
                Devenez partenaire du Pau FC. Pour échanger sur nos offres et
                programmes d'hospitalité, contactez le service partenariats.
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 py-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-pau-gold">
                Devenir partenaire
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase text-pau-primary md:text-3xl">
                Rejoignez le club
              </h2>
              <p className="mt-4 max-w-xl text-sm text-pau-primary/70">
                Visibilité au Nouste Camp, hospitalités sur-mesure, opérations
                co-brandées avec nos joueurs, soutien d'un projet sportif et
                territorial. Nos équipes construisent chaque programme à votre
                mesure.
              </p>
            </div>
            <aside className="border border-gray-200 bg-gray-50 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-pau-gold">
                Contact
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-pau-primary/50">Service partenariats</dt>
                  <dd className="mt-1 text-pau-primary">partenariats@paufc.fr</dd>
                </div>
                <div>
                  <dt className="text-pau-primary/50">Téléphone</dt>
                  <dd className="mt-1 text-pau-primary">+33 5 59 00 00 00</dd>
                </div>
                <div>
                  <dt className="text-pau-primary/50">Adresse</dt>
                  <dd className="mt-1 text-pau-primary">
                    Nouste Camp · Boulevard de la Paix · 64000 Pau
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

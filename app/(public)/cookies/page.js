import { LegalLayout, LegalSection } from '@/components/vitrine/LegalLayout';

export const metadata = {
  title: 'Politique cookies',
};

export default function CookiesPage() {
  return (
    <LegalLayout
      kicker="Cookies & Traceurs"
      title="Politique cookies"
      lastUpdated="25 avril 2026"
    >
      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal lors
          de votre visite. Il permet au site de vous reconnaître entre deux
          sessions, de mémoriser vos préférences ou de mesurer son audience.
        </p>
      </LegalSection>

      <LegalSection title="Cookies utilisés">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
          Strictement nécessaires (sans consentement)
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Session panier (localStorage) — mémorisation du contenu du panier
            entre deux visites
          </li>
          <li>
            Authentification (Supabase) — maintien de session pour les
            utilisateurs connectés
          </li>
          <li>Stripe — sécurité paiement et anti-fraude</li>
        </ul>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
          Mesure d&apos;audience (consentement requis)
        </p>
        <p>
          Une fois la solution d&apos;analytics activée, ce site utilisera des
          cookies de mesure d&apos;audience anonymisée. Aucune donnée n&apos;est
          partagée avec des tiers à des fins publicitaires.
        </p>
      </LegalSection>

      <LegalSection title="Gestion de votre consentement">
        <p>
          À chaque visite, un bandeau de consentement vous permet
          d&apos;accepter ou refuser les cookies non nécessaires. Vous pouvez
          modifier vos choix à tout moment via le lien en bas de chaque page.
        </p>
        <p>
          Vous pouvez également bloquer les cookies via les paramètres de
          votre navigateur — ce qui peut impacter le fonctionnement de
          certaines fonctionnalités du site.
        </p>
      </LegalSection>

      <LegalSection title="Conservation">
        <p>
          La durée de conservation des cookies est limitée à 13 mois maximum,
          conformément aux recommandations de la CNIL.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

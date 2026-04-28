import { LegalLayout, LegalSection } from '@/components/vitrine/LegalLayout';

export const metadata = {
  title: 'Politique de confidentialité',
};

export default function RgpdPage() {
  return (
    <LegalLayout
      kicker="RGPD · Vie privée"
      title="Politique de confidentialité"
      lastUpdated="25 avril 2026"
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le Pau FC, dont le siège est établi Nouste Camp, Boulevard de la
          Paix, 64000 Pau, est responsable du traitement de vos données
          personnelles collectées via paufc.fr.
        </p>
      </LegalSection>

      <LegalSection title="Finalités et bases légales">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            Gestion de la boutique en ligne (commande, livraison, SAV) —
            exécution du contrat
          </li>
          <li>
            Newsletter et communication promotionnelle — consentement explicite
            (RGPD art. 6.1.a)
          </li>
          <li>
            Sécurité du site, prévention de la fraude — intérêt légitime
          </li>
          <li>
            Statistiques d&apos;audience anonymisées — intérêt légitime
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Identité (nom, prénom, email, téléphone), adresse de livraison, panier
          et historique de commande, préférences newsletter. Les données de
          paiement sont traitées exclusivement par Stripe Inc. et ne transitent
          jamais en clair sur nos serveurs.
        </p>
      </LegalSection>

      <LegalSection title="Sous-traitants">
        <ul className="ml-5 list-disc space-y-2">
          <li>Vercel Inc. — hébergement applicatif (UE Paris)</li>
          <li>Supabase — base de données + authentification (UE Frankfurt)</li>
          <li>Stripe Inc. — paiement (certifié PCI-DSS niveau 1)</li>
        </ul>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <ul className="ml-5 list-disc space-y-2">
          <li>Compte client actif : durée d&apos;activité du compte</li>
          <li>
            Compte client inactif : suppression après 3 ans sans connexion
          </li>
          <li>
            Commandes : 10 ans (obligation comptable)
          </li>
          <li>Newsletter : jusqu&apos;à désabonnement</li>
        </ul>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous disposez des droits d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition, de limitation du traitement et
          de portabilité de vos données. Pour exercer ces droits :{' '}
          <a className="text-pau-yellow hover:underline" href="mailto:dpo@paufc.fr">
            dpo@paufc.fr
          </a>
          .
        </p>
        <p>
          En cas de litige, vous pouvez saisir la CNIL (
          <a className="text-pau-yellow hover:underline" href="https://www.cnil.fr">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Voir notre{' '}
          <a className="text-pau-yellow hover:underline" href="/cookies">
            politique cookies
          </a>{' '}
          dédiée.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

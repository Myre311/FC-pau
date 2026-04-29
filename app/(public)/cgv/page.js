import { LegalLayout, LegalSection } from '@/components/vitrine/LegalLayout';

export const metadata = {
  title: 'Conditions générales de vente',
};

export default function CGVPage() {
  return (
    <LegalLayout
      kicker="Boutique en ligne"
      title="Conditions générales de vente"
      lastUpdated="25 avril 2026"
    >
      <LegalSection title="1. Objet">
        <p>
          Les présentes conditions générales de vente régissent les relations
          contractuelles entre le Pau FC, exploitant la boutique en ligne
          accessible à l&apos;adresse paufc.fr, et toute personne effectuant
          un achat sur le site.
        </p>
      </LegalSection>

      <LegalSection title="2. Produits">
        <p>
          Les produits proposés à la vente sont décrits avec la plus grande
          exactitude possible. Les visuels sont indicatifs et n&apos;engagent
          pas le club en cas de différence mineure de teinte ou de finition.
        </p>
      </LegalSection>

      <LegalSection title="3. Prix">
        <p>
          Les prix sont indiqués en euros toutes taxes comprises (TTC). Les
          frais de livraison sont précisés au moment de la commande. Le club
          se réserve le droit de modifier les prix à tout moment, sans que
          ces modifications affectent les commandes en cours de validation.
        </p>
      </LegalSection>

      <LegalSection title="4. Commande et paiement">
        <p>
          La commande est validée après paiement complet. Les paiements sont
          opérés via Stripe Inc. - aucune donnée bancaire n&apos;est stockée
          sur les serveurs du club. Cartes acceptées : Visa, Mastercard,
          American Express, Apple Pay, Google Pay.
        </p>
      </LegalSection>

      <LegalSection title="5. Livraison">
        <p>
          Les délais de préparation sont de 2 à 5 jours ouvrés. La livraison
          s&apos;effectue à l&apos;adresse renseignée lors de la commande. Le
          club n&apos;est pas responsable des retards imputables au
          transporteur.
        </p>
      </LegalSection>

      <LegalSection title="6. Droit de rétractation">
        <p>
          Conformément à l&apos;article L.221-18 du Code de la consommation,
          le client dispose d&apos;un délai de 14 jours à compter de la
          réception pour exercer son droit de rétractation, sans avoir à
          justifier de motif.
        </p>
        <p>
          Exception : les produits personnalisés (flocage nom + numéro) ne
          peuvent faire l&apos;objet d&apos;une rétractation conformément à
          l&apos;article L.221-28 3°.
        </p>
      </LegalSection>

      <LegalSection title="7. Garanties">
        <p>
          Les produits bénéficient des garanties légales de conformité et des
          vices cachés (articles L.217-4 et suivants du Code de la
          consommation, articles 1641 et suivants du Code civil).
        </p>
      </LegalSection>

      <LegalSection title="8. Service client">
        <p>
          Pour toute question relative à votre commande :{' '}
          <a className="text-pau-yellow hover:underline" href="mailto:boutique@paufc.fr">
            boutique@paufc.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Litiges">
        <p>
          En cas de différend, le client peut recourir gratuitement au
          médiateur de la consommation. Les tribunaux français sont
          compétents.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

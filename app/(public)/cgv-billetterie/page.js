import { LegalLayout, LegalSection } from '@/components/vitrine/LegalLayout';

export const metadata = {
  title: 'Conditions générales de vente · Billetterie',
};

export default function CGVBilletterieePage() {
  return (
    <LegalLayout
      kicker="Billetterie · Matchs"
      title="Conditions générales de vente Billetterie"
      lastUpdated="25 avril 2026"
    >
      <LegalSection title="1. Objet">
        <p>
          Les présentes conditions générales de vente régissent la vente de
          billets d&apos;entrée aux matchs du Pau FC disputés au Nouste Camp
          et en déplacement, via la plateforme en ligne paufc.fr ou les points
          de vente physiques agréés.
        </p>
      </LegalSection>

      <LegalSection title="2. Tarifs">
        <p>
          Les prix des billets sont affichés en euros TTC. Les tarifs varient
          selon la catégorie de match (Ligue 2, Coupe de France, etc.), la
          tribune, et les réductions applicables (abonnés, jeunes, groupes).
        </p>
        <p>
          Le club se réserve le droit de modifier les tarifs à tout moment,
          sans que ces modifications affectent les billets déjà vendus.
        </p>
      </LegalSection>

      <LegalSection title="3. Achat et paiement">
        <p>
          La commande est ferme et définitive dès validation du paiement. Les
          paiements en ligne sont sécurisés via Stripe Inc. Modes acceptés :
          carte bancaire (Visa, Mastercard, Amex), Apple Pay, Google Pay.
        </p>
        <p>
          En cas d&apos;échec du paiement, la réservation est automatiquement
          annulée. Aucun billet n&apos;est envoyé sans paiement confirmé.
        </p>
      </LegalSection>

      <LegalSection title="4. Billets dématérialisés">
        <p>
          Les billets sont envoyés par email sous format PDF avec QR code
          unique. Le porteur doit présenter le billet (format papier ou
          smartphone) aux contrôles d&apos;accès. Chaque QR code est à usage
          unique : toute duplication entraîne le refus d&apos;accès.
        </p>
      </LegalSection>

      <LegalSection title="5. Annulation et remboursement">
        <p>
          <strong>Match maintenu :</strong> Aucun remboursement n&apos;est
          possible après achat, sauf cas de force majeure (article L.216-1 du
          Code de la consommation).
        </p>
        <p>
          <strong>Match annulé ou reporté :</strong> En cas d&apos;annulation
          définitive, le club procède au remboursement intégral dans un délai
          de 14 jours. En cas de report, le billet reste valable pour la
          nouvelle date. Si le porteur ne peut assister à la nouvelle date, il
          peut demander le remboursement dans un délai de 7 jours après
          l&apos;annonce du report.
        </p>
        <p>
          <strong>Huis clos :</strong> Si un match se déroule à huis clos sur
          décision administrative, les billets sont intégralement remboursés.
        </p>
      </LegalSection>

      <LegalSection title="6. Revente et transfert">
        <p>
          La revente de billets à un prix supérieur au prix facial est
          strictement interdite (article L.313-6-2 du Code du sport) et
          passible de sanctions pénales. Le club se réserve le droit
          d&apos;annuler tout billet revendu en infraction.
        </p>
        <p>
          Le transfert nominatif de billet peut être autorisé via la plateforme
          en ligne, sous réserve de validation par le club.
        </p>
      </LegalSection>

      <LegalSection title="7. Accès au stade">
        <p>
          L&apos;accès au stade est soumis au règlement intérieur du Nouste
          Camp. Le porteur d&apos;un billet s&apos;engage à respecter les
          consignes de sécurité, l&apos;interdiction d&apos;introduire des
          objets dangereux, fumigènes, ou substances illicites.
        </p>
        <p>
          Le club se réserve le droit de refuser l&apos;accès ou d&apos;expulser
          toute personne ne respectant pas le règlement intérieur, sans
          remboursement.
        </p>
      </LegalSection>

      <LegalSection title="8. Responsabilité">
        <p>
          Le club décline toute responsabilité en cas de vol, perte ou
          dégradation d&apos;objets personnels dans l&apos;enceinte du stade.
          Le porteur assiste au match à ses propres risques.
        </p>
      </LegalSection>

      <LegalSection title="9. Données personnelles">
        <p>
          Les données collectées lors de l&apos;achat de billets (nom, email,
          téléphone) sont traitées conformément à notre{' '}
          <a className="text-jaune hover:underline" href="/rgpd">
            politique de confidentialité RGPD
          </a>
          . Elles sont conservées pour la durée de validité du billet + 1 an
          (archivage légal).
        </p>
      </LegalSection>

      <LegalSection title="10. Litiges">
        <p>
          En cas de litige, le client peut recourir gratuitement au médiateur
          de la consommation. Les présentes conditions sont régies par le droit
          français. Les tribunaux de Pau sont seuls compétents.
        </p>
      </LegalSection>

      <LegalSection title="Contact billetterie">
        <p>
          Pour toute question :{' '}
          <a
            className="text-jaune hover:underline"
            href="mailto:billetterie@paufc.fr"
          >
            billetterie@paufc.fr
          </a>{' '}
          · Téléphone : +33 5 59 00 00 00 (du lundi au vendredi, 9h-17h).
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

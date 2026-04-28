import Link from 'next/link';

export const metadata = {
  title: 'FAQ Cashless · Billetterie',
  description:
    'Questions fréquentes sur le système cashless du Nouste Camp : rechargement, remboursement, carte perdue, application mobile.',
};

export default function FAQCashlessPage() {
  return (
    <article>
      {/* Hero */}
      <section className="bg-pau-primary py-16 md:py-24">
        <div className="container-fc">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Billetterie · Cashless · FAQ</p>
          <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px] text-white">
            QUESTIONS <span className="text-pau-yellow">FRÉQUENTES</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/70 md:text-xl">
            Tout ce que vous devez savoir sur le système cashless du Nouste Camp.
            Rechargement, remboursement, carte perdue, application mobile.
          </p>
        </div>
      </section>

      {/* Général */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Général
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="C'est quoi le système cashless ?"
            answer="Le système cashless permet de payer toutes vos consommations au stade (buvette, boutique, food-trucks) sans utiliser d'espèces. Vous rechargez votre carte en ligne avant le match, puis payez en présentant votre carte aux bornes sans contact."
          />
          <FAQItem
            question="Est-ce que c'est obligatoire ?"
            answer="Oui, le Nouste Camp est 100% cashless. Les paiements en espèces ne sont plus acceptés dans l'enceinte du stade. Vous pouvez utiliser une carte cashless physique ou votre smartphone (si compatible NFC)."
          />
          <FAQItem
            question="Comment obtenir ma carte ?"
            answer="Commandez votre carte gratuitement en ligne depuis votre espace client. Réception sous 7 jours par courrier. Vous pouvez aussi la récupérer directement au stade le jour du match (guichets dédiés à l'entrée)."
          />
        </div>
      </section>

      {/* Rechargement */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Rechargement
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="Comment recharger ma carte ?"
            answer="Connectez-vous à votre espace client sur paufc.fr, section 'Cashless'. Choisissez le montant à recharger (minimum 10€) et payez par carte bancaire, Apple Pay ou Google Pay. Le crédit est disponible immédiatement sur votre carte."
          />
          <FAQItem
            question="Quel est le montant minimum de rechargement ?"
            answer="Le montant minimum est de 10€. Il n'y a pas de montant maximum, mais nous recommandons de recharger par tranche de 20 à 50€ pour éviter un solde trop important inutilisé."
          />
          <FAQItem
            question="Puis-je recharger ma carte directement au stade ?"
            answer="Oui, des bornes de rechargement sont disponibles à l'entrée du stade. Vous pouvez recharger votre carte par carte bancaire (sans contact uniquement). Les rechargements en espèces ne sont plus acceptés."
          />
          <FAQItem
            question="Est-ce que je peux annuler un rechargement ?"
            answer="Non, une fois le rechargement effectué, il ne peut pas être annulé. En revanche, vous pouvez demander le remboursement de votre solde non utilisé à tout moment (voir section Remboursement ci-dessous)."
          />
        </div>
      </section>

      {/* Utilisation */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Utilisation
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="Où puis-je utiliser ma carte cashless ?"
            answer="Votre carte fonctionne à tous les points de vente du Nouste Camp : buvette principale, food-trucks, boutique officielle. Présentez votre carte devant la borne sans contact, le montant est débité automatiquement."
          />
          <FAQItem
            question="Comment vérifier mon solde ?"
            answer="Connectez-vous à votre espace client sur paufc.fr ou utilise l'application mobile Pau FC. Votre solde est mis à jour en temps réel après chaque transaction. Vous pouvez aussi demander votre solde aux bornes du stade."
          />
          <FAQItem
            question="Que se passe-t-il si je n'ai plus de crédit ?"
            answer="Si votre solde est insuffisant, la transaction sera refusée. Vous devrez recharger votre carte soit via les bornes du stade, soit depuis votre smartphone via l'application mobile (si vous avez une connexion internet)."
          />
        </div>
      </section>

      {/* Remboursement */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Remboursement
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="Puis-je me faire rembourser mon solde non utilisé ?"
            answer="Oui, vous pouvez demander le remboursement de votre solde à tout moment depuis votre espace client. Le remboursement est effectué sur le moyen de paiement utilisé lors du rechargement, sous 7 jours ouvrés."
          />
          <FAQItem
            question="Y a-t-il des frais de remboursement ?"
            answer="Non, le remboursement du solde est gratuit. Il n'y a aucun frais prélevé par le club."
          />
          <FAQItem
            question="Que devient mon solde si je perds ma carte ?"
            answer="Votre solde est lié à votre compte client, pas à la carte physique. Si vous perdez votre carte, connectez-vous à votre espace client pour la bloquer. Commandez ensuite une nouvelle carte (gratuite), votre solde sera automatiquement transféré sur la nouvelle carte."
          />
        </div>
      </section>

      {/* Problèmes */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Problèmes techniques
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="Ma carte ne fonctionne pas, que faire ?"
            answer="Vérifiez d'abord que votre carte est bien activée (connexion à votre espace client). Si le problème persiste, rendez-vous au guichet billetterie du stade. Le personnel pourra vérifier l'état de votre carte et la remplacer si nécessaire (gratuit)."
          />
          <FAQItem
            question="J'ai perdu ma carte, comment la bloquer ?"
            answer="Connectez-vous immédiatement à votre espace client, section 'Cashless' > 'Bloquer ma carte'. La carte sera désactivée en quelques secondes. Votre solde reste sécurisé sur votre compte."
          />
          <FAQItem
            question="Puis-je utiliser mon smartphone au lieu de la carte ?"
            answer="Oui, si votre smartphone est compatible NFC (paiement sans contact). Téléchargez l'application mobile Pau FC, activez la fonction cashless et ajoutez votre compte. Présentez votre smartphone aux bornes exactement comme une carte physique."
          />
        </div>
      </section>

      {/* Sécurité */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Sécurité & données
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="Mes données bancaires sont-elles sécurisées ?"
            answer="Oui, tous les paiements sont traités via Stripe Inc., certifié PCI-DSS niveau 1 (plus haut niveau de sécurité bancaire). Le Pau FC ne stocke jamais vos coordonnées bancaires sur ses serveurs."
          />
          <FAQItem
            question="Qui a accès à mes données de consommation ?"
            answer="Vos données de consommation (montant dépensé, type de produit) sont utilisées uniquement à des fins statistiques internes et pour améliorer nos services. Elles ne sont jamais partagées avec des tiers sans votre consentement. Voir notre politique RGPD pour plus de détails."
          />
          <FAQItem
            question="Puis-je supprimer mon compte cashless ?"
            answer="Oui, vous pouvez demander la suppression de votre compte cashless à tout moment. Avant suppression, assurez-vous d'avoir demandé le remboursement de votre solde. Contact : cashless@paufc.fr"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
            Toujours une question ?
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
            Si vous ne trouvez pas la réponse à votre question, contactez notre
            service billetterie. Nous te répondrons dans les plus brefs délais.
          </p>

          <div className="mt-8 space-y-4">
            <p className="font-sans text-base text-pau-primary/75">
              Email :{' '}
              <a
                href="mailto:cashless@paufc.fr"
                className="text-pau-yellow hover:underline"
              >
                cashless@paufc.fr
              </a>
            </p>
            <p className="font-sans text-base text-pau-primary/75">
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-pau-yellow hover:underline">
                +33 5 59 00 00 00
              </a>
            </p>
            <p className="font-sans text-base text-pau-primary/75">
              Horaires : Lundi au vendredi, 9h-17h
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/billetterie/cashless"
              className="inline-block border border-gray-200 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:bg-gray-50"
            >
              Retour Cashless
            </Link>
            <Link
              href="/rgpd"
              className="font-mono text-sm uppercase tracking-wider text-pau-primary/60 hover:text-pau-yellow"
            >
              Politique RGPD →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant FAQ Item
function FAQItem({ question, answer }) {
  return (
    <div className="border-l-2 border-pau-yellow pl-6 md:pl-10">
      <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-pau-primary md:text-3xl">
        {question}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-pau-primary/75 md:text-lg">
        {answer}
      </p>
    </div>
  );
}

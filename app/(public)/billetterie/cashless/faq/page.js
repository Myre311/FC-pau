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
      <section className="container-fc pt-16 pb-12 md:pt-24 md:pb-20">
        <p className="badge-mono">Billetterie · Cashless · FAQ</p>
        <h1 className="mt-6 text-[14vw] md:text-[10vw] lg:text-[140px] text-pau-primary">
          QUESTIONS <span className="text-pau-yellow">FRÉQUENTES</span>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-pau-primary/70 md:text-xl">
          Tout ce que tu dois savoir sur le système cashless du Nouste Camp.
          Rechargement, remboursement, carte perdue, application mobile.
        </p>
      </section>

      {/* Général */}
      <section className="container-fc border-t border-gray-200/10 py-12 md:py-20">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          Général
        </h2>

        <div className="space-y-8">
          <FAQItem
            question="C'est quoi le système cashless ?"
            answer="Le système cashless permet de payer toutes tes consommations au stade (buvette, boutique, food-trucks) sans utiliser d'espèces. Tu recharges ta carte en ligne avant le match, puis tu payes en présentant ta carte aux bornes sans contact."
          />
          <FAQItem
            question="Est-ce que c'est obligatoire ?"
            answer="Oui, le Nouste Camp est 100% cashless. Les paiements en espèces ne sont plus acceptés dans l'enceinte du stade. Tu peux utiliser une carte cashless physique ou ton smartphone (si compatible NFC)."
          />
          <FAQItem
            question="Comment obtenir ma carte ?"
            answer="Commande ta carte gratuitement en ligne depuis ton espace client. Réception sous 7 jours par courrier. Tu peux aussi la récupérer directement au stade le jour du match (guichets dédiés à l'entrée)."
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
            answer="Connecte-toi à ton espace client sur paufc.fr, section 'Cashless'. Choisis le montant à recharger (minimum 10€) et paye par carte bancaire, Apple Pay ou Google Pay. Le crédit est disponible immédiatement sur ta carte."
          />
          <FAQItem
            question="Quel est le montant minimum de rechargement ?"
            answer="Le montant minimum est de 10€. Il n'y a pas de montant maximum, mais nous recommandons de recharger par tranche de 20 à 50€ pour éviter un solde trop important inutilisé."
          />
          <FAQItem
            question="Puis-je recharger ma carte directement au stade ?"
            answer="Oui, des bornes de rechargement sont disponibles à l'entrée du stade. Tu peux recharger ta carte par carte bancaire (sans contact uniquement). Les rechargements en espèces ne sont plus acceptés."
          />
          <FAQItem
            question="Est-ce que je peux annuler un rechargement ?"
            answer="Non, une fois le rechargement effectué, il ne peut pas être annulé. En revanche, tu peux demander le remboursement de ton solde non utilisé à tout moment (voir section Remboursement ci-dessous)."
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
            answer="Ta carte fonctionne à tous les points de vente du Nouste Camp : buvette principale, food-trucks, boutique officielle. Présente ta carte devant la borne sans contact, le montant est débité automatiquement."
          />
          <FAQItem
            question="Comment vérifier mon solde ?"
            answer="Connecte-toi à ton espace client sur paufc.fr ou utilise l'application mobile Pau FC. Ton solde est mis à jour en temps réel après chaque transaction. Tu peux aussi demander ton solde aux bornes du stade."
          />
          <FAQItem
            question="Que se passe-t-il si je n'ai plus de crédit ?"
            answer="Si ton solde est insuffisant, la transaction sera refusée. Tu devras recharger ta carte soit via les bornes du stade, soit depuis ton smartphone via l'application mobile (si tu as une connexion internet)."
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
            answer="Oui, tu peux demander le remboursement de ton solde à tout moment depuis ton espace client. Le remboursement est effectué sur le moyen de paiement utilisé lors du rechargement, sous 7 jours ouvrés."
          />
          <FAQItem
            question="Y a-t-il des frais de remboursement ?"
            answer="Non, le remboursement du solde est gratuit. Il n'y a aucun frais prélevé par le club."
          />
          <FAQItem
            question="Que devient mon solde si je perds ma carte ?"
            answer="Ton solde est lié à ton compte client, pas à la carte physique. Si tu perds ta carte, connecte-toi à ton espace client pour la bloquer. Commande ensuite une nouvelle carte (gratuite), ton solde sera automatiquement transféré sur la nouvelle carte."
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
            answer="Vérifie d'abord que ta carte est bien activée (connexion à ton espace client). Si le problème persiste, rends-toi au guichet billetterie du stade. Le personnel pourra vérifier l'état de ta carte et la remplacer si nécessaire (gratuit)."
          />
          <FAQItem
            question="J'ai perdu ma carte, comment la bloquer ?"
            answer="Connecte-toi immédiatement à ton espace client, section 'Cashless' > 'Bloquer ma carte'. La carte sera désactivée en quelques secondes. Ton solde reste sécurisé sur ton compte."
          />
          <FAQItem
            question="Puis-je utiliser mon smartphone au lieu de la carte ?"
            answer="Oui, si ton smartphone est compatible NFC (paiement sans contact). Télécharge l'application mobile Pau FC, active la fonction cashless et ajoute ton compte. Présente ton smartphone aux bornes exactement comme une carte physique."
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
            answer="Oui, tous les paiements sont traités via Stripe Inc., certifié PCI-DSS niveau 1 (plus haut niveau de sécurité bancaire). Le Pau FC ne stocke jamais tes coordonnées bancaires sur ses serveurs."
          />
          <FAQItem
            question="Qui a accès à mes données de consommation ?"
            answer="Tes données de consommation (montant dépensé, type de produit) sont utilisées uniquement à des fins statistiques internes et pour améliorer nos services. Elles ne sont jamais partagées avec des tiers sans ton consentement. Voir notre politique RGPD pour plus de détails."
          />
          <FAQItem
            question="Puis-je supprimer mon compte cashless ?"
            answer="Oui, tu peux demander la suppression de ton compte cashless à tout moment. Avant suppression, assure-toi d'avoir demandé le remboursement de ton solde. Contact : cashless@paufc.fr"
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
            Si tu ne trouves pas la réponse à ta question, contacte notre
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
              className="inline-block border border-white/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-pau-primary transition-colors hover:border-pau-yellow hover:text-pau-yellow"
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

import { LegalLayout, LegalSection } from '@/components/vitrine/LegalLayout';

export const metadata = { title: 'Mentions légales' };

export default function MentionsPage() {
  return (
    <LegalLayout
      kicker="Informations légales"
      title="Mentions légales"
      lastUpdated="25 avril 2026"
    >
      <LegalSection title="Éditeur du site">
        <p>
          Le présent site est édité par le Pau FC, société sportive
          professionnelle. Adresse postale : Nouste Camp, Boulevard de la Paix,
          64000 Pau. Téléphone : +33 5 59 00 00 00.
        </p>
        <p>
          Directeur de la publication : Président du club. Contact :{' '}
          <a className="text-pau-yellow hover:underline" href="mailto:contact@paufc.fr">
            contact@paufc.fr
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Hébergeur">
        <p>
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut
          (CA 91789, États-Unis). Région d&apos;hébergement : Europe (Paris).
          Base de données et services associés : Supabase, Frankfurt (UE).
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus (textes, images, logos, vidéos) est la
          propriété exclusive du Pau FC ou utilisé avec l&apos;autorisation de
          ses ayants-droit. Toute reproduction, intégrale ou partielle, est
          soumise à autorisation écrite préalable.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le Pau FC collecte et traite des données personnelles dans le cadre
          de la gestion de la relation client (boutique, billetterie,
          newsletter). Voir notre{' '}
          <a className="text-pau-yellow hover:underline" href="/rgpd">
            politique de confidentialité (RGPD)
          </a>{' '}
          pour le détail des traitements et l&apos;exercice de vos droits.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Malgré nos efforts pour garantir l&apos;exactitude des informations
          publiées, le club ne saurait être tenu responsable des erreurs ou
          omissions, ni des conséquences de l&apos;utilisation du site.
        </p>
      </LegalSection>

      <LegalSection title="Litiges">
        <p>
          Les présentes mentions sont régies par le droit français. Tout litige
          relatif au site relève de la compétence exclusive des tribunaux
          français.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

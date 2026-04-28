import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export const metadata = { title: 'Paramètres' };

// Page paramètres — actuellement, lecture seule des configurations
// statiques. Phase ultérieure : table Settings éditable + Server Actions.

export default function AdminParametresPage() {
  return (
    <div className="space-y-10">
      <AdminPageHeader kicker="Système" title="Paramètres" />

      <section className="grid gap-6 lg:grid-cols-2">
        <Block title="Identité club">
          <Line label="Raison sociale" value="Pau FC" />
          <Line label="Adresse" value="Nouste Camp · Boulevard de la Paix · 64000 Pau" />
          <Line label="Email" value="contact@paufc.fr" />
        </Block>

        <Block title="Boutique">
          <Line label="Devise" value="EUR" />
          <Line label="Livraison forfait" value="5,90 € (offerte > 80 €)" />
          <Line
            label="TVA"
            value="Incluse dans les prix de référence (B2C FR)"
          />
        </Block>

        <Block title="Stripe">
          <Line label="Mode" value="Elements (paiement intégré)" />
          <Line label="Webhook" value="/api/webhooks/stripe (signature vérifiée)" />
          <Line label="Méthodes" value="Carte · Apple Pay · Google Pay" />
        </Block>

        <Block title="Email transactionnel">
          <Line label="Reset mot de passe" value="Supabase Auth (template club)" />
          <Line label="Confirmation newsletter" value="À brancher (Resend)" />
          <Line label="Confirmation commande" value="À brancher (Resend)" />
        </Block>

        <Block title="POS physique">
          <Line label="Statut" value="Choix Square ou Lightspeed à valider" />
          <Line
            label="Webhook entrant"
            value="/api/pos/movement (signature HMAC)"
          />
        </Block>

        <Block title="Hébergement">
          <Line label="Application" value="Vercel · région fra1 (Paris)" />
          <Line label="Base de données" value="Supabase · Frankfurt (UE)" />
          <Line label="Stockage médias" value="Supabase Storage" />
        </Block>
      </section>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40">
        Ces paramètres sont aujourd&apos;hui définis dans le code et les
        variables d&apos;environnement. Une page d&apos;édition complète
        arrivera dans une prochaine version.
      </p>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="border border-gray-200/10 bg-pau-primary/20 p-5">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
        {title}
      </h2>
      <dl className="mt-4 space-y-3 font-sans text-sm">{children}</dl>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40">
        {label}
      </dt>
      <dd className="mt-1 text-gray-900">{value}</dd>
    </div>
  );
}

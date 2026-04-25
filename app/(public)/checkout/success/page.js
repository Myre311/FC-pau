import Link from 'next/link';

import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDate } from '@/lib/format';
import { ClearCartOnMount } from '@/components/shop/ClearCartOnMount';

// Page de confirmation post-paiement.
// Stripe redirige avec ?payment_intent=pi_...&payment_intent_client_secret=...&redirect_status=succeeded
//
// On lit le statut Stripe directement (source de vérité), puis on affiche
// le récap depuis l'Order créée par le webhook (s'il a déjà tourné).
// Si la commande n'est pas encore en BDD (race avec le webhook), on
// affiche un état "paiement validé, commande en cours d'enregistrement".

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Commande confirmée',
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({ searchParams }) {
  const paymentIntentId = searchParams?.payment_intent;
  const redirectStatus = searchParams?.redirect_status;

  if (!paymentIntentId) {
    return <FallbackMissing />;
  }

  let intent = null;
  try {
    intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch {
    return <FallbackMissing />;
  }

  if (intent.status !== 'succeeded') {
    return (
      <div className="container-fc py-24 text-center">
        <p className="badge-mono">Paiement en attente</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
          {redirectStatus === 'processing'
            ? 'Traitement en cours'
            : 'Paiement à confirmer'}
        </h1>
        <p className="mt-6 max-w-md mx-auto font-sans text-blanc/60">
          Votre banque finalise le paiement. Vous recevrez un email dès que
          la commande sera validée.
        </p>
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { stripePaymentIntentId: intent.id },
    include: { items: true },
  });

  return (
    <div className="container-fc py-16 md:py-24">
      <ClearCartOnMount />

      <div className="max-w-2xl">
        <p className="badge-mono">Paiement confirmé</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-7xl">
          MERCI
        </h1>
        <p className="mt-6 font-sans text-lg text-blanc/70">
          Votre commande {order ? `${order.number}` : `(en cours d'enregistrement)`} est
          confirmée. Un email récapitulatif part vers{' '}
          <span className="text-blanc">
            {intent.receipt_email ?? order?.guestEmail ?? 'votre adresse'}
          </span>
          .
        </p>

        {order && (
          <div className="mt-12 border border-blanc/10 p-6">
            <dl className="grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.2em] md:grid-cols-4">
              <Stat label="N° commande" value={order.number} />
              <Stat label="Date" value={formatDate(order.createdAt)} />
              <Stat label="Articles" value={order.items.length} />
              <Stat label="Total" value={formatPrice(order.total)} />
            </dl>

            <ul className="mt-6 divide-y divide-blanc/10 border-t border-blanc/10">
              {order.items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between gap-4 py-3 font-sans text-sm"
                >
                  <span className="text-blanc">
                    {it.productName}
                    {it.variantLabel && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                        {it.variantLabel} · ×{it.quantity}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-blanc">
                    {formatPrice(it.unitPrice * it.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 md:flex-row">
          <Link href="/boutique">
            <Button variant="primary" size="lg" cornerCut>
              Continuer mes achats
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-blanc/40">{label}</dt>
      <dd className="mt-1 text-blanc">{value}</dd>
    </div>
  );
}

function FallbackMissing() {
  return (
    <div className="container-fc py-24 text-center">
      <p className="badge-mono">Référence manquante</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
        Pas de paiement à afficher
      </h1>
      <p className="mt-6 font-sans text-blanc/60">
        Aucun identifiant de paiement n&apos;a été fourni. Si vous venez de payer,
        vérifiez votre boîte mail.
      </p>
      <Link href="/boutique" className="mt-8 inline-block">
        <Button variant="outline" size="lg">
          Retour à la boutique
        </Button>
      </Link>
    </div>
  );
}

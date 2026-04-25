import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { createOrderFromPaymentIntent } from '@/lib/orders';

// Webhook Stripe — vérification de signature obligatoire.
// Lit le raw body via request.text() (Next App Router gère ça nativement).
// Le webhook DOIT répondre 200 vite, donc on accuse réception sans bloquer
// si le traitement métier échoue (Stripe re-tente jusqu'à 3 jours).

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json(
      { data: null, error: 'Signature ou secret manquant' },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error('[stripe-webhook] signature invalide', err.message);
    return NextResponse.json(
      { data: null, error: 'Signature invalide' },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const intent = event.data.object;
        await createOrderFromPaymentIntent(intent);
        break;
      }
      case 'payment_intent.payment_failed': {
        // TODO Phase 2.1 : libérer les réservations associées via
        // metadata.reservationIds, mais ne pas tuer le retry utilisateur.
        const intent = event.data.object;
        console.warn(
          '[stripe-webhook] paiement échoué',
          intent.id,
          intent.last_payment_error?.message,
        );
        break;
      }
      case 'charge.refunded': {
        // TODO Phase 6 : passer Order.status à 'refunded' + mouvement
        // return_online quand la commande est trouvée via paymentIntent.
        break;
      }
      default:
      // Événements non gérés : on accepte sans agir
    }
  } catch (err) {
    console.error('[stripe-webhook] handler', event.type, err);
    // On renvoie 200 quand même : le webhook a été reçu et signé.
    // Le retry Stripe ne corrigera pas un bug applicatif.
  }

  return NextResponse.json({ data: { received: true }, error: null });
}

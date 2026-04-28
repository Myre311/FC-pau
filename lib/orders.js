import { prisma } from '@/lib/prisma';
import { recordOnlineSale } from '@/lib/stock';

/**
 * Calcule un numéro de commande lisible : PAU-2026-000123.
 * Compteur global par année — séquence garantie unique par contrainte
 * @unique sur Order.number (collision impossible si mono-process,
 * gérée par retry en cas de double webhook).
 */
export async function generateOrderNumber() {
  const year = new Date().getFullYear();
  const count = await prisma.order.count({
    where: { number: { startsWith: `PAU-${year}-` } },
  });
  return `PAU-${year}-${String(count + 1).padStart(6, '0')}`;
}

/**
 * Création de commande à partir d'un PaymentIntent Stripe payé.
 * Idempotent : si une Order existe déjà pour ce paymentIntentId,
 * la retourne sans dupliquer (gère les replays de webhook).
 *
 * Le contenu du panier et l'adresse sont stockés en metadata Stripe
 * lors de la création du PaymentIntent (via /api/checkout/intent).
 */
export async function createOrderFromPaymentIntent(paymentIntent) {
  const existing = await prisma.order.findUnique({
    where: { stripePaymentIntentId: paymentIntent.id },
  });
  if (existing) return existing;

  const meta = paymentIntent.metadata ?? {};
  const items = meta.items ? JSON.parse(meta.items) : [];
  const reservationIds = meta.reservationIds
    ? JSON.parse(meta.reservationIds)
    : [];
  const shippingAddress = meta.shipping ? JSON.parse(meta.shipping) : null;
  const billingAddress = meta.billing ? JSON.parse(meta.billing) : shippingAddress;

  const number = await generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      number,
      userId: meta.userId || null,
      guestEmail: meta.email || paymentIntent.receipt_email || null,
      status: 'paid',
      subtotal: Number(meta.subtotal ?? 0),
      shippingCost: Number(meta.shippingCost ?? 0),
      discountTotal: Number(meta.discountTotal ?? 0),
      taxTotal: Number(meta.taxTotal ?? 0),
      total: paymentIntent.amount,
      currency: paymentIntent.currency.toUpperCase(),
      shippingAddress,
      billingAddress,
      stripePaymentIntentId: paymentIntent.id,
      couponCode: meta.couponCode || null,
      items: {
        create: items.map((it) => ({
          variantId: it.variantId,
          productName: it.productName,
          variantLabel: it.variantLabel ?? null,
          unitPrice: it.unitPrice,
          quantity: it.quantity,
          customizationId: it.customizationId ?? null,
        })),
      },
    },
    include: { items: true },
  });

  // Décrémente le stock physique pour chaque ligne, libère la réservation
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    await recordOnlineSale({
      variantId: it.variantId,
      quantity: it.quantity,
      orderId: order.id,
      reservationId: reservationIds[i] ?? null,
    });
  }

  return order;
}

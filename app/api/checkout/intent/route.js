import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { reserveStock } from '@/lib/stock';
import { checkoutIntentSchema } from '@/lib/validations/checkout';

// Création d'un PaymentIntent Stripe.
// - Valide l'input via Zod
// - Look-up des prix réels en BDD (jamais confiance dans le client)
// - Réserve le stock pour 15 min
// - Crée un PaymentIntent avec metadata complète (utilisée par le webhook
//   pour créer la commande après paiement confirmé)
//
// Réponse normalisée : { data: { clientSecret }, error }
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: 'JSON invalide' },
      { status: 400 },
    );
  }

  const parsed = checkoutIntentSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: 'Payload invalide', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // Look-up prix réels + stock en BDD
  const variantIds = input.items.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true, stockItem: true },
  });
  const byId = new Map(variants.map((v) => [v.id, v]));

  // Validation cohérence + reconstruction prix server-side
  const orderItems = [];
  let subtotal = 0;
  for (const line of input.items) {
    const v = byId.get(line.variantId);
    if (!v || v.product.status !== 'active') {
      return NextResponse.json(
        { data: null, error: `Produit indisponible (${line.variantId})` },
        { status: 400 },
      );
    }
    // Le flocage personnalisé ajoute un supplément forfaitaire (cf.
    // FLOCKING_PRICE dans JerseyConfigurator). Source de vérité : ce
    // calcul serveur, pas le prix envoyé par le client.
    const flockingPrice = line.customizationId ? 1500 : 0;
    const unitPrice = (v.priceOverride ?? v.product.basePrice) + flockingPrice;
    const lineTotal = unitPrice * line.quantity;
    subtotal += lineTotal;
    orderItems.push({
      variantId: v.id,
      productName: v.product.name,
      variantLabel: v.size ? `Taille ${v.size}` : null,
      unitPrice,
      quantity: line.quantity,
      customizationId: line.customizationId ?? null,
    });
  }

  // Coupon (optionnel)
  let discountTotal = 0;
  if (input.couponCode) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: input.couponCode },
    });
    if (coupon && coupon.active) {
      const now = new Date();
      const validWindow =
        (!coupon.startsAt || coupon.startsAt <= now) &&
        (!coupon.endsAt || coupon.endsAt >= now);
      const minOk = !coupon.minSubtotal || subtotal >= coupon.minSubtotal;
      if (validWindow && minOk) {
        discountTotal =
          coupon.type === 'percent'
            ? Math.round((subtotal * coupon.value) / 100)
            : Math.min(coupon.value, subtotal);
      }
    }
  }

  // Livraison forfaitaire pour V1 — à remplacer par les transporteurs
  // partenaires une fois choisis côté club.
  const shippingCost = subtotal >= 8000 ? 0 : 590; // Free > 80€, sinon 5,90€
  const taxTotal = 0; // TVA incluse dans basePrice (B2C standard FR)
  const total = subtotal + shippingCost - discountTotal + taxTotal;

  if (total < 50) {
    return NextResponse.json(
      { data: null, error: 'Montant trop faible' },
      { status: 400 },
    );
  }

  // Réservation du stock — 15 min. Si l'une échoue, on libère les précédentes.
  const reservationIds = [];
  try {
    for (const line of input.items) {
      const r = await reserveStock({
        variantId: line.variantId,
        sessionId: input.sessionId,
        userId: null,
        quantity: line.quantity,
      });
      reservationIds.push(r.id);
    }
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err.message ?? 'Réservation impossible' },
      { status: 409 },
    );
  }

  // Création du PaymentIntent. Toute la donnée nécessaire à la création
  // de la commande passe en metadata (Stripe limite chaque valeur à
  // 500 chars — on JSON.stringify les arrays).
  const intent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'eur',
    automatic_payment_methods: { enabled: true },
    receipt_email: input.email,
    metadata: {
      email: input.email,
      items: JSON.stringify(orderItems),
      reservationIds: JSON.stringify(reservationIds),
      subtotal: String(subtotal),
      shippingCost: String(shippingCost),
      discountTotal: String(discountTotal),
      taxTotal: String(taxTotal),
      shipping: JSON.stringify(input.shipping),
      billing: JSON.stringify(
        input.billingSameAsShipping ? input.shipping : input.billing,
      ),
      couponCode: input.couponCode ?? '',
    },
  });

  return NextResponse.json({
    data: {
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: total,
    },
    error: null,
  });
}

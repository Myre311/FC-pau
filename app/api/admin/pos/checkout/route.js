import { NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/orders';
import { recordPOSSale } from '@/lib/stock';
import { posCheckoutSchema } from '@/lib/validations/pos';

export const dynamic = 'force-dynamic';

// Encaissement POS (Point de vente physique).
// Crée une commande immédiate (status = paid), décrémente le stock,
// et journalise les mouvements sale_pos.
export async function POST(request) {
  try {
    await requireAdmin();

    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { data: null, error: 'JSON invalide' },
        { status: 400 },
      );
    }

    const parsed = posCheckoutSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: 'Payload invalide', issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const input = parsed.data;

    // Look-up variants et validation stock disponible
    const variantIds = input.items.map((i) => i.variantId);
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: {
        product: true,
        stockItem: true,
      },
    });

    const byId = new Map(variants.map((v) => [v.id, v]));

    // Vérification cohérence + calcul prix
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

      const available =
        (v.stockItem?.onHand || 0) - (v.stockItem?.reserved || 0);
      if (available < line.quantity) {
        return NextResponse.json(
          {
            data: null,
            error: `Stock insuffisant pour ${v.product.name} : demande ${line.quantity}, dispo ${available}`,
          },
          { status: 400 },
        );
      }

      const unitPrice = v.priceOverride ?? v.product.basePrice;
      const lineTotal = unitPrice * line.quantity;
      subtotal += lineTotal;

      orderItems.push({
        variantId: v.id,
        productName: v.product.name,
        variantLabel: v.size || v.color || null,
        unitPrice,
        quantity: line.quantity,
      });
    }

    // Création de la commande en transaction
    const number = await generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          number,
          userId: null, // POS = vente anonyme
          guestEmail: null,
          status: 'paid', // Paiement immédiat
          subtotal,
          shippingCost: 0, // Pas de frais de port en magasin
          discountTotal: 0,
          taxTotal: 0,
          total: subtotal,
          currency: 'EUR',
          shippingAddress: null, // Vente en magasin
          billingAddress: null,
          stripeSessionId: null,
          stripePaymentIntentId: null,
          couponCode: null,
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      // Enregistrer les mouvements de stock POS
      for (const line of input.items) {
        await recordPOSSale({
          variantId: line.variantId,
          quantity: line.quantity,
          orderId: created.id,
        });
      }

      return created;
    });

    return NextResponse.json({
      data: {
        orderId: order.id,
        orderNumber: order.number,
        total: order.total,
      },
      error: null,
    });
  } catch (err) {
    console.error('[POS checkout]', err);
    return NextResponse.json(
      { data: null, error: err.message || 'Erreur serveur' },
      { status: 500 },
    );
  }
}

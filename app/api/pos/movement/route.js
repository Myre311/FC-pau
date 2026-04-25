import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

import { prisma } from '@/lib/prisma';
import { posMovementSchema } from '@/lib/validations/pos';

export const dynamic = 'force-dynamic';

// =====================================================================
// Webhook POS — réception des mouvements caisse physique.
// Authentifié via signature HMAC-SHA256 (header X-POS-Signature) avec
// le secret POS_WEBHOOK_SECRET partagé entre le club et l'agrégateur.
//
// Idempotent : externalId fourni par le POS sert de clé. Si déjà vu,
// on accuse réception sans rejouer.
// =====================================================================

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  // Comparaison constant-time pour éviter les timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signatureHeader, 'hex'),
    );
  } catch {
    return false;
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-pos-signature');
  const secret = process.env.POS_WEBHOOK_SECRET;

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json(
      { data: null, error: 'Signature invalide' },
      { status: 401 },
    );
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { data: null, error: 'JSON invalide' },
      { status: 400 },
    );
  }

  const parsed = posMovementSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.issues[0]?.message ?? 'Champs invalides' },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // Idempotence : on stocke externalId dans StockMovement.sourceRef
  // et on vérifie qu'il n'existe pas déjà.
  const existing = await prisma.stockMovement.findFirst({
    where: { source: 'pos', sourceRef: input.externalId },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ data: { received: true, dedup: true }, error: null });
  }

  const variant = await prisma.productVariant.findUnique({
    where: { sku: input.sku },
    select: { id: true },
  });
  if (!variant) {
    return NextResponse.json(
      { data: null, error: `SKU inconnu : ${input.sku}` },
      { status: 404 },
    );
  }

  const occurredAt = input.occurredAt ? new Date(input.occurredAt) : new Date();

  await prisma.$transaction([
    prisma.stockItem.upsert({
      where: { variantId: variant.id },
      update: { onHand: { increment: input.quantity } },
      create: { variantId: variant.id, onHand: Math.max(0, input.quantity) },
    }),
    prisma.stockMovement.create({
      data: {
        variantId: variant.id,
        type: input.type,
        quantity: input.quantity,
        source: 'pos',
        sourceRef: input.externalId,
        note: input.note ?? input.source ?? null,
        occurredAt,
      },
    }),
  ]);

  return NextResponse.json({ data: { received: true }, error: null });
}

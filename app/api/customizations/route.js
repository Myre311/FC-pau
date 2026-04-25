import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { customizationInputSchema } from '@/lib/validations/customization';

export const dynamic = 'force-dynamic';

// POST /api/customizations
// Crée une JerseyCustomization. Liée au User si connecté (visible
// dans /compte/personnalisations), sinon orpheline (rattachée à
// l'OrderItem au moment du checkout via metadata Stripe).
//
// Au moins un de { name, number } doit être fourni — sinon il n'y
// a rien à flocker.
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

  const parsed = customizationInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.issues[0]?.message ?? 'Champs invalides' },
      { status: 400 },
    );
  }
  const input = parsed.data;

  if (!input.name && input.number == null) {
    return NextResponse.json(
      { data: null, error: 'Renseignez au moins un nom ou un numéro' },
      { status: 400 },
    );
  }

  // Vérifier que le produit existe et est customizable
  const product = await prisma.product.findUnique({
    where: { slug: input.productSlug },
    select: { id: true, customizable: true, status: true },
  });
  if (!product || product.status !== 'active' || !product.customizable) {
    return NextResponse.json(
      { data: null, error: 'Produit non personnalisable' },
      { status: 400 },
    );
  }

  const session = await getCurrentUser().catch(() => null);

  const customization = await prisma.jerseyCustomization.create({
    data: {
      userId: session?.dbUser.id ?? null,
      variantId: input.variantId ?? null,
      name: input.name ?? null,
      number: input.number ?? null,
      font: input.font,
    },
  });

  return NextResponse.json({
    data: { id: customization.id },
    error: null,
  });
}

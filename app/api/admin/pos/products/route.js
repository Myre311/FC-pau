import { NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Liste des produits actifs pour le POS (Point de vente physique).
// Retourne tous les produits avec leurs variants et le stock disponible.
export async function GET() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      where: { status: 'active' },
      include: {
        category: true,
        variants: {
          include: {
            stockItem: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ data: products, error: null });
  } catch (err) {
    console.error('[POS products]', err);
    return NextResponse.json(
      { data: null, error: 'Erreur serveur' },
      { status: 500 },
    );
  }
}

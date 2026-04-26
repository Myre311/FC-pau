import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ data: { articles: [], products: [], players: [] } });
    }

    const searchTerm = `%${query}%`;

    // Recherche parallèle dans articles, produits et joueurs
    const [articles, products, players] = await Promise.all([
      // Articles publiés
      prisma.article.findMany({
        where: {
          publishedAt: { not: null },
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImageUrl: true,
          category: true,
        },
        take: 5,
      }),

      // Produits actifs
      prisma.product.findMany({
        where: {
          status: 'active',
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          images: true,
          basePrice: true,
        },
        take: 5,
      }),

      // Joueurs actifs
      prisma.player.findMany({
        where: {
          active: true,
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          slug: true,
          firstName: true,
          lastName: true,
          position: true,
          shirtNumber: true,
          photoUrl: true,
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      data: { articles, products, players },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche' },
      { status: 500 }
    );
  }
}

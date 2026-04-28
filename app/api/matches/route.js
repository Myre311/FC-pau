import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      where: {
        kickoffAt: { gte: new Date() },
        status: { in: ['scheduled', 'live'] },
      },
      orderBy: { kickoffAt: 'asc' },
      take: 20,
    });

    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Erreur chargement matchs:', error);
    return NextResponse.json({ matches: [] }, { status: 500 });
  }
}

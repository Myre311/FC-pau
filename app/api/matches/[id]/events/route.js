import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const events = await prisma.matchEvent.findMany({
      where: { matchId: id },
      orderBy: { minute: 'asc' },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Match events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch match events' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

import { purgeExpiredReservations } from '@/lib/stock';

// Vercel Cron — toutes les 5 min (cf. vercel.json).
// Vercel envoie un header `Authorization: Bearer <CRON_SECRET>` que
// l'on peut comparer à process.env.CRON_SECRET. En dev local, on
// laisse ouvert (pas de CRON_SECRET défini).

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 },
      );
    }
  }

  const purged = await purgeExpiredReservations();

  return NextResponse.json({
    data: { purged, at: new Date().toISOString() },
    error: null,
  });
}

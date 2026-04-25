import { NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Export CSV des abonnés newsletter — réservé admin.
// On ne renvoie pas les abonnés désinscrits (RGPD : on les conserve
// uniquement pour ne pas re-démarcher).
export async function GET(request) {
  await requireAdmin();

  const url = new URL(request.url);
  const segment = url.searchParams.get('segment'); // optionnel

  const where = {
    unsubscribedAt: null,
    ...(segment ? { segments: { has: segment } } : {}),
  };

  const subs = await prisma.newsletterSubscriber.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const header = 'email,segments,confirmed,source,created_at';
  const rows = subs.map((s) =>
    [
      s.email,
      s.segments.join('|'),
      s.confirmedAt ? 'yes' : 'no',
      s.source ?? '',
      s.createdAt.toISOString(),
    ]
      .map(escapeCsv)
      .join(','),
  );

  const body = [header, ...rows].join('\n');
  const filename = `newsletter-${new Date().toISOString().slice(0, 10)}${
    segment ? `-${segment}` : ''
  }.csv`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

function escapeCsv(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

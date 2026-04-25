import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { newsletterSchema } from '@/lib/validations/newsletter';

export const dynamic = 'force-dynamic';

// POST /api/newsletter/subscribe
// Crée ou met à jour un NewsletterSubscriber (idempotent par email).
// Phase ulterieure : envoi du double opt-in via Resend.
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

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: parsed.error.issues[0]?.message ?? 'Champs invalides' },
      { status: 400 },
    );
  }
  const { email, segments, source } = parsed.data;

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {
      segments,
      source,
      // Si désinscrit puis réinscrit, on remet à null
      unsubscribedAt: null,
    },
    create: {
      email,
      segments,
      source,
      // confirmedAt sera set par le double opt-in (lien email)
    },
  });

  return NextResponse.json({ data: { received: true }, error: null });
}

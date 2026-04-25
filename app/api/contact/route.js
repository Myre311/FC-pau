import { NextResponse } from 'next/server';

import { contactSchema } from '@/lib/validations/contact';

// V1 : on log + on accuse réception. Phase ulterieure : envoi vers Resend
// (ou autre transactional email) + persistance Supabase si on veut un
// historique côté admin.
export const dynamic = 'force-dynamic';

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

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: 'Champs invalides', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Anti-spam : honeypot
  if (parsed.data.website) {
    return NextResponse.json({ data: { received: true }, error: null });
  }

  // eslint-disable-next-line no-console
  console.info('[contact] nouveau message', {
    from: parsed.data.email,
    topic: parsed.data.topic,
    name: `${parsed.data.firstName} ${parsed.data.lastName}`,
    length: parsed.data.message.length,
  });

  return NextResponse.json({ data: { received: true }, error: null });
}

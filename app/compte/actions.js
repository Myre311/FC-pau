'use server';

import { revalidatePath } from 'next/cache';

import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { addressInputSchema, profileSchema } from '@/lib/validations/account';

// =====================================================================
// Server Actions /compte — toutes vérifient la session via requireUser.
// Les opérations sur les ressources (adresse, profil) garantissent que
// le user courant en est le propriétaire.
// =====================================================================

function parseFormBoolean(value) {
  return value === 'on' || value === 'true' || value === true;
}

export async function createAddressAction(formData) {
  const { dbUser } = await requireUser();

  const parsed = addressInputSchema.safeParse({
    type: formData.get('type') ?? 'shipping',
    label: formData.get('label') || null,
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    line1: formData.get('line1'),
    line2: formData.get('line2') || null,
    postalCode: formData.get('postalCode'),
    city: formData.get('city'),
    country: formData.get('country') || 'FR',
    phone: formData.get('phone') || null,
    isDefault: parseFormBoolean(formData.get('isDefault')),
  });
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message ?? 'Champs invalides' };
  }

  // Si on coche isDefault, on désactive le défaut précédent du même type
  if (parsed.data.isDefault) {
    await prisma.address.updateMany({
      where: { userId: dbUser.id, type: parsed.data.type, isDefault: true },
      data: { isDefault: false },
    });
  }

  await prisma.address.create({
    data: { ...parsed.data, userId: dbUser.id },
  });

  revalidatePath('/compte/adresses');
  return { success: true };
}

export async function updateAddressAction(formData) {
  const { dbUser } = await requireUser();
  const id = formData.get('id');
  if (typeof id !== 'string' || !id) return { error: 'Adresse introuvable' };

  const existing = await prisma.address.findUnique({ where: { id } });
  if (!existing || existing.userId !== dbUser.id) {
    return { error: 'Adresse introuvable' };
  }

  const parsed = addressInputSchema.safeParse({
    type: formData.get('type') ?? existing.type,
    label: formData.get('label') || null,
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    line1: formData.get('line1'),
    line2: formData.get('line2') || null,
    postalCode: formData.get('postalCode'),
    city: formData.get('city'),
    country: formData.get('country') || 'FR',
    phone: formData.get('phone') || null,
    isDefault: parseFormBoolean(formData.get('isDefault')),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }

  if (parsed.data.isDefault && !existing.isDefault) {
    await prisma.address.updateMany({
      where: {
        userId: dbUser.id,
        type: parsed.data.type,
        isDefault: true,
        id: { not: existing.id },
      },
      data: { isDefault: false },
    });
  }

  await prisma.address.update({ where: { id }, data: parsed.data });
  revalidatePath('/compte/adresses');
  return { success: true };
}

export async function deleteAddressAction(formData) {
  const { dbUser } = await requireUser();
  const id = formData.get('id');
  if (typeof id !== 'string' || !id) return { error: 'Adresse introuvable' };

  const existing = await prisma.address.findUnique({ where: { id } });
  if (!existing || existing.userId !== dbUser.id) return { error: 'Adresse introuvable' };

  await prisma.address.delete({ where: { id } });
  revalidatePath('/compte/adresses');
  return { success: true };
}

export async function updateProfileAction(formData) {
  const { dbUser } = await requireUser();

  const parsed = profileSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone') || null,
    newsletterOptIn: parseFormBoolean(formData.get('newsletterOptIn')),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: parsed.data,
  });

  revalidatePath('/compte');
  revalidatePath('/compte/infos');
  return { success: true };
}

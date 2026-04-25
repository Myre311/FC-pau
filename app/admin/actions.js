'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// =====================================================================
// Server Actions admin — toutes derrière requireAdmin.
// Mutations critiques (statut commande, stock, produit, partenaire,
// coupon, etc.). Validations Zod systématiques.
// =====================================================================

const ORDER_STATUSES = ['pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded'];

export async function updateOrderStatusAction(formData) {
  await requireAdmin();
  const id = formData.get('id');
  const status = formData.get('status');
  if (typeof id !== 'string' || !ORDER_STATUSES.includes(status)) {
    return { error: 'Paramètres invalides' };
  }

  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath('/admin/commandes');
  revalidatePath(`/admin/commandes/${id}`);
  return { success: true };
}

// ---- Produits -------------------------------------------------------

const productInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug : minuscules, chiffres et tirets uniquement'),
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000).optional().nullable(),
  basePrice: z.number().int().nonnegative().max(100000000),
  status: z.enum(['draft', 'active', 'archived']),
  featured: z.boolean().default(false),
  customizable: z.boolean().default(false),
  categoryId: z.string().optional().nullable(),
});

function parseProductForm(formData) {
  return productInputSchema.safeParse({
    slug: formData.get('slug')?.trim(),
    name: formData.get('name'),
    description: formData.get('description') || null,
    basePrice: Math.round(Number(formData.get('basePriceEuros') ?? 0) * 100),
    status: formData.get('status'),
    featured: formData.get('featured') === 'on',
    customizable: formData.get('customizable') === 'on',
    categoryId: formData.get('categoryId') || null,
  });
}

export async function createProductAction(formData) {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }
  try {
    const product = await prisma.product.create({ data: parsed.data });
    revalidatePath('/admin/produits');
    return { success: true, id: product.id, slug: product.slug };
  } catch (err) {
    if (err?.code === 'P2002') return { error: 'Slug déjà utilisé' };
    return { error: 'Erreur création' };
  }
}

export async function updateProductAction(formData) {
  await requireAdmin();
  const id = formData.get('id');
  if (typeof id !== 'string' || !id) return { error: 'Produit introuvable' };

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }

  try {
    await prisma.product.update({ where: { id }, data: parsed.data });
    revalidatePath('/admin/produits');
    revalidatePath(`/admin/produits/${id}`);
    return { success: true };
  } catch (err) {
    if (err?.code === 'P2002') return { error: 'Slug déjà utilisé' };
    return { error: 'Erreur mise à jour' };
  }
}

// ---- Stock ----------------------------------------------------------

const stockAdjustSchema = z.object({
  variantId: z.string().min(1),
  delta: z.number().int(),
  note: z.string().trim().max(200).optional().nullable(),
});

export async function adjustStockAction(formData) {
  const { dbUser } = await requireAdmin();

  const parsed = stockAdjustSchema.safeParse({
    variantId: formData.get('variantId'),
    delta: parseInt(formData.get('delta') ?? '0', 10),
    note: formData.get('note') || null,
  });
  if (!parsed.success || parsed.data.delta === 0) {
    return { error: 'Saisie invalide' };
  }
  const { variantId, delta, note } = parsed.data;

  await prisma.$transaction([
    prisma.stockItem.upsert({
      where: { variantId },
      update: { onHand: { increment: delta } },
      create: { variantId, onHand: Math.max(0, delta) },
    }),
    prisma.stockMovement.create({
      data: {
        variantId,
        type: delta > 0 ? 'restock' : 'adjustment',
        quantity: delta,
        source: 'admin',
        sourceRef: dbUser.id,
        note,
      },
    }),
  ]);

  revalidatePath('/admin/stock');
  return { success: true };
}

// ---- Codes promo ----------------------------------------------------

const couponSchema = z.object({
  code: z.string().trim().min(2).max(40).toUpperCase(),
  type: z.enum(['percent', 'fixed']),
  value: z.number().int().positive(),
  minSubtotal: z.number().int().nonnegative().optional().nullable(),
  active: z.boolean().default(true),
});

export async function upsertCouponAction(formData) {
  await requireAdmin();

  const parsed = couponSchema.safeParse({
    code: (formData.get('code') ?? '').toString().trim(),
    type: formData.get('type'),
    value: parseInt(formData.get('value') ?? '0', 10),
    minSubtotal: formData.get('minSubtotalEuros')
      ? Math.round(Number(formData.get('minSubtotalEuros')) * 100)
      : null,
    active: formData.get('active') === 'on',
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }

  await prisma.coupon.upsert({
    where: { code: parsed.data.code },
    update: parsed.data,
    create: parsed.data,
  });
  revalidatePath('/admin/codes-promo');
  return { success: true };
}

export async function deleteCouponAction(formData) {
  await requireAdmin();
  const id = formData.get('id');
  if (typeof id !== 'string') return { error: 'Code introuvable' };
  await prisma.coupon.delete({ where: { id } });
  revalidatePath('/admin/codes-promo');
  return { success: true };
}

// ---- Partenaires ----------------------------------------------------

const partnerSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1).max(120),
  tier: z.enum(['premium', 'officiel', 'local']),
  logoUrl: z.string().trim().min(1).max(500),
  websiteUrl: z.string().trim().url().max(500).optional().nullable(),
  description: z.string().trim().max(1000).optional().nullable(),
  position: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export async function upsertPartnerAction(formData) {
  await requireAdmin();
  const parsed = partnerSchema.safeParse({
    slug: formData.get('slug'),
    name: formData.get('name'),
    tier: formData.get('tier'),
    logoUrl: formData.get('logoUrl'),
    websiteUrl: formData.get('websiteUrl') || null,
    description: formData.get('description') || null,
    position: parseInt(formData.get('position') ?? '0', 10),
    active: formData.get('active') === 'on',
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Champs invalides' };
  }

  await prisma.partner.upsert({
    where: { slug: parsed.data.slug },
    update: parsed.data,
    create: parsed.data,
  });
  revalidatePath('/admin/partenaires');
  revalidatePath('/partenaires');
  return { success: true };
}

export async function deletePartnerAction(formData) {
  await requireAdmin();
  const id = formData.get('id');
  if (typeof id !== 'string') return { error: 'Partenaire introuvable' };
  await prisma.partner.delete({ where: { id } });
  revalidatePath('/admin/partenaires');
  revalidatePath('/partenaires');
  return { success: true };
}

import { z } from 'zod';

// Webhook POS générique — couvre Square, Lightspeed, et tout
// agrégateur custom. Le client choisira le POS final (info ouverte
// dans PLAN_FC_PAU.md §9). Pour V1, on accepte le format suivant :

export const posMovementSchema = z.object({
  // Identifiant idempotent du mouvement (fourni par le POS) — évite
  // les doublons en cas de re-livraison du webhook
  externalId: z.string().min(1).max(120),
  sku: z.string().min(1).max(60),
  type: z.enum(['sale_pos', 'return_pos', 'restock', 'adjustment']),
  quantity: z.number().int(),
  // Référence terminal / vendeur / opérateur
  source: z.string().max(120).optional().nullable(),
  note: z.string().max(200).optional().nullable(),
  occurredAt: z.string().datetime().optional(),
});

// Schema pour le checkout POS interne (interface admin)
export const posCheckoutSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  paymentMethod: z.enum(['card', 'cash', 'check']),
});

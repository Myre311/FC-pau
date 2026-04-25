import { z } from 'zod';

// Schémas Zod pour les frontières API checkout.
// Tout input client passe par ces parsers — jamais de confiance directe.

export const addressSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional().nullable(),
  postalCode: z.string().trim().min(2).max(20),
  city: z.string().trim().min(1).max(120),
  country: z.string().trim().length(2).default('FR'),
  phone: z.string().trim().max(40).optional().nullable(),
});

export const cartLineSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().positive().max(20),
});

export const checkoutIntentSchema = z.object({
  email: z.string().trim().email().max(120),
  items: z.array(cartLineSchema).min(1).max(50),
  shipping: addressSchema,
  billingSameAsShipping: z.boolean().default(true),
  billing: addressSchema.optional(),
  couponCode: z.string().trim().max(40).optional().nullable(),
  sessionId: z.string().min(1).max(120),
});

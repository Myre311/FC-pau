import { z } from 'zod';

export const addressInputSchema = z.object({
  type: z.enum(['shipping', 'billing']).default('shipping'),
  label: z.string().trim().max(40).optional().nullable(),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional().nullable(),
  postalCode: z.string().trim().min(2).max(20),
  city: z.string().trim().min(1).max(120),
  country: z.string().trim().length(2).default('FR'),
  phone: z.string().trim().max(40).optional().nullable(),
  isDefault: z.boolean().default(false),
});

export const profileSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  phone: z.string().trim().max(40).optional().nullable(),
  newsletterOptIn: z.boolean().default(false),
});

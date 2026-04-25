import { z } from 'zod';

import { MIN_NUMBER, MAX_NUMBER, MAX_NAME_LENGTH } from '@/lib/customization';

export const customizationInputSchema = z.object({
  productSlug: z.string().min(1).max(120),
  variantId: z.string().min(1).optional().nullable(),
  name: z.string().trim().max(MAX_NAME_LENGTH).optional().nullable(),
  number: z.number().int().min(MIN_NUMBER).max(MAX_NUMBER).optional().nullable(),
  font: z.enum(['club', 'stadium', 'vintage']).default('club'),
});

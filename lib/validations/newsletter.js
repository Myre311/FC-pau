import { z } from 'zod';

export const NEWSLETTER_SEGMENTS = [
  { value: 'matchday', label: 'Matchday', desc: 'Composition, billetterie, bilan match' },
  { value: 'shop', label: 'Boutique', desc: 'Drops produits, promotions, exclus' },
  { value: 'partners', label: 'Partenaires', desc: 'Programmes hospitalité et offres' },
  { value: 'all', label: 'Tout recevoir', desc: 'L’ensemble des publications du club' },
];

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(120),
  segments: z
    .array(z.enum(['matchday', 'shop', 'partners', 'all']))
    .min(1, 'Choisissez au moins une thématique'),
  source: z.string().max(40).optional().default('modal'),
});

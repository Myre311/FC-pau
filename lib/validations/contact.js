import { z } from 'zod';

export const CONTACT_TOPICS = [
  { value: 'general', label: 'Question générale' },
  { value: 'shop', label: 'Boutique / commande' },
  { value: 'tickets', label: 'Billetterie' },
  { value: 'partners', label: 'Partenariats' },
  { value: 'press', label: 'Presse' },
  { value: 'foundation', label: 'Fondation' },
];

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  topic: z.enum(CONTACT_TOPICS.map((t) => t.value)),
  message: z.string().trim().min(20).max(4000),
  // Honeypot — doit rester vide
  website: z.string().max(0).optional(),
});

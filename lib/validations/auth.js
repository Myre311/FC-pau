import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email().max(120),
  password: z.string().min(8).max(200),
});

export const signupSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  password: z
    .string()
    .min(10, 'Au moins 10 caractères')
    .max(200)
    .regex(/[A-Z]/, 'Au moins une majuscule')
    .regex(/[a-z]/, 'Au moins une minuscule')
    .regex(/[0-9]/, 'Au moins un chiffre'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Acceptation des CGV requise" }),
  }),
});

export const passwordResetSchema = z.object({
  email: z.string().trim().email().max(120),
});

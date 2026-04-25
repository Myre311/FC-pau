'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { createSupabaseServer } from '@/lib/supabase/server';
import { loginSchema, signupSchema, passwordResetSchema } from '@/lib/validations/auth';

// =====================================================================
// Server Actions auth — appelées depuis les forms (auth) et le bouton
// déconnexion. Retournent { error } en cas d'échec, ou redirigent.
// =====================================================================

const ERROR_FR = {
  invalid_credentials: 'Email ou mot de passe incorrect.',
  email_not_confirmed: "Email non confirmé. Vérifiez votre boîte mail.",
  user_already_exists: 'Un compte existe déjà avec cet email.',
  signup_disabled: "L'inscription est temporairement désactivée.",
  weak_password: 'Mot de passe trop faible.',
  over_email_send_rate_limit: 'Trop de tentatives. Réessayez dans quelques minutes.',
};

function translateError(message) {
  if (!message) return 'Erreur inconnue';
  const lower = message.toLowerCase();
  if (lower.includes('invalid login credentials')) return ERROR_FR.invalid_credentials;
  if (lower.includes('email not confirmed')) return ERROR_FR.email_not_confirmed;
  if (lower.includes('already registered')) return ERROR_FR.user_already_exists;
  if (lower.includes('signups not allowed')) return ERROR_FR.signup_disabled;
  if (lower.includes('weak password')) return ERROR_FR.weak_password;
  if (lower.includes('rate limit')) return ERROR_FR.over_email_send_rate_limit;
  return message;
}

export async function loginAction(formData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: 'Champs invalides.' };
  }

  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: translateError(error.message) };

  const next = formData.get('next');
  redirect(typeof next === 'string' && next.startsWith('/') ? next : '/compte');
}

export async function signupAction(formData) {
  const parsed = signupSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    acceptTerms: formData.get('acceptTerms') === 'on',
  });
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message ?? 'Champs invalides.' };
  }

  const supabase = createSupabaseServer();
  const { firstName, lastName, email, password } = parsed.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/compte`,
    },
  });
  if (error) return { error: translateError(error.message) };

  return { success: true };
}

export async function logoutAction() {
  const supabase = createSupabaseServer();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function passwordResetAction(formData) {
  const parsed = passwordResetSchema.safeParse({
    email: formData.get('email'),
  });
  if (!parsed.success) return { error: 'Email invalide.' };

  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/compte`,
  });
  if (error) return { error: translateError(error.message) };

  return { success: true };
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { AuthFormField } from '@/components/auth/AuthFormField';
import { signupAction } from '@/app/(auth)/actions';

export function SignupForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    const result = await signupAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    if (result?.success) {
      setSuccess(true);
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="border border-pau-yellow/40 bg-pau-yellow/5 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          Inscription en attente
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase leading-crush tracking-tightest">
          Vérifiez vos emails
        </h2>
        <p className="mt-4 font-sans text-sm text-white/70">
          Un email de confirmation vient de partir. Cliquez sur le lien pour
          activer votre compte et accéder à votre espace.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <AuthFormField label="Prénom" name="firstName" autoComplete="given-name" />
        <AuthFormField label="Nom" name="lastName" autoComplete="family-name" />
      </div>
      <AuthFormField label="Email" name="email" type="email" autoComplete="email" />
      <AuthFormField
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={10}
        hint="Au moins 10 caractères, avec majuscule, minuscule et chiffre"
      />

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="acceptTerms"
          required
          className="mt-1 h-4 w-4 flex-none border-white/30 bg-transparent text-pau-yellow accent-jaune"
        />
        <span className="font-sans text-white/70">
          J&apos;accepte les{' '}
          <Link href="/cgv" className="text-pau-yellow hover:underline">
            CGV
          </Link>{' '}
          et la{' '}
          <Link href="/rgpd" className="text-pau-yellow hover:underline">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {error && (
        <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" cornerCut disabled={pending} className="w-full">
        {pending ? 'Création en cours…' : 'Créer mon compte'}
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { AuthFormField } from '@/components/auth/AuthFormField';
import { loginAction } from '@/app/(auth)/actions';

export function LoginForm({ next }) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    if (next) formData.set('next', next);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
    // Sinon, redirect a deja eu lieu cote serveur
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <AuthFormField label="Email" name="email" type="email" autoComplete="email" />
      <AuthFormField
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="current-password"
        minLength={8}
      />

      {error && (
        <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" cornerCut disabled={pending} className="w-full">
        {pending ? 'Connexion en cours…' : 'Se connecter'}
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { AuthFormField } from '@/components/auth/AuthFormField';
import { passwordResetAction } from '@/app/(auth)/actions';

export default function MotDePasseOubliePage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function action(formData) {
    setError(null);
    setStatus('pending');
    const result = await passwordResetAction(formData);
    if (result?.error) {
      setError(result.error);
      setStatus('idle');
      return;
    }
    setStatus('sent');
  }

  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">Récupération</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
        Mot de passe<br />oublié
      </h1>

      {status === 'sent' ? (
        <div className="mt-8 border border-pau-yellow/40 bg-pau-yellow/5 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
            Email envoyé
          </p>
          <p className="mt-3 font-sans text-sm text-white/70">
            Si un compte existe pour cet email, un lien de réinitialisation
            vient de partir. Vérifiez vos emails (et vos spams).
          </p>
        </div>
      ) : (
        <>
          <p className="mt-4 font-sans text-sm text-white/60">
            Renseignez votre email, nous vous enverrons un lien de
            réinitialisation.
          </p>

          <form action={action} className="mt-10 space-y-5" noValidate>
            <AuthFormField label="Email" name="email" type="email" autoComplete="email" />

            {error && (
              <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              cornerCut
              disabled={status === 'pending'}
              className="w-full"
            >
              {status === 'pending' ? 'Envoi…' : 'Envoyer le lien'}
            </Button>
          </form>
        </>
      )}

      <div className="mt-8 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        <Link href="/connexion" className="text-white/60 hover:text-pau-yellow">
          ← Retour connexion
        </Link>
      </div>
    </div>
  );
}

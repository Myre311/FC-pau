'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { updateProfileAction } from '@/app/compte/actions';

export function ProfileForm({ user }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function action(formData) {
    setError(null);
    setStatus('pending');
    const result = await updateProfileAction(formData);
    if (result?.error) {
      setError(result.error);
      setStatus('idle');
      return;
    }
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Prénom" name="firstName" defaultValue={user.firstName ?? ''} autoComplete="given-name" />
        <Field label="Nom" name="lastName" defaultValue={user.lastName ?? ''} autoComplete="family-name" />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        defaultValue={user.email}
        disabled
        hint="Pour changer d'email, contactez le support."
      />

      <Field label="Téléphone" name="phone" type="tel" required={false} defaultValue={user.phone ?? ''} autoComplete="tel" />

      <label className="flex items-start gap-3 border-t border-blanc/10 pt-5">
        <input
          type="checkbox"
          name="newsletterOptIn"
          defaultChecked={user.newsletterOptIn}
          className="mt-1 h-4 w-4 flex-none border-blanc/30 bg-transparent accent-jaune"
        />
        <span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-blanc">
            Newsletter Pau FC
          </span>
          <span className="mt-1 block font-sans text-sm text-blanc/60">
            Matchday, drops boutique, infos club. Désinscription en un clic
            depuis chaque email.
          </span>
        </span>
      </label>

      {error && (
        <p className="border border-jaune/40 bg-jaune/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-jaune">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-blanc/10 pt-5">
        <Button type="submit" variant="primary" size="md" cornerCut disabled={status === 'pending'}>
          {status === 'pending' ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        {status === 'saved' && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            Enregistré ✓
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', defaultValue, autoComplete, required = true, hint, disabled }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
        {required && !disabled && <span className="ml-1 text-jaune">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required={required && !disabled}
        disabled={disabled}
        className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune disabled:opacity-50"
      />
      {hint && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.15em] text-blanc/40">
          {hint}
        </span>
      )}
    </label>
  );
}

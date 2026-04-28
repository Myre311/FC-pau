'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  createAddressAction,
  updateAddressAction,
} from '@/app/compte/actions';

const COUNTRIES = [
  { code: 'FR', label: 'France' },
  { code: 'BE', label: 'Belgique' },
  { code: 'CH', label: 'Suisse' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'ES', label: 'Espagne' },
];

export function AddressForm({ address, onCancel, onSuccess }) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    const result = address
      ? await updateAddressAction(formData)
      : await createAddressAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    setPending(false);
    onSuccess?.();
  }

  return (
    <form action={action} className="space-y-4">
      {address && <input type="hidden" name="id" defaultValue={address.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Libellé (optionnel)" name="label" defaultValue={address?.label ?? ''} required={false} placeholder="Maison, Bureau…" />
        <Select label="Type" name="type" defaultValue={address?.type ?? 'shipping'}>
          <option value="shipping">Livraison</option>
          <option value="billing">Facturation</option>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Prénom" name="firstName" defaultValue={address?.firstName ?? ''} autoComplete="given-name" />
        <Field label="Nom" name="lastName" defaultValue={address?.lastName ?? ''} autoComplete="family-name" />
      </div>

      <Field label="Adresse" name="line1" defaultValue={address?.line1 ?? ''} autoComplete="address-line1" />
      <Field label="Complément" name="line2" required={false} defaultValue={address?.line2 ?? ''} autoComplete="address-line2" />

      <div className="grid gap-4 md:grid-cols-[1fr_2fr_1fr]">
        <Field label="Code postal" name="postalCode" defaultValue={address?.postalCode ?? ''} autoComplete="postal-code" />
        <Field label="Ville" name="city" defaultValue={address?.city ?? ''} autoComplete="address-level2" />
        <Select label="Pays" name="country" defaultValue={address?.country ?? 'FR'}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <Field label="Téléphone" name="phone" type="tel" required={false} defaultValue={address?.phone ?? ''} autoComplete="tel" />

      <label className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          name="isDefault"
          defaultChecked={address?.isDefault ?? false}
          className="h-4 w-4 flex-none border-white/30 bg-transparent accent-jaune"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
          Adresse par défaut pour ce type
        </span>
      </label>

      {error && (
        <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row">
        <Button type="submit" variant="primary" size="md" cornerCut disabled={pending}>
          {pending ? 'Enregistrement…' : address ? 'Mettre à jour' : 'Ajouter l’adresse'}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', defaultValue, autoComplete, required = true, placeholder }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        {label}
        {required && <span className="ml-1 text-pau-yellow">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="mt-2 block h-11 w-full border border-white/15 bg-transparent px-3 font-sans text-sm text-white outline-none transition-colors focus:border-pau-yellow"
      />
    </label>
  );
}

function Select({ label, name, defaultValue, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 block h-11 w-full border border-white/15 bg-pau-night px-3 font-sans text-sm text-white outline-none transition-colors focus:border-pau-yellow"
      >
        {children}
      </select>
    </label>
  );
}

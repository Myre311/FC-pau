'use client';

import { useState } from 'react';

import { upsertCouponAction, deleteCouponAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

export function CouponManager({ coupons }) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!adding && (
          <Button onClick={() => setAdding(true)} variant="primary" size="md" cornerCut>
            + Nouveau code
          </Button>
        )}
      </div>

      {adding && (
        <div className="border border-blanc/15 p-5">
          <CouponForm onCancel={() => setAdding(false)} onSuccess={() => setAdding(false)} />
        </div>
      )}

      {coupons.length === 0 ? (
        <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
          Aucun code promo configuré.
        </p>
      ) : (
        <ul className="divide-y divide-blanc/10 border border-blanc/10">
          {coupons.map((c) => (
            <li
              key={c.id}
              className="grid gap-2 px-4 py-3 md:grid-cols-[140px_1fr_auto_auto_auto] md:items-center md:gap-4"
            >
              <span className="font-mono text-sm text-blanc">{c.code}</span>
              <span className="font-sans text-sm text-blanc/70">
                {c.type === 'percent'
                  ? `Remise ${c.value}%`
                  : `Remise ${formatPrice(c.value)}`}
                {c.minSubtotal != null && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                    Min {formatPrice(c.minSubtotal)}
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
                {c.usesCount} utilisations
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  c.active ? 'text-jaune' : 'text-blanc/30'
                }`}
              >
                {c.active ? 'Actif' : 'Inactif'}
              </span>
              <form action={deleteCouponAction} className="md:text-right">
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 transition-colors hover:text-blanc"
                >
                  Supprimer
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CouponForm({ onCancel, onSuccess }) {
  const [type, setType] = useState('percent');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    const result = await upsertCouponAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    setPending(false);
    onSuccess?.();
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Code"
          name="code"
          required
          hint="Sera mis en majuscules"
        />
        <Select
          label="Type"
          name="type"
          value={type}
          onChange={setType}
        >
          <option value="percent">Pourcentage</option>
          <option value="fixed">Montant fixe</option>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label={type === 'percent' ? 'Valeur (%)' : 'Valeur (centimes)'}
          name="value"
          type="number"
          min="1"
          required
          hint={
            type === 'percent'
              ? '10 = -10% sur le panier'
              : '1000 = -10€ (centimes EUR)'
          }
        />
        <Field
          label="Minimum panier (€)"
          name="minSubtotalEuros"
          type="number"
          step="0.01"
          min="0"
          required={false}
        />
      </div>

      <Toggle label="Code actif" name="active" defaultChecked />

      {error && (
        <p className="border border-jaune/40 bg-jaune/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-jaune">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" size="md" cornerCut disabled={pending}>
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50 transition-colors hover:text-blanc"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', required = true, hint, step, min }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
        {required && <span className="ml-1 text-jaune">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        step={step}
        min={min}
        className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
      />
      {hint && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.15em] text-blanc/40">
          {hint}
        </span>
      )}
    </label>
  );
}

function Select({ label, name, value, onChange, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block h-11 w-full border border-blanc/15 bg-nuit px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
      >
        {children}
      </select>
    </label>
  );
}

function Toggle({ label, name, defaultChecked }) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 flex-none border-blanc/30 bg-transparent accent-jaune"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/70">
        {label}
      </span>
    </label>
  );
}

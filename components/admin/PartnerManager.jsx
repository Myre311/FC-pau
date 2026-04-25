'use client';

import { useState } from 'react';

import { upsertPartnerAction, deletePartnerAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';

const TIER_LABELS = {
  premium: 'Premium',
  officiel: 'Officiel',
  local: 'Local',
};

export function PartnerManager({ partners }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!adding && (
          <Button onClick={() => setAdding(true)} variant="primary" size="md" cornerCut>
            + Nouveau partenaire
          </Button>
        )}
      </div>

      {adding && (
        <div className="border border-blanc/15 p-5">
          <PartnerForm
            onCancel={() => setAdding(false)}
            onSuccess={() => setAdding(false)}
          />
        </div>
      )}

      {partners.length === 0 ? (
        <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
          Aucun partenaire enregistré.
        </p>
      ) : (
        <ul className="space-y-3">
          {partners.map((p) =>
            editingId === p.id ? (
              <li key={p.id} className="border border-blanc/15 p-5">
                <PartnerForm
                  partner={p}
                  onCancel={() => setEditingId(null)}
                  onSuccess={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={p.id}
                className="grid gap-3 border border-blanc/10 px-4 py-3 md:grid-cols-[1fr_120px_120px_120px_auto] md:items-center md:gap-4"
              >
                <span className="font-sans text-sm text-blanc">{p.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
                  {TIER_LABELS[p.tier]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
                  Pos {p.position}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    p.active ? 'text-blanc/70' : 'text-blanc/30'
                  }`}
                >
                  {p.active ? 'Actif' : 'Masqué'}
                </span>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingId(p.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60 transition-colors hover:text-jaune"
                  >
                    Modifier
                  </button>
                  <form action={deletePartnerAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 transition-colors hover:text-blanc"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

function PartnerForm({ partner, onCancel, onSuccess }) {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    const result = await upsertPartnerAction(formData);
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
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nom" name="name" defaultValue={partner?.name ?? ''} required />
        <Field
          label="Slug"
          name="slug"
          defaultValue={partner?.slug ?? ''}
          required
          hint="minuscules-tirets-chiffres"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select label="Tier" name="tier" defaultValue={partner?.tier ?? 'local'}>
          <option value="premium">Premium</option>
          <option value="officiel">Officiel</option>
          <option value="local">Local</option>
        </Select>
        <Field
          label="Position"
          name="position"
          type="number"
          min="0"
          defaultValue={partner?.position ?? 0}
          required
        />
        <Toggle label="Actif" name="active" defaultChecked={partner?.active ?? true} />
      </div>

      <Field
        label="URL du logo"
        name="logoUrl"
        defaultValue={partner?.logoUrl ?? ''}
        required
        hint="SVG monochrome de préférence (Supabase Storage)"
      />
      <Field
        label="Site web"
        name="websiteUrl"
        type="url"
        required={false}
        defaultValue={partner?.websiteUrl ?? ''}
      />
      <Field
        label="Description"
        name="description"
        type="textarea"
        required={false}
        defaultValue={partner?.description ?? ''}
      />

      {error && (
        <p className="border border-jaune/40 bg-jaune/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-jaune">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-blanc/10 pt-4">
        <Button type="submit" variant="primary" size="md" cornerCut disabled={pending}>
          {pending ? '…' : partner ? 'Mettre à jour' : 'Créer'}
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

function Field({ label, name, type = 'text', defaultValue, required = true, hint, min }) {
  if (type === 'textarea') {
    return (
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
          {label}
          {required && <span className="ml-1 text-jaune">*</span>}
        </span>
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={3}
          className="mt-2 block w-full resize-y border border-blanc/15 bg-transparent p-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
        />
      </label>
    );
  }
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
        {required && <span className="ml-1 text-jaune">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
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

function Select({ label, name, defaultValue, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
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

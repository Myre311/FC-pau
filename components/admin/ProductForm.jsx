'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createProductAction, updateProductAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';

export function ProductForm({ product, categories }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function action(formData) {
    setError(null);
    setSuccess(false);
    setPending(true);
    if (isEdit) formData.set('id', product.id);

    const result = isEdit
      ? await updateProductAction(formData)
      : await createProductAction(formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    setPending(false);
    setSuccess(true);
    if (!isEdit && result?.id) {
      router.push(`/admin/produits/${result.id}`);
    } else {
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Nom"
          name="name"
          defaultValue={product?.name ?? ''}
          required
        />
        <Field
          label="Slug URL"
          name="slug"
          defaultValue={product?.slug ?? ''}
          required
          hint="Minuscules, chiffres, tirets — ex: maillot-domicile-2026"
        />
      </div>

      <Field
        label="Description"
        name="description"
        defaultValue={product?.description ?? ''}
        required={false}
        type="textarea"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Field
          label="Prix de base (€)"
          name="basePriceEuros"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product ? (product.basePrice / 100).toFixed(2) : ''}
          required
        />
        <Select
          label="Statut"
          name="status"
          defaultValue={product?.status ?? 'draft'}
        >
          <option value="draft">Brouillon</option>
          <option value="active">Publié</option>
          <option value="archived">Archivé</option>
        </Select>
        <Select
          label="Catégorie"
          name="categoryId"
          defaultValue={product?.categoryId ?? ''}
        >
          <option value="">— Aucune —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-gray-200/10 pt-5">
        <Toggle label="Mise en avant" name="featured" defaultChecked={product?.featured ?? false} />
        <Toggle
          label="Personnalisable (flocage)"
          name="customizable"
          defaultChecked={product?.customizable ?? false}
        />
      </div>

      {error && (
        <p className="border border-pau-yellow/40 bg-jaune/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-gray-200/10 pt-5">
        <Button
          type="submit"
          variant="primary"
          size="md"
          cornerCut
          disabled={pending}
        >
          {pending
            ? 'Enregistrement…'
            : isEdit
              ? 'Mettre à jour'
              : 'Créer le produit'}
        </Button>
        {success && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
            Enregistré
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', defaultValue, required = true, hint, step, min }) {
  if (type === 'textarea') {
    return (
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
          {label}
          {required && <span className="ml-1 text-pau-yellow">*</span>}
        </span>
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={5}
          className="mt-2 block w-full resize-y border border-gray-200/15 bg-transparent p-3 font-sans text-sm text-gray-900 outline-none transition-colors focus:border-pau-yellow"
        />
      </label>
    );
  }
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
        {label}
        {required && <span className="ml-1 text-pau-yellow">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        step={step}
        min={min}
        className="mt-2 block h-11 w-full border border-gray-200/15 bg-transparent px-3 font-sans text-sm text-gray-900 outline-none transition-colors focus:border-pau-yellow"
      />
      {hint && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.15em] text-gray-900/40">
          {hint}
        </span>
      )}
    </label>
  );
}

function Select({ label, name, defaultValue, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 block h-11 w-full border border-gray-200/15 bg-white px-3 font-sans text-sm text-gray-900 outline-none transition-colors focus:border-pau-yellow"
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
        className="h-4 w-4 flex-none border-gray-200/30 bg-transparent accent-jaune"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-900/70">
        {label}
      </span>
    </label>
  );
}

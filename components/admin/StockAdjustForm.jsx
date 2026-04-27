'use client';

import { useState } from 'react';

import { adjustStockAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';

export function StockAdjustForm({ variant }) {
  const [open, setOpen] = useState(false);
  const [delta, setDelta] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    formData.set('variantId', variant.id);
    const result = await adjustStockAction(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    setPending(false);
    setOpen(false);
    setDelta('');
    setNote('');
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/60 transition-colors hover:text-pau-yellow"
      >
        Ajuster
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <label className="block">
        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gray-900/50">
          Delta
        </span>
        <input
          name="delta"
          type="number"
          required
          value={delta}
          onChange={(e) => setDelta(e.target.value)}
          placeholder="+10 / -2"
          className="mt-1 block h-9 w-24 border border-gray-200/15 bg-transparent px-2 font-mono text-sm text-gray-900 outline-none transition-colors focus:border-pau-yellow"
        />
      </label>
      <label className="block flex-1 min-w-[140px]">
        <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gray-900/50">
          Note
        </span>
        <input
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="livraison fournisseur…"
          className="mt-1 block h-9 w-full border border-gray-200/15 bg-transparent px-2 font-sans text-sm text-gray-900 outline-none transition-colors focus:border-pau-yellow"
        />
      </label>
      <Button type="submit" variant="primary" size="sm" disabled={pending}>
        {pending ? '…' : 'OK'}
      </Button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40 transition-colors hover:text-gray-900"
      >
        Annuler
      </button>
      {error && (
        <p className="basis-full font-mono text-[10px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}
    </form>
  );
}

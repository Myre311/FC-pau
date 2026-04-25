'use client';

import { useState } from 'react';

import { updateOrderStatusAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';

const STATUSES = [
  { value: 'pending', label: 'En attente' },
  { value: 'paid', label: 'Payée' },
  { value: 'preparing', label: 'En préparation' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
  { value: 'refunded', label: 'Remboursée' },
];

export function OrderStatusForm({ order }) {
  const [status, setStatus] = useState(order.status);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function action(formData) {
    setError(null);
    setPending(true);
    formData.set('id', order.id);
    formData.set('status', status);
    const result = await updateOrderStatusAction(formData);
    if (result?.error) setError(result.error);
    setPending(false);
  }

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
          Statut commande
        </span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-2 block h-11 w-full border border-blanc/15 bg-nuit px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="border border-jaune/40 bg-jaune/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-jaune">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        cornerCut
        disabled={pending || status === order.status}
      >
        {pending ? 'Mise à jour…' : 'Enregistrer'}
      </Button>
    </form>
  );
}

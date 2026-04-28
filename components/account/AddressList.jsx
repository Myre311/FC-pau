'use client';

import { useState } from 'react';

import { AddressForm } from '@/components/account/AddressForm';
import { Button } from '@/components/ui/Button';
import { deleteAddressAction } from '@/app/compte/actions';

export function AddressList({ addresses }) {
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6">
      {addresses.length === 0 && !adding && (
        <div className="border border-dashed border-white/15 p-8 text-center">
          <p className="font-sans text-white/60">
            Vous n&apos;avez pas encore d&apos;adresse enregistrée.
          </p>
          <Button
            onClick={() => setAdding(true)}
            variant="outline"
            size="md"
            className="mt-5"
          >
            Ajouter une adresse
          </Button>
        </div>
      )}

      <ul className="space-y-4">
        {addresses.map((a) =>
          editingId === a.id ? (
            <li key={a.id} className="border border-white/15 p-5">
              <AddressForm
                address={a}
                onCancel={() => setEditingId(null)}
                onSuccess={() => setEditingId(null)}
              />
            </li>
          ) : (
            <li key={a.id} className="border border-white/10 p-5">
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
                    {a.type === 'shipping' ? 'Livraison' : 'Facturation'}
                    {a.isDefault && <span className="ml-2 text-white/60">· Par défaut</span>}
                  </p>
                  {a.label && (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                      {a.label}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(a.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-pau-yellow"
                  >
                    Modifier
                  </button>
                  <form action={deleteAddressAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <button
                      type="submit"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              </header>

              <address className="mt-4 not-italic font-sans text-sm text-white/80">
                <p className="text-white">
                  {a.firstName} {a.lastName}
                </p>
                <p>{a.line1}</p>
                {a.line2 && <p>{a.line2}</p>}
                <p>
                  {a.postalCode} {a.city}
                </p>
                <p>{a.country}</p>
                {a.phone && (
                  <p className="mt-2 font-mono text-xs text-white/60">{a.phone}</p>
                )}
              </address>
            </li>
          ),
        )}
      </ul>

      {adding ? (
        <div className="border border-white/15 p-5">
          <AddressForm
            onCancel={() => setAdding(false)}
            onSuccess={() => setAdding(false)}
          />
        </div>
      ) : (
        addresses.length > 0 && (
          <Button onClick={() => setAdding(true)} variant="outline" size="md">
            + Ajouter une adresse
          </Button>
        )
      )}
    </div>
  );
}

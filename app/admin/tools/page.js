'use client';

import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';

export default function AdminToolsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const seedPartners = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/seed-partners', {
        method: 'POST',
      });
      const { data, error } = await res.json();
      if (error) throw new Error(error);
      setMessage({ type: 'success', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Maintenance"
        title="Outils"
        subtitle="Utilitaires de maintenance et synchronisation"
      />

      <div className="rounded border border-pau-primary/10 bg-white p-6">
        <h2 className="mb-4 font-display text-lg uppercase text-pau-primary">
          Synchronisation des partenaires
        </h2>
        <p className="mb-4 text-sm text-pau-primary/70">
          Insère ou met à jour les 10 partenaires (Joma, Holy, Groupama, etc.) dans la base de données.
        </p>
        <Button
          onClick={seedPartners}
          disabled={loading}
          variant="primary"
          size="md"
        >
          {loading ? 'Synchronisation...' : 'Synchroniser les partenaires'}
        </Button>

        {message && (
          <div
            className={`mt-4 rounded border p-3 ${
              message.type === 'success'
                ? 'border-green-500/30 bg-green-500/10 text-green-700'
                : 'border-red-500/30 bg-red-500/10 text-red-700'
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

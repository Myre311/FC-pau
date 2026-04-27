import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice, formatDate } from '@/lib/format';

export const metadata = { title: 'Commandes' };

const STATUS_FILTERS = [
  { value: 'all', label: 'Toutes' },
  { value: 'paid', label: 'Payées' },
  { value: 'preparing', label: 'En préparation' },
  { value: 'shipped', label: 'Expédiées' },
  { value: 'delivered', label: 'Livrées' },
  { value: 'cancelled', label: 'Annulées' },
  { value: 'refunded', label: 'Remboursées' },
];

export default async function AdminCommandesPage({ searchParams }) {
  const filter = typeof searchParams?.statut === 'string' ? searchParams.statut : 'all';
  const where = filter === 'all' ? {} : { status: filter };

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { items: true, user: true },
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader kicker="Ventes" title="Commandes" />

      <nav aria-label="Filtre statut" className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <Link
              key={f.value}
              href={f.value === 'all' ? '/admin/commandes' : `/admin/commandes?statut=${f.value}`}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                active ? 'bg-jaune text-nuit' : 'border border-gray-200/15 text-gray-900/70 hover:border-gray-200/40'
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </nav>

      <AdminTable
        columns={[
          { key: 'number', label: 'N°', width: '160px' },
          { key: 'date', label: 'Date', width: '140px' },
          { key: 'client', label: 'Client' },
          { key: 'items', label: 'Articles', align: 'right', width: '90px' },
          { key: 'status', label: 'Statut', width: '140px' },
          { key: 'total', label: 'Total', align: 'right', width: '120px' },
        ]}
        rows={orders}
        empty="Aucune commande pour ce filtre"
        mobileCardLabel={(o) => o.number}
        renderRow={(o) => ({
          number: (
            <Link
              href={`/admin/commandes/${o.number}`}
              className="font-mono text-sm text-gray-900 transition-colors hover:text-pau-yellow"
            >
              {o.number}
            </Link>
          ),
          date: <span className="font-mono text-xs text-gray-900/70">{formatDate(o.createdAt)}</span>,
          client: (
            <span className="text-gray-900/85">
              {o.user
                ? `${o.user.firstName ?? ''} ${o.user.lastName ?? ''}`.trim() || o.user.email
                : (o.guestEmail ?? 'Invité')}
            </span>
          ),
          items: <span className="font-mono text-xs">{o.items.length}</span>,
          status: <StatusBadge status={o.status} />,
          total: <span className="font-mono text-sm">{formatPrice(o.total)}</span>,
        })}
      />
    </div>
  );
}

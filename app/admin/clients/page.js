import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { formatPrice, formatDate } from '@/lib/format';

export const metadata = { title: 'Clients' };

export default async function AdminClientsPage({ searchParams }) {
  const q = typeof searchParams?.q === 'string' ? searchParams.q.trim() : '';

  const where = q
    ? {
        role: 'customer',
        OR: [
          { email: { contains: q, mode: 'insensitive' } },
          { firstName: { contains: q, mode: 'insensitive' } },
          { lastName: { contains: q, mode: 'insensitive' } },
        ],
      }
    : { role: 'customer' };

  const customers = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      orders: {
        select: { total: true, status: true, createdAt: true },
      },
    },
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader kicker="Ventes" title="Clients" />

      <form className="flex max-w-md gap-3" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Email, nom, prénom…"
          className="block h-10 w-full border border-blanc/15 bg-transparent px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
        />
        <button
          type="submit"
          className="border border-blanc/20 px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc transition-colors hover:border-jaune hover:text-jaune"
        >
          Rechercher
        </button>
      </form>

      <AdminTable
        columns={[
          { key: 'name', label: 'Client' },
          { key: 'email', label: 'Email' },
          { key: 'orders', label: 'Commandes', align: 'right', width: '110px' },
          { key: 'total', label: 'Total dépensé', align: 'right', width: '140px' },
          { key: 'since', label: 'Inscrit', width: '140px' },
        ]}
        rows={customers}
        empty={q ? 'Aucun client pour cette recherche' : 'Aucun client encore inscrit'}
        mobileCardLabel={(c) => `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() || c.email}
        renderRow={(c) => {
          const total = c.orders
            .filter((o) => ['paid', 'preparing', 'shipped', 'delivered'].includes(o.status))
            .reduce((n, o) => n + o.total, 0);
          return {
            name: (
              <Link
                href={`/admin/clients/${c.id}`}
                className="font-sans text-sm text-blanc transition-colors hover:text-jaune"
              >
                {`${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() || '—'}
              </Link>
            ),
            email: <span className="font-mono text-xs text-blanc/70">{c.email}</span>,
            orders: <span className="font-mono text-sm">{c.orders.length}</span>,
            total: <span className="font-mono text-sm">{formatPrice(total)}</span>,
            since: <span className="font-mono text-xs text-blanc/60">{formatDate(c.createdAt)}</span>,
          };
        }}
      />
    </div>
  );
}

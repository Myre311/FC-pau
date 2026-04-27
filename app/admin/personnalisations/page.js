import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Personnalisations' };

export default async function AdminPersonnalisationsPage() {
  // File de production : on liste les customizations attachées à une
  // OrderItem dont la commande est payée (en attente de production).
  const customizations = await prisma.jerseyCustomization.findMany({
    where: {
      orderItem: {
        order: { status: { in: ['paid', 'preparing'] } },
      },
    },
    orderBy: { createdAt: 'asc' },
    include: {
      orderItem: {
        include: {
          order: { select: { number: true, status: true } },
          variant: { include: { product: true } },
        },
      },
    },
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Production"
        title="File de flocage"
      />

      <p className="font-sans text-sm text-gray-900/60">
        Maillots personnalisés en attente de flocage. Triés par ancienneté.
      </p>

      <AdminTable
        columns={[
          { key: 'order', label: 'Commande', width: '160px' },
          { key: 'product', label: 'Maillot' },
          { key: 'name', label: 'Flocage' },
          { key: 'number', label: 'N°', align: 'right', width: '70px' },
          { key: 'font', label: 'Police', width: '110px' },
          { key: 'date', label: 'Reçu', width: '140px' },
        ]}
        rows={customizations}
        empty="Aucune personnalisation à produire"
        mobileCardLabel={(c) => c.orderItem?.order?.number ?? c.id}
        renderRow={(c) => ({
          order: c.orderItem ? (
            <Link
              href={`/admin/commandes/${c.orderItem.order.number}`}
              className="font-mono text-sm text-gray-900 transition-colors hover:text-pau-yellow"
            >
              {c.orderItem.order.number}
            </Link>
          ) : (
            <span className="text-gray-900/40">—</span>
          ),
          product: (
            <span className="font-sans text-sm text-gray-900">
              {c.orderItem?.variant?.product?.name ?? '—'}
              {c.orderItem?.variant?.size && (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
                  {c.orderItem.variant.size}
                </span>
              )}
            </span>
          ),
          name: (
            <span className="font-display text-base uppercase leading-tight tracking-tightest text-gray-900">
              {c.name ?? 'SANS NOM'}
            </span>
          ),
          number: (
            <span className="font-display text-xl text-pau-yellow">
              {c.number ?? '—'}
            </span>
          ),
          font: (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/70">
              {c.font}
            </span>
          ),
          date: (
            <span className="font-mono text-xs text-gray-900/60">
              {formatDate(c.createdAt)}
            </span>
          ),
        })}
      />
    </div>
  );
}

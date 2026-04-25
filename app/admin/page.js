import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStat } from '@/components/admin/AdminStat';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice, formatDate } from '@/lib/format';

export const metadata = { title: 'Tableau de bord' };

const DAYS_30 = 30 * 24 * 60 * 60 * 1000;

export default async function AdminDashboardPage() {
  const since = new Date(Date.now() - DAYS_30);

  const [
    revenue30dAgg,
    paidOrders30d,
    pendingOrders,
    activeReservations,
    lowStockItems,
    topProducts,
    recentOrders,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ['paid', 'preparing', 'shipped', 'delivered'] }, createdAt: { gte: since } },
    }),
    prisma.order.count({
      where: { status: { in: ['paid', 'preparing', 'shipped', 'delivered'] }, createdAt: { gte: since } },
    }),
    prisma.order.count({ where: { status: 'preparing' } }),
    prisma.cartReservation.count({ where: { expiresAt: { gt: new Date() } } }),
    // Comparaison field-à-field pas supportée en where Prisma — on tire
    // les lignes minimales et filtre côté JS (volume SKU < quelques centaines).
    prisma.stockItem.findMany({ select: { onHand: true, reserved: true, lowStock: true } }),
    prisma.orderItem.groupBy({
      by: ['variantId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
      where: {
        order: {
          status: { in: ['paid', 'preparing', 'shipped', 'delivered'] },
          createdAt: { gte: since },
        },
      },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: { items: true },
    }),
  ]);

  const lowStockCount = lowStockItems.filter(
    (s) => s.onHand - s.reserved <= s.lowStock,
  ).length;

  const variantIds = topProducts.map((t) => t.variantId);
  const variantInfos = variantIds.length
    ? await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        include: { product: true },
      })
    : [];
  const variantById = new Map(variantInfos.map((v) => [v.id, v]));

  return (
    <div className="space-y-10">
      <AdminPageHeader
        kicker="Vue 30 jours"
        title="Tableau de bord"
      />

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <AdminStat
          label="CA 30 jours"
          value={formatPrice(revenue30dAgg._sum.total ?? 0)}
          hint={`${paidOrders30d} commande${paidOrders30d > 1 ? 's' : ''}`}
          tone="accent"
        />
        <AdminStat
          label="À préparer"
          value={pendingOrders}
          hint="Commandes payées non expédiées"
        />
        <AdminStat
          label="Paniers actifs"
          value={activeReservations}
          hint="Réservations stock TTL 15 min"
        />
        <AdminStat
          label="Alertes rupture"
          value={lowStockCount}
          hint="Variantes ≤ seuil bas"
          tone={lowStockCount > 0 ? 'warn' : 'default'}
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <header className="mb-4 flex items-end justify-between border-b border-blanc/10 pb-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Dernières commandes
            </h2>
            <Link
              href="/admin/commandes"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60 hover:text-jaune"
            >
              Voir tout
            </Link>
          </header>

          {recentOrders.length === 0 ? (
            <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
              Aucune commande pour le moment.
            </p>
          ) : (
            <ul className="divide-y divide-blanc/10 border border-blanc/10">
              {recentOrders.map((o) => (
                <li key={o.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6">
                  <div>
                    <Link
                      href={`/admin/commandes/${o.number}`}
                      className="font-mono text-sm text-blanc transition-colors hover:text-jaune"
                    >
                      {o.number}
                    </Link>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                      {formatDate(o.createdAt)} · {o.items.length} article{o.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <StatusBadge status={o.status} />
                  <span className="font-mono text-sm text-blanc md:text-right">
                    {formatPrice(o.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <header className="mb-4 border-b border-blanc/10 pb-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Top produits 30j
            </h2>
          </header>
          {topProducts.length === 0 ? (
            <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
              Pas encore de ventes.
            </p>
          ) : (
            <ol className="divide-y divide-blanc/10 border border-blanc/10">
              {topProducts.map((row, i) => {
                const v = variantById.get(row.variantId);
                return (
                  <li key={row.variantId} className="flex items-center gap-3 px-4 py-3">
                    <span className="font-display text-2xl leading-none text-blanc/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm text-blanc">
                        {v?.product?.name ?? '— produit retiré —'}
                      </p>
                      {v?.size && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                          Taille {v.size}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-sm text-jaune">
                      ×{row._sum.quantity}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
}

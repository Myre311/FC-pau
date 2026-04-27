import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DashboardStatCard } from '@/components/admin/DashboardStatCard';
import { QuickAction } from '@/components/admin/QuickAction';
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
    totalProducts,
    totalArticles,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ['paid', 'preparing', 'shipped', 'delivered'] }, createdAt: { gte: since } },
    }).catch(() => ({ _sum: { total: 0 } })),
    prisma.order.count({
      where: { status: { in: ['paid', 'preparing', 'shipped', 'delivered'] }, createdAt: { gte: since } },
    }).catch(() => 0),
    prisma.order.count({ where: { status: 'preparing' } }).catch(() => 0),
    prisma.cartReservation.count({ where: { expiresAt: { gt: new Date() } } }).catch(() => 0),
    prisma.stockItem.findMany({ select: { onHand: true, reserved: true, lowStock: true } }).catch(() => []),
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
    }).catch(() => []),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      include: { items: true },
    }).catch(() => []),
    prisma.product.count({ where: { status: 'active' } }).catch(() => 0),
    prisma.article.count({ where: { status: 'published' } }).catch(() => 0),
  ]);

  const lowStockCount = (lowStockItems || []).filter(
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
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Bienvenue sur le dashboard"
        title="Tableau de bord"
      />

      {/* Stats principales */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Chiffre d'affaires"
          value={formatPrice(revenue30dAgg._sum.total ?? 0)}
          subtitle={`${paidOrders30d} commande${paidOrders30d > 1 ? 's' : ''} · 30 jours`}
          icon="revenue"
          trend="+12%"
        />
        <DashboardStatCard
          label="Commandes à préparer"
          value={pendingOrders}
          subtitle="Payées · En attente d'expédition"
          icon="orders"
          tone={pendingOrders > 0 ? 'warning' : 'success'}
        />
        <DashboardStatCard
          label="Paniers actifs"
          value={activeReservations}
          subtitle="Réservations stock actives"
          icon="cart"
        />
        <DashboardStatCard
          label="Alertes stock"
          value={lowStockCount}
          subtitle="Produits en rupture"
          icon="alert"
          tone={lowStockCount > 0 ? 'danger' : 'success'}
        />
      </section>

      {/* Actions rapides */}
      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-blanc/60">
          Actions rapides
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            href="/admin/produits/nouveau"
            icon="plus"
            label="Nouveau produit"
            description="Ajouter au catalogue"
          />
          <QuickAction
            href="/admin/actualites/nouveau"
            icon="article"
            label="Nouvelle actualité"
            description="Publier un article"
          />
          <QuickAction
            href="/admin/commandes"
            icon="orders"
            label="Commandes"
            description={`${pendingOrders} à traiter`}
            badge={pendingOrders > 0 ? pendingOrders : null}
          />
          <QuickAction
            href="/admin/stock"
            icon="stock"
            label="Gestion stock"
            description={`${lowStockCount} alerte${lowStockCount > 1 ? 's' : ''}`}
            badge={lowStockCount > 0 ? lowStockCount : null}
          />
        </div>
      </section>

      {/* Vue d'ensemble */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-blanc/10 bg-primaire/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-blanc/60">
                Produits actifs
              </p>
              <p className="mt-2 font-display text-3xl text-blanc">{totalProducts}</p>
            </div>
            <Link
              href="/admin/produits"
              className="font-mono text-xs uppercase tracking-wider text-jaune hover:underline"
            >
              Voir →
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-blanc/10 bg-primaire/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-blanc/60">
                Articles publiés
              </p>
              <p className="mt-2 font-display text-3xl text-blanc">{totalArticles}</p>
            </div>
            <Link
              href="/admin/actualites"
              className="font-mono text-xs uppercase tracking-wider text-jaune hover:underline"
            >
              Voir →
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-blanc/10 bg-primaire/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-blanc/60">
                Commandes 30j
              </p>
              <p className="mt-2 font-display text-3xl text-blanc">{paidOrders30d}</p>
            </div>
            <Link
              href="/admin/commandes"
              className="font-mono text-xs uppercase tracking-wider text-jaune hover:underline"
            >
              Voir →
            </Link>
          </div>
        </div>
      </section>

      {/* Activité récente */}
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-blanc/10 bg-primaire/20 p-6">
          <header className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl uppercase text-blanc">
              Dernières commandes
            </h2>
            <Link
              href="/admin/commandes"
              className="font-mono text-xs uppercase tracking-wider text-jaune hover:underline"
            >
              Voir tout →
            </Link>
          </header>

          {recentOrders.length === 0 ? (
            <div className="rounded border border-dashed border-blanc/15 p-8 text-center">
              <p className="font-sans text-sm text-blanc/60">
                Aucune commande pour le moment.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <Link
                  key={o.id}
                  href={`/admin/commandes/${o.number}`}
                  className="block rounded-lg border border-blanc/10 bg-nuit/50 p-4 transition-colors hover:border-jaune/30 hover:bg-nuit/70"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm text-blanc">{o.number}</p>
                      <p className="mt-1 font-mono text-xs text-blanc/40">
                        {formatDate(o.createdAt)} · {o.items.length} article{o.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={o.status} />
                      <span className="font-mono text-sm text-jaune">
                        {formatPrice(o.total)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-blanc/10 bg-primaire/20 p-6">
          <header className="mb-6">
            <h2 className="font-display text-xl uppercase text-blanc">
              Top produits 30j
            </h2>
          </header>
          {topProducts.length === 0 ? (
            <div className="rounded border border-dashed border-blanc/15 p-8 text-center">
              <p className="font-sans text-sm text-blanc/60">
                Pas encore de ventes.
              </p>
            </div>
          ) : (
            <ol className="space-y-3">
              {topProducts.map((row, i) => {
                const v = variantById.get(row.variantId);
                return (
                  <li key={row.variantId} className="flex items-center gap-3 rounded-lg border border-blanc/5 bg-nuit/30 p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-jaune/10 font-display text-sm text-jaune">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm text-blanc">
                        {v?.product?.name ?? '— produit retiré —'}
                      </p>
                      {v?.size && (
                        <p className="font-mono text-xs text-blanc/40">
                          Taille {v.size}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-sm font-bold text-jaune">
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

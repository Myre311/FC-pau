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

  // Données mockées pour les nouvelles métriques Shopify
  const mockStats = {
    siteVisits: '12,847',
    siteVisitsChange: '+12.5%',
    recurringCustomersRate: '34.2%',
    recurringCustomersChange: '+2.1%',
    conversionRate: '3.8%',
    conversionRateChange: '-0.3%',
    avgOrderValue: '68.50€',
    avgOrderValueChange: '+5.2%',
  };

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
    prisma.article.count({ where: { publishedAt: { not: null } } }).catch(() => 0),
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-500">Boutique Pau FC</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Derniers 30 jours
          </button>
          <button className="rounded-lg bg-pau-yellow px-4 py-2 text-sm font-semibold text-pau-night shadow-sm hover:bg-pau-yellow/90">
            Rapport complet
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Visites du site</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{mockStats.siteVisits}</p>
            <span className="text-sm font-medium text-green-600">
              ↑ {mockStats.siteVisitsChange}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Clients récurrents</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{mockStats.recurringCustomersRate}</p>
            <span className="text-sm font-medium text-green-600">
              ↑ {mockStats.recurringCustomersChange}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{mockStats.conversionRate}</p>
            <span className="text-sm font-medium text-red-600">
              ↓ {mockStats.conversionRateChange}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Valeur moyenne</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{mockStats.avgOrderValue}</p>
            <span className="text-sm font-medium text-green-600">
              ↑ {mockStats.avgOrderValueChange}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total commandes</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{paidOrders30d}</p>
            <span className="text-sm font-medium text-green-600">↑ +18%</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Ventes sur 7 jours</h2>
          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              7 jours
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-900">
              30 jours
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              90 jours
            </button>
          </div>
        </div>
        <div className="flex h-64 items-end justify-around gap-2">
          {[65, 85, 45, 92, 78, 88, 95].map((height, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-pau-yellow transition-all hover:bg-pau-yellow/80"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/produits/nouveau"
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
        >
          <p className="font-medium text-gray-900">Nouveau produit</p>
          <p className="text-sm text-gray-500">Ajouter au catalogue</p>
        </Link>
        <Link
          href="/admin/matchs/nouveau"
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
        >
          <p className="font-medium text-gray-900">Nouveau match</p>
          <p className="text-sm text-gray-500">Programmer un match</p>
        </Link>
        <Link
          href="/admin/actualites/nouveau"
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
        >
          <p className="font-medium text-gray-900">Nouvelle actualité</p>
          <p className="text-sm text-gray-500">Publier une actu</p>
        </Link>
        <Link
          href="/admin/marketing"
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50"
        >
          <p className="font-medium text-gray-900">Marketing</p>
          <p className="text-sm text-gray-500">Gérer les campagnes</p>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits actifs</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <Link href="/admin/produits" className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
              Voir →
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles publiés</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalArticles}</p>
            </div>
            <Link href="/admin/actualites" className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
              Voir →
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes à préparer</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
            {pendingOrders > 0 && (
              <span className="text-xs font-semibold text-orange-600">À traiter</span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertes stock</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{lowStockCount}</p>
            </div>
            {lowStockCount > 0 && (
              <span className="text-xs font-semibold text-red-600">Alerte</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
              Voir tout →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">Aucune commande</p>
              </div>
            ) : (
              recentOrders.map((o) => (
                <Link
                  key={o.id}
                  href={`/admin/commandes/${o.number}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{o.number}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(o.createdAt)} · {o.items.length} article{o.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatPrice(o.total)}</p>
                    <StatusBadge status={o.status} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Top produits 30j</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topProducts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">Aucune vente</p>
              </div>
            ) : (
              topProducts.map((row, i) => {
                const v = variantById.get(row.variantId);
                return (
                  <div key={row.variantId} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pau-yellow/10 text-sm font-bold text-pau-yellow">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {v?.product?.name ?? '— produit retiré —'}
                        </p>
                        {v?.size && <p className="text-xs text-gray-500">Taille {v.size}</p>}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">×{row._sum.quantity}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

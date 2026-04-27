import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { StockAdjustForm } from '@/components/admin/StockAdjustForm';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Stock' };

const MOVEMENT_LABELS = {
  restock: 'Réappro',
  sale_online: 'Vente en ligne',
  sale_pos: 'Vente caisse',
  return_online: 'Retour en ligne',
  return_pos: 'Retour caisse',
  adjustment: 'Ajustement',
  reservation: 'Réservation',
  release: 'Libération',
};

export default async function AdminStockPage() {
  const [variants, recentMovements] = await Promise.all([
    prisma.productVariant.findMany({
      include: { product: true, stockItem: true },
      orderBy: [{ product: { name: 'asc' } }, { size: 'asc' }],
    }).catch(() => []),
    prisma.stockMovement.findMany({
      orderBy: { occurredAt: 'desc' },
      take: 30,
      include: { variant: { include: { product: true } } },
    }).catch(() => []),
  ]);

  const lowStock = variants.filter(
    (v) =>
      v.stockItem &&
      v.stockItem.onHand - v.stockItem.reserved <= v.stockItem.lowStock,
  );

  return (
    <div className="space-y-10">
      <AdminPageHeader kicker="Catalogue" title="Stock unifié" />

      {lowStock.length > 0 && (
        <section className="border border-pau-yellow/40 bg-jaune/5 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
            Alertes rupture · {lowStock.length}
          </p>
          <ul className="mt-3 space-y-2 font-sans text-sm">
            {lowStock.map((v) => (
              <li key={v.id} className="flex items-center justify-between">
                <span className="text-gray-900">
                  {v.product.name}
                  {v.size && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
                      {v.size}
                    </span>
                  )}
                </span>
                <span className="font-mono text-xs text-pau-yellow">
                  {v.stockItem.onHand} en stock · seuil {v.stockItem.lowStock}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <header className="mb-4 flex items-end justify-between border-b border-gray-200/10 pb-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
            Inventaire · {variants.length} variantes
          </h2>
        </header>

        <div className="border border-gray-200/10">
          <ul className="divide-y divide-blanc/10">
            {variants.map((v) => {
              const onHand = v.stockItem?.onHand ?? 0;
              const reserved = v.stockItem?.reserved ?? 0;
              const available = onHand - reserved;
              const isLow = v.stockItem && available <= v.stockItem.lowStock;
              return (
                <li
                  key={v.id}
                  className="grid gap-3 px-4 py-3 md:grid-cols-[1.5fr_auto_auto_auto_1fr] md:items-center md:gap-4"
                >
                  <div>
                    <p className="font-sans text-sm text-gray-900">{v.product.name}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40">
                      {[v.size, v.color].filter(Boolean).join(' · ') || '—'} · SKU {v.sku}
                    </p>
                  </div>
                  <span className={`font-mono text-sm md:text-right ${isLow ? 'text-pau-yellow' : 'text-gray-900'}`}>
                    {onHand}
                  </span>
                  <span className="font-mono text-xs text-gray-900/50 md:text-right">
                    {reserved} rés.
                  </span>
                  <span className="font-mono text-xs text-gray-900/70 md:text-right">
                    Dispo {available}
                  </span>
                  <div className="md:text-right">
                    <StockAdjustForm variant={v} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section>
        <header className="mb-4 flex items-end justify-between border-b border-gray-200/10 pb-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
            Mouvements récents · {recentMovements.length}
          </h2>
        </header>
        <ul className="divide-y divide-blanc/10 border border-gray-200/10">
          {recentMovements.map((m) => (
            <li
              key={m.id}
              className="grid gap-2 px-4 py-3 md:grid-cols-[140px_1fr_120px_120px] md:items-center md:gap-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
                {formatDate(m.occurredAt)}
              </span>
              <span className="font-sans text-sm text-gray-900">
                {m.variant?.product?.name ?? '—'}
                {m.variant?.size && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
                    {m.variant.size}
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
                {MOVEMENT_LABELS[m.type] ?? m.type}
              </span>
              <span
                className={`font-mono text-sm md:text-right ${
                  m.quantity > 0 ? 'text-gray-900' : 'text-gray-900/60'
                }`}
              >
                {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

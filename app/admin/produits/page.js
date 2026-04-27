import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

export const metadata = { title: 'Produits' };

export default async function AdminProduitsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    include: {
      category: true,
      variants: { include: { stockItem: true } },
    },
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Catalogue"
        title="Produits"
        actions={
          <Link href="/admin/produits/nouveau">
            <Button variant="primary" size="md" cornerCut>
              + Nouveau produit
            </Button>
          </Link>
        }
      />

      <AdminTable
        columns={[
          { key: 'name', label: 'Produit' },
          { key: 'category', label: 'Catégorie', width: '160px' },
          { key: 'price', label: 'Prix', align: 'right', width: '110px' },
          { key: 'stock', label: 'Stock total', align: 'right', width: '110px' },
          { key: 'variants', label: 'Variantes', align: 'right', width: '100px' },
          { key: 'status', label: 'Statut', width: '110px' },
        ]}
        rows={products}
        empty="Aucun produit. Créez le premier."
        mobileCardLabel={(p) => p.name}
        renderRow={(p) => {
          const stock = p.variants.reduce(
            (n, v) => n + (v.stockItem?.onHand ?? 0),
            0,
          );
          return {
            name: (
              <Link
                href={`/admin/produits/${p.id}`}
                className="font-sans text-sm text-blanc transition-colors hover:text-jaune"
              >
                {p.name}
                {p.featured && (
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-jaune">
                    Featured
                  </span>
                )}
              </Link>
            ),
            category: (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
                {p.category?.name ?? '—'}
              </span>
            ),
            price: <span className="font-mono text-sm">{formatPrice(p.basePrice)}</span>,
            stock: (
              <span className={`font-mono text-sm ${stock === 0 ? 'text-blanc/40' : 'text-blanc'}`}>
                {stock}
              </span>
            ),
            variants: <span className="font-mono text-xs">{p.variants.length}</span>,
            status: <StatusBadge status={p.status} />,
          };
        }}
      />
    </div>
  );
}

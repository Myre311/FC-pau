import { notFound } from 'next/navigation';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { StatusBadge } from '@/components/admin/StatusBadge';

export const metadata = { title: 'Produit' };

export default async function AdminProduitPage({ params }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: { variants: { include: { stockItem: true } } },
    }),
    prisma.category.findMany({ orderBy: { position: 'asc' } }),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-10">
      <AdminPageHeader
        kicker="Catalogue"
        title={product.name}
        breadcrumb={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/produits', label: 'Produits' },
          { label: product.name },
        ]}
        actions={
          <>
            <StatusBadge status={product.status} />
            <Link
              href={`/boutique/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blanc/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/70 transition-colors hover:border-jaune hover:text-jaune"
            >
              Voir sur le site ↗
            </Link>
          </>
        }
      />

      <section>
        <ProductForm product={product} categories={categories} />
      </section>

      <section>
        <header className="mb-4 flex items-end justify-between border-b border-blanc/10 pb-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            Variantes · {product.variants.length}
          </h2>
        </header>
        {product.variants.length === 0 ? (
          <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
            Aucune variante. Ajoutez-en via la section Stock.
          </p>
        ) : (
          <ul className="divide-y divide-blanc/10 border border-blanc/10">
            {product.variants.map((v) => (
              <li key={v.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6">
                <div>
                  <p className="font-sans text-sm text-blanc">
                    {[v.size, v.color].filter(Boolean).join(' · ') || '— Sans option —'}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                    SKU {v.sku}
                  </p>
                </div>
                <span className="font-mono text-xs text-blanc/70">
                  Stock {v.stockItem?.onHand ?? 0}
                </span>
                <Link
                  href="/admin/stock"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60 hover:text-jaune md:text-right"
                >
                  Ajuster →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

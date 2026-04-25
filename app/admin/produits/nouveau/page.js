import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProductForm } from '@/components/admin/ProductForm';

export const metadata = { title: 'Nouveau produit' };

export default async function NouveauProduitPage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: 'asc' },
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Catalogue"
        title="Nouveau produit"
        breadcrumb={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/produits', label: 'Produits' },
          { label: 'Nouveau' },
        ]}
      />

      <ProductForm categories={categories} />
    </div>
  );
}

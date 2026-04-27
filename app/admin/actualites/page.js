import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Actualités' };

export default async function AdminActualitesPage() {
  const articles = await prisma.article.findMany({
    orderBy: [{ publishedAt: 'desc' }],
  }).catch(() => []);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Contenu"
        title="Actualités"
        actions={
          <Link href="/admin/actualites/nouveau">
            <Button variant="primary" size="md" cornerCut>
              + Nouvelle actualité
            </Button>
          </Link>
        }
      />

      <AdminTable
        columns={[
          { key: 'title', label: 'Titre' },
          { key: 'category', label: 'Catégorie', width: '140px' },
          { key: 'publishedAt', label: 'Publication', width: '180px' },
          { key: 'featured', label: 'À la une', width: '110px' },
        ]}
        rows={articles}
        empty="Aucune actualité. Créez la première."
        mobileCardLabel={(a) => a.title}
        renderRow={(a) => ({
          title: (
            <Link
              href={`/admin/actualites/${a.id}`}
              className="font-sans text-sm text-blanc transition-colors hover:text-jaune"
            >
              {a.title}
            </Link>
          ),
          category: (
            <span className="font-mono text-xs uppercase text-blanc/60">
              {a.category}
            </span>
          ),
          publishedAt: (
            <span className="font-mono text-xs text-blanc/60">
              {a.publishedAt
                ? new Date(a.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '—'}
            </span>
          ),
          featured: (
            <span className="font-mono text-xs text-blanc/60">
              {a.featured ? '⭐' : '—'}
            </span>
          ),
        })}
        rowKey={(a) => a.id}
      />
    </div>
  );
}

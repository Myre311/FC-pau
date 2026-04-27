import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { createArticle } from '../actions';

export const metadata = { title: 'Nouvelle actualité' };

export default function NouvelleActualitePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Contenu"
        title="Nouvelle actualité"
        backHref="/admin/actualites"
      />

      <ArticleForm action={createArticle} />
    </div>
  );
}

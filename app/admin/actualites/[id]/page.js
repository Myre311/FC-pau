import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { updateArticle, deleteArticle } from '../actions';

export const metadata = { title: 'Modifier actualité' };

export default async function ModifierActualitePage({ params }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
  }).catch(() => null);

  if (!article) {
    redirect('/admin/actualites');
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Contenu"
        title="Modifier actualité"
        backHref="/admin/actualites"
      />

      <ArticleForm
        article={article}
        action={updateArticle}
        deleteAction={deleteArticle}
      />
    </div>
  );
}

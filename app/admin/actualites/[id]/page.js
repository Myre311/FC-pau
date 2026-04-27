import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';

export const metadata = { title: 'Modifier actualité' };

async function updateArticle(formData) {
  'use server';

  const id = formData.get('id');
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  const excerpt = formData.get('excerpt');
  const coverImage = formData.get('coverImage');
  const status = formData.get('status') || 'draft';
  const publishedAt = formData.get('publishedAt');

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt,
      coverImage: coverImage || null,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
    },
  });

  redirect('/admin/actualites');
}

async function deleteArticle(formData) {
  'use server';

  const id = formData.get('id');
  await prisma.article.delete({ where: { id } });
  redirect('/admin/actualites');
}

export default async function ModifierActualitePage({ params }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
  });

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

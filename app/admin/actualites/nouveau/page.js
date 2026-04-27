import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';

export const metadata = { title: 'Nouvelle actualité' };

async function createArticle(formData) {
  'use server';

  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  const excerpt = formData.get('excerpt');
  const coverImage = formData.get('coverImage');
  const status = formData.get('status') || 'draft';
  const publishedAt = formData.get('publishedAt');

  const article = await prisma.article.create({
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

  redirect(`/admin/actualites/${article.id}`);
}

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

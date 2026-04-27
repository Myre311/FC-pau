'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function createArticle(formData) {
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
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    },
  });

  revalidatePath('/admin/actualites');
  revalidatePath('/');
  redirect(`/admin/actualites/${article.id}`);
}

export async function updateArticle(formData) {
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
      excerpt: excerpt || null,
      coverImage: coverImage || null,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    },
  });

  revalidatePath('/admin/actualites');
  revalidatePath('/');
  redirect('/admin/actualites');
}

export async function deleteArticle(formData) {
  const id = formData.get('id');
  await prisma.article.delete({ where: { id } });

  revalidatePath('/admin/actualites');
  revalidatePath('/');
  redirect('/admin/actualites');
}

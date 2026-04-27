'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function createArticle(formData) {
  try {
    const title = formData.get('title');
    const slug = formData.get('slug');
    const body = formData.get('body');
    const excerpt = formData.get('excerpt');
    const coverImageUrl = formData.get('coverImageUrl');
    const category = formData.get('category') || 'other';
    const featured = formData.get('featured') === 'on';
    const publishedAt = formData.get('publishedAt');

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        body,
        excerpt: excerpt || null,
        coverImageUrl: coverImageUrl || null,
        category,
        featured,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    revalidatePath('/admin/actualites');
    revalidatePath('/actualites');
    redirect(`/admin/actualites/${article.id}`);
  } catch (error) {
    console.error('Erreur création article:', error);
    return { error: error.message || 'Erreur lors de la création de l\'article' };
  }
}

export async function updateArticle(formData) {
  try {
    const id = formData.get('id');
    const title = formData.get('title');
    const slug = formData.get('slug');
    const body = formData.get('body');
    const excerpt = formData.get('excerpt');
    const coverImageUrl = formData.get('coverImageUrl');
    const category = formData.get('category') || 'other';
    const featured = formData.get('featured') === 'on';
    const publishedAt = formData.get('publishedAt');

    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        body,
        excerpt: excerpt || null,
        coverImageUrl: coverImageUrl || null,
        category,
        featured,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    revalidatePath('/admin/actualites');
    revalidatePath('/actualites');
    redirect('/admin/actualites');
  } catch (error) {
    console.error('Erreur mise à jour article:', error);
    return { error: error.message || 'Erreur lors de la mise à jour de l\'article' };
  }
}

export async function deleteArticle(formData) {
  try {
    const id = formData.get('id');
    await prisma.article.delete({ where: { id } });

    revalidatePath('/admin/actualites');
    revalidatePath('/actualites');
    redirect('/admin/actualites');
  } catch (error) {
    console.error('Erreur suppression article:', error);
    return { error: error.message || 'Erreur lors de la suppression de l\'article' };
  }
}

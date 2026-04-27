'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function createPlayerAction(formData) {
  try {
    const data = {
      number: parseInt(formData.get('number')),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      position: formData.get('position'),
      height: formData.get('height') ? parseInt(formData.get('height')) : null,
      weight: formData.get('weight') ? parseInt(formData.get('weight')) : null,
      nationality: formData.get('nationality') || null,
      birthDate: formData.get('birthDate') ? new Date(formData.get('birthDate')) : null,
      photoUrl: formData.get('photoUrl') || null,
      bio: formData.get('bio') || null,
    };

    await prisma.player.create({ data });

    revalidatePath('/admin/joueurs');
    revalidatePath('/equipe');
    redirect('/admin/joueurs');
  } catch (error) {
    console.error('Erreur création joueur:', error);
    return { error: error.message || 'Erreur lors de la création du joueur' };
  }
}

export async function updatePlayerAction(formData) {
  try {
    const id = formData.get('id');

    const data = {
      number: parseInt(formData.get('number')),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      position: formData.get('position'),
      height: formData.get('height') ? parseInt(formData.get('height')) : null,
      weight: formData.get('weight') ? parseInt(formData.get('weight')) : null,
      nationality: formData.get('nationality') || null,
      birthDate: formData.get('birthDate') ? new Date(formData.get('birthDate')) : null,
      photoUrl: formData.get('photoUrl') || null,
      bio: formData.get('bio') || null,
    };

    await prisma.player.update({
      where: { id },
      data,
    });

    revalidatePath('/admin/joueurs');
    revalidatePath('/equipe');
    redirect('/admin/joueurs');
  } catch (error) {
    console.error('Erreur mise à jour joueur:', error);
    return { error: error.message || 'Erreur lors de la mise à jour du joueur' };
  }
}

export async function deletePlayerAction(formData) {
  try {
    const id = formData.get('id');

    await prisma.player.delete({
      where: { id },
    });

    revalidatePath('/admin/joueurs');
    revalidatePath('/equipe');
    redirect('/admin/joueurs');
  } catch (error) {
    console.error('Erreur suppression joueur:', error);
    return { error: error.message || 'Erreur lors de la suppression du joueur' };
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function createMatch(formData) {
  const kickoffDate = formData.get('kickoffDate');
  const kickoffTime = formData.get('kickoffTime');
  const kickoffAt = new Date(`${kickoffDate}T${kickoffTime}`);

  await prisma.match.create({
    data: {
      competition: formData.get('competition'),
      season: formData.get('season'),
      kickoffAt,
      isHome: formData.get('isHome') === 'true',
      opponent: formData.get('opponent'),
      opponentLogo: formData.get('opponentLogo') || null,
      venue: formData.get('venue'),
      status: formData.get('status'),
      homeScore: formData.get('homeScore') ? parseInt(formData.get('homeScore')) : null,
      awayScore: formData.get('awayScore') ? parseInt(formData.get('awayScore')) : null,
      ticketUrl: formData.get('ticketUrl') || null,
      broadcaster: formData.get('broadcaster') || null,
      note: formData.get('note') || null,
    },
  });

  revalidatePath('/admin/matchs');
  revalidatePath('/calendrier');
  redirect('/admin/matchs');
}

export async function updateMatch(formData) {
  const id = formData.get('id');
  const kickoffDate = formData.get('kickoffDate');
  const kickoffTime = formData.get('kickoffTime');
  const kickoffAt = new Date(`${kickoffDate}T${kickoffTime}`);

  await prisma.match.update({
    where: { id },
    data: {
      competition: formData.get('competition'),
      season: formData.get('season'),
      kickoffAt,
      isHome: formData.get('isHome') === 'true',
      opponent: formData.get('opponent'),
      opponentLogo: formData.get('opponentLogo') || null,
      venue: formData.get('venue'),
      status: formData.get('status'),
      homeScore: formData.get('homeScore') ? parseInt(formData.get('homeScore')) : null,
      awayScore: formData.get('awayScore') ? parseInt(formData.get('awayScore')) : null,
      ticketUrl: formData.get('ticketUrl') || null,
      broadcaster: formData.get('broadcaster') || null,
      note: formData.get('note') || null,
    },
  });

  revalidatePath('/admin/matchs');
  revalidatePath('/calendrier');
  redirect('/admin/matchs');
}

export async function deleteMatch(formData) {
  const id = formData.get('id');

  await prisma.match.delete({
    where: { id },
  });

  revalidatePath('/admin/matchs');
  revalidatePath('/calendrier');
  redirect('/admin/matchs');
}

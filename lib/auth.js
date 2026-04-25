import { redirect } from 'next/navigation';

import { createSupabaseServer } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

// =====================================================================
// Helpers d'authentification — coté serveur uniquement.
//
// Le User Prisma est synchronisé avec auth.users (Supabase) à chaque
// appel de getCurrentUser : si l'auth.users existe sans contrepartie
// Prisma, on la crée. Cette synchro paresseuse remplace une trigger
// auth → public.users, qu'on peut activer plus tard côté Supabase.
// =====================================================================

/**
 * Retourne { authUser, dbUser } pour la session courante.
 * authUser  : représentation Supabase auth.users
 * dbUser    : ligne User Prisma synchronisée
 * Retourne null si aucune session.
 */
export async function getCurrentUser() {
  const supabase = createSupabaseServer();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  let dbUser = await prisma.user.findUnique({
    where: { authUserId: authUser.id },
  });

  if (!dbUser) {
    // Premier login — création paresseuse
    const meta = authUser.user_metadata ?? {};
    dbUser = await prisma.user.upsert({
      where: { email: authUser.email },
      update: { authUserId: authUser.id },
      create: {
        authUserId: authUser.id,
        email: authUser.email,
        firstName: meta.firstName ?? null,
        lastName: meta.lastName ?? null,
      },
    });
  }

  return { authUser, dbUser };
}

/**
 * Garde de route — redirige vers /connexion si pas de session.
 * À appeler en haut des Server Components / Server Actions protégés.
 */
export async function requireUser(redirectTo = '/connexion') {
  const session = await getCurrentUser();
  if (!session) redirect(redirectTo);
  return session;
}

/**
 * Garde admin — exige role admin OU staff_*.
 */
export async function requireAdmin() {
  const session = await requireUser();
  if (
    session.dbUser.role !== 'admin' &&
    !session.dbUser.role.startsWith('staff_')
  ) {
    redirect('/');
  }
  return session;
}

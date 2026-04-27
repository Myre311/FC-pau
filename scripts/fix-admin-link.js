// =====================================================================
// Script de correction du lien authUserId pour l'admin
// Lance avec: node scripts/fix-admin-link.js
// =====================================================================

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminLink() {
  console.log('🔧 Correction du lien admin...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const email = 'admin@paufc.local';

  // 1. Récupérer l'utilisateur Supabase
  console.log('→ Recherche utilisateur Supabase...');
  const { data: users } = await supabase.auth.admin.listUsers();
  const supabaseUser = users.users.find(u => u.email === email);

  if (!supabaseUser) {
    console.log('❌ Utilisateur non trouvé dans Supabase Auth');
    console.log('Crée-le d\'abord avec: node scripts/create-admin.js');
    process.exit(1);
  }

  console.log('✓ Utilisateur trouvé dans Supabase:', supabaseUser.id);

  // 2. Mettre à jour l'utilisateur en base
  console.log('→ Mise à jour du lien en base Prisma...');

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.log('❌ Utilisateur non trouvé en base Prisma');
    console.log('Lance le seed d\'abord: npm run db:seed');
    process.exit(1);
  }

  await prisma.user.update({
    where: { email },
    data: {
      authUserId: supabaseUser.id,
      role: 'admin',
    },
  });

  console.log('✓ Lien authUserId mis à jour');

  console.log('\n✅ Compte admin prêt !');
  console.log('\n📧 Email:', email);
  console.log('🔑 Password: AdminPauFC2026!');
  console.log('\n🌐 Connecte-toi sur: http://localhost:3000/connexion');

  await prisma.$disconnect();
}

fixAdminLink().catch((err) => {
  console.error('❌ Erreur:', err.message);
  prisma.$disconnect();
  process.exit(1);
});

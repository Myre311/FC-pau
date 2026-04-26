// =====================================================================
// Script de création du compte admin dans Supabase Auth
// Lance avec: node scripts/create-admin.js
// =====================================================================

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  console.log('🔐 Création du compte administrateur...\n');

  // Utiliser le service role pour créer l'utilisateur
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
  const password = 'AdminPauFC2026!';

  // 1. Créer l'utilisateur dans Supabase Auth
  console.log('→ Création utilisateur Supabase Auth...');
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirmer l'email
    user_metadata: {
      firstName: 'Admin',
      lastName: 'FC Pau',
      role: 'admin',
    },
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('✓ Utilisateur existe déjà dans Supabase Auth');

      // Récupérer l'utilisateur existant
      const { data: users } = await supabase.auth.admin.listUsers();
      const existingUser = users.users.find(u => u.email === email);

      if (existingUser) {
        // Mettre à jour l'utilisateur en base
        await prisma.user.update({
          where: { email },
          data: {
            authUserId: existingUser.id,
            role: 'admin',
          },
        });
        console.log('✓ Lien authUserId mis à jour en base');
      }
    } else {
      throw authError;
    }
  } else {
    console.log('✓ Utilisateur créé dans Supabase Auth:', authData.user.id);

    // 2. Mettre à jour l'utilisateur en base avec l'authUserId
    console.log('→ Mise à jour de l\'utilisateur en base...');
    await prisma.user.update({
      where: { email },
      data: {
        authUserId: authData.user.id,
        role: 'admin',
      },
    });
    console.log('✓ Utilisateur lié à Supabase Auth');
  }

  console.log('\n✅ Compte admin créé avec succès !');
  console.log('\n📧 Email:', email);
  console.log('🔑 Password:', password);
  console.log('\n⚠️  Change ce mot de passe après ta première connexion !');

  await prisma.$disconnect();
}

createAdmin().catch((err) => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});

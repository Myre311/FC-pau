// Script pour donner le rôle admin à un utilisateur
// Usage: node scripts/make-admin.js votre@email.com

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error('❌ Usage: node scripts/make-admin.js votre@email.com');
    process.exit(1);
  }

  console.log(`🔍 Recherche de l'utilisateur ${email}...`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`❌ Aucun utilisateur trouvé avec l'email ${email}`);
    console.log('\n💡 Assurez-vous d\'être connecté au moins une fois sur le site pour créer votre compte.');
    process.exit(1);
  }

  console.log(`✅ Utilisateur trouvé: ${user.firstName || 'Inconnu'} ${user.lastName || ''}`);
  console.log(`   Rôle actuel: ${user.role || 'client'}`);

  if (user.role === 'admin') {
    console.log('✅ Cet utilisateur est déjà admin !');
    process.exit(0);
  }

  console.log(`🔄 Mise à jour du rôle vers 'admin'...`);

  await prisma.user.update({
    where: { email },
    data: { role: 'admin' },
  });

  console.log('✅ Rôle mis à jour avec succès !');
  console.log(`\n🎉 ${email} est maintenant administrateur.`);
  console.log('   Vous pouvez accéder au dashboard admin sur /admin');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

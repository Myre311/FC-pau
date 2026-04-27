require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAdmin() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@paufc.local' }
  });

  console.log('👤 Utilisateur admin en base:');
  console.log(JSON.stringify(user, null, 2));

  await prisma.$disconnect();
}

checkAdmin();

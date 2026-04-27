const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('📦 Vérification des produits en base\n');

  const allProducts = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
  });

  console.log(`Total produits: ${allProducts.length}\n`);

  const featured = allProducts.filter(p => p.featured);
  console.log(`Produits featured (page d'accueil): ${featured.length}\n`);

  featured.forEach(p => {
    console.log(`✓ ${p.name}`);
    console.log(`  - Prix: ${p.basePrice / 100}€`);
    console.log(`  - Images: ${p.images.length ? p.images[0] : 'aucune'}`);
    console.log(`  - Catégorie: ${p.category?.name || 'aucune'}`);
    console.log(`  - Variantes: ${p.variants.length}`);
    console.log('');
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

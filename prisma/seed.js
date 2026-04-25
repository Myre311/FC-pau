// =====================================================================
// FC Pau — Seed
//
// Idempotent : tout passe par upsert, identifié par slug/sku/code/email.
// Peut être relancé sans dupliquer ni casser l'existant.
//
// Lancement : `npm run db:seed`
// =====================================================================

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ---- Helpers --------------------------------------------------------

function eur(amount) {
  // 79.99 -> 7999 centimes
  return Math.round(amount * 100);
}

async function logStep(label) {
  process.stdout.write(`→ ${label}\n`);
}

// ---- Données --------------------------------------------------------

const categories = [
  { slug: 'maillots', name: 'Maillots', position: 1 },
  { slug: 'lifestyle', name: 'Lifestyle', position: 2 },
  { slug: 'accessoires', name: 'Accessoires', position: 3 },
  { slug: 'enfant', name: 'Enfant', position: 4 },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const products = [
  {
    slug: 'maillot-domicile-2026',
    name: 'Maillot Domicile 2026',
    description:
      'Maillot officiel domicile saison 2025-2026. Coupe athlétique, mesh respirant, écusson brodé.',
    basePrice: eur(89.99),
    status: 'active',
    featured: true,
    customizable: true,
    categorySlug: 'maillots',
    images: [],
    variants: sizes.map((size) => ({
      sku: `MAILLOT-DOM-2026-${size}`,
      size,
      stock: size === 'XS' || size === 'XXL' ? 6 : 24,
    })),
  },
  {
    slug: 'maillot-exterieur-2026',
    name: 'Maillot Extérieur 2026',
    description:
      'Maillot officiel extérieur saison 2025-2026. Blanc cassé, bandes nuit, écusson brodé.',
    basePrice: eur(89.99),
    status: 'active',
    featured: true,
    customizable: true,
    categorySlug: 'maillots',
    images: [],
    variants: sizes.map((size) => ({
      sku: `MAILLOT-EXT-2026-${size}`,
      size,
      stock: size === 'XS' || size === 'XXL' ? 4 : 18,
    })),
  },
  {
    slug: 'polo-officiel',
    name: 'Polo Officiel',
    description:
      'Polo coton piqué brodé écusson FC Pau. Port quotidien, esprit club.',
    basePrice: eur(54.0),
    status: 'active',
    featured: false,
    customizable: false,
    categorySlug: 'lifestyle',
    images: [],
    variants: sizes.map((size) => ({
      sku: `POLO-OFFICIEL-${size}`,
      size,
      stock: 12,
    })),
  },
  {
    slug: 'echarpe-supporter',
    name: 'Écharpe Supporter',
    description:
      'Écharpe tricotée bicolore nuit/jaune. Indispensable pour le Nouste Camp.',
    basePrice: eur(19.9),
    status: 'active',
    featured: true,
    customizable: false,
    categorySlug: 'accessoires',
    images: [],
    variants: [
      { sku: 'ECHARPE-SUPP-UNIQUE', size: 'Taille unique', stock: 80 },
    ],
  },
];

const partners = [
  {
    slug: 'partenaire-premium',
    name: 'Partenaire Premium',
    tier: 'premium',
    logoUrl: '/partners/placeholder-premium.svg',
    websiteUrl: 'https://example.com',
    description: 'Partenaire majeur du club.',
    position: 1,
  },
  {
    slug: 'partenaire-officiel',
    name: 'Partenaire Officiel',
    tier: 'officiel',
    logoUrl: '/partners/placeholder-officiel.svg',
    websiteUrl: 'https://example.com',
    description: 'Partenaire officiel saison 2025-2026.',
    position: 1,
  },
  {
    slug: 'partenaire-local',
    name: 'Partenaire Local',
    tier: 'local',
    logoUrl: '/partners/placeholder-local.svg',
    websiteUrl: 'https://example.com',
    description: 'Soutien de proximité béarnais.',
    position: 1,
  },
];

const coupons = [
  {
    code: 'BIENVENUE10',
    type: 'percent',
    value: 10,
    minSubtotal: eur(40),
    maxPerUser: 1,
    active: true,
  },
];

const adminUser = {
  email: 'admin@paufc.local',
  firstName: 'Admin',
  lastName: 'FC Pau',
  role: 'admin',
};

// ---- Exécution ------------------------------------------------------

async function main() {
  await logStep('Catégories');
  const categoryBySlug = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, position: cat.position },
      create: cat,
    });
    categoryBySlug[cat.slug] = created;
  }

  await logStep('Produits + variantes + stock');
  for (const p of products) {
    const { variants, categorySlug, ...productData } = p;
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        ...productData,
        categoryId: categoryBySlug[categorySlug]?.id ?? null,
      },
      create: {
        ...productData,
        categoryId: categoryBySlug[categorySlug]?.id ?? null,
      },
    });

    for (const v of variants) {
      const variant = await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: { size: v.size, productId: product.id },
        create: { sku: v.sku, size: v.size, productId: product.id },
      });

      await prisma.stockItem.upsert({
        where: { variantId: variant.id },
        update: { onHand: v.stock },
        create: { variantId: variant.id, onHand: v.stock },
      });
    }
  }

  await logStep('Partenaires');
  for (const pt of partners) {
    await prisma.partner.upsert({
      where: { slug: pt.slug },
      update: pt,
      create: pt,
    });
  }

  await logStep('Coupons');
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  await logStep('Utilisateur admin');
  await prisma.user.upsert({
    where: { email: adminUser.email },
    update: { role: adminUser.role },
    create: adminUser,
  });

  await logStep('Seed OK');
}

main()
  .catch((err) => {
    console.error('✖ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

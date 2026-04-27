// =====================================================================
// Script d'import des produits de la boutique officielle Pau FC
// Source : https://paufc-boutique.fr/
// =====================================================================

const { PrismaClient } = require('@prisma/client');
const https = require('https');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// ---- Configuration ----

const PRODUCTS_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

// Créer le dossier si nécessaire
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// ---- Helpers ----

function eur(amount) {
  return Math.round(amount * 100);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(PRODUCTS_DIR, filename);

    // Si le fichier existe déjà, ne pas le re-télécharger
    if (fs.existsSync(filePath)) {
      console.log(`  → Image déjà téléchargée: ${filename}`);
      resolve(`/images/products/${filename}`);
      return;
    }

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`  → Image téléchargée: ${filename}`);
        resolve(`/images/products/${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`  ✗ Erreur téléchargement ${filename}:`, err.message);
      resolve(null);
    });
  });
}

// ---- Données scrapées ----

const scrapedProducts = [
  // Maillots adultes
  {
    name: 'Maillot Domicile 25/26',
    description: 'Maillot officiel domicile saison 2025-2026. Manches courtes, coupe athlétique, écusson brodé.',
    price: 75.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_100_250804172539_250.png',
    category: 'maillots',
    featured: true,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
  },
  {
    name: 'Maillot Domicile 25/26 Manches Longues',
    description: 'Maillot officiel domicile saison 2025-2026. Manches longues, idéal pour les matchs d\'hiver.',
    price: 85.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_102_250804174956_250.png',
    category: 'maillots',
    featured: false,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 15,
  },
  {
    name: 'Maillot Extérieur 25/26',
    description: 'Maillot officiel extérieur saison 2025-2026. Blanc cassé avec bandes navy.',
    price: 75.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_103_250804175403_250.png',
    category: 'maillots',
    featured: true,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 18,
  },
  {
    name: 'Maillot Extérieur 25/26 Manches Longues',
    description: 'Maillot officiel extérieur saison 2025-2026. Manches longues.',
    price: 85.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_104_250804175532_250.png',
    category: 'maillots',
    featured: false,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 12,
  },
  {
    name: 'Le Royal',
    description: 'Maillot spécial "Le Royal". Édition limitée saison 2025-2026.',
    price: 75.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_130_260226211303_250.png',
    category: 'maillots',
    featured: true,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 10,
  },
  {
    name: 'Le Royal Manches Longues',
    description: 'Maillot spécial "Le Royal". Édition limitée manches longues.',
    price: 85.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_131_260226211248_250.png',
    category: 'maillots',
    featured: true,
    customizable: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 8,
  },

  // Maillots gardiens
  {
    name: 'HOLY x Pau FC Gardien Blue',
    description: 'Maillot de gardien officiel HOLY x Pau FC. Couleur bleue.',
    price: 75.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_120_251211213513_250.png',
    category: 'maillots',
    featured: false,
    customizable: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 8,
  },
  {
    name: 'HOLY x Pau FC Gardien Pink',
    description: 'Maillot de gardien officiel HOLY x Pau FC. Couleur rose.',
    price: 75.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_122_251211214444_250.png',
    category: 'maillots',
    featured: false,
    customizable: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 8,
  },

  // Maillots enfants
  {
    name: 'Maillot Domicile Enfant 25/26',
    description: 'Maillot officiel domicile enfant saison 2025-2026.',
    price: 55.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_105_250804172539_250.png',
    category: 'enfant',
    featured: true,
    customizable: true,
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans', '14 ans'],
    stock: 15,
  },
  {
    name: 'Maillot Extérieur Enfant 25/26',
    description: 'Maillot officiel extérieur enfant saison 2025-2026.',
    price: 55.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_106_250804175403_250.png',
    category: 'enfant',
    featured: true,
    customizable: true,
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans', '14 ans'],
    stock: 15,
  },
  {
    name: 'Le Royal Enfant',
    description: 'Maillot spécial "Le Royal" pour enfant. Édition limitée.',
    price: 55.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_132_260226211234_250.png',
    category: 'enfant',
    featured: true,
    customizable: true,
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans', '14 ans'],
    stock: 10,
  },
  {
    name: 'HOLY x Pau FC Gardien Enfant Blue',
    description: 'Maillot de gardien enfant HOLY x Pau FC. Couleur bleue.',
    price: 55.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_124_251211213513_250.png',
    category: 'enfant',
    featured: false,
    customizable: false,
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans', '14 ans'],
    stock: 8,
  },
  {
    name: 'HOLY x Pau FC Gardien Enfant Pink',
    description: 'Maillot de gardien enfant HOLY x Pau FC. Couleur rose.',
    price: 55.00,
    imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_123_251211214444_250.png',
    category: 'enfant',
    featured: false,
    customizable: false,
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans', '14 ans'],
    stock: 8,
  },
];

// ---- Import ----

async function main() {
  console.log('🛒 Import des produits de la boutique officielle Pau FC\n');

  // 1. Vérifier que les catégories existent
  console.log('→ Vérification des catégories...');
  const categoryMaillots = await prisma.category.findUnique({ where: { slug: 'maillots' } });
  const categoryEnfant = await prisma.category.findUnique({ where: { slug: 'enfant' } });

  if (!categoryMaillots || !categoryEnfant) {
    console.error('✗ Les catégories "maillots" et "enfant" doivent exister. Lancer le seed d\'abord.');
    process.exit(1);
  }

  // 2. Importer les produits
  console.log('\n→ Import des produits...\n');

  for (const productData of scrapedProducts) {
    const slug = slugify(productData.name);
    console.log(`📦 ${productData.name}`);

    // Télécharger l'image
    let imageUrl = null;
    if (productData.imageUrl) {
      const imageFilename = `${slug}.png`;
      imageUrl = await downloadImage(productData.imageUrl, imageFilename);
    }

    // Créer le produit
    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        name: productData.name,
        description: productData.description,
        basePrice: eur(productData.price),
        images: imageUrl ? [imageUrl] : [],
        status: 'active',
        featured: productData.featured,
        customizable: productData.customizable,
      },
      create: {
        slug,
        name: productData.name,
        description: productData.description,
        basePrice: eur(productData.price),
        images: imageUrl ? [imageUrl] : [],
        status: 'active',
        featured: productData.featured,
        customizable: productData.customizable,
        categoryId: productData.category === 'maillots' ? categoryMaillots.id : categoryEnfant.id,
      },
    });

    // Créer les variantes (tailles)
    for (const size of productData.sizes) {
      const sku = `${slug.toUpperCase()}-${size.replace(/\s+/g, '-')}`;
      await prisma.productVariant.upsert({
        where: { sku },
        update: {
          size,
          priceOverride: null, // Utilise le basePrice du produit
        },
        create: {
          sku,
          productId: product.id,
          size,
          priceOverride: null,
        },
      });

      // Créer le stock pour cette variante
      const variant = await prisma.productVariant.findUnique({ where: { sku } });
      if (variant) {
        await prisma.stockItem.upsert({
          where: { variantId: variant.id },
          update: {
            onHand: productData.stock,
            reserved: 0,
          },
          create: {
            variantId: variant.id,
            onHand: productData.stock,
            reserved: 0,
          },
        });
      }
    }

    console.log(`  ✓ ${productData.sizes.length} variantes créées\n`);
  }

  console.log(`\n✓ ${scrapedProducts.length} produits importés avec succès !`);
}

main()
  .catch((e) => {
    console.error('✗ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

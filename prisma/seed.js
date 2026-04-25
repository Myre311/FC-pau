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

// ---- Effectif (mock — à remplacer par les vrais joueurs admin) -------

const players = [
  // Gardiens
  { slug: 'g-lamarche', firstName: 'Tom', lastName: 'Lamarche', shirtNumber: 1, position: 'goalkeeper', nationality: 'FR', displayOrder: 1 },
  { slug: 'g-balcon', firstName: 'Adrien', lastName: 'Balcon', shirtNumber: 30, position: 'goalkeeper', nationality: 'FR', displayOrder: 2 },
  // Défenseurs
  { slug: 'd-touzghar', firstName: 'Steeve', lastName: 'Yago', shirtNumber: 4, position: 'defender', nationality: 'BF', displayOrder: 1 },
  { slug: 'd-lobry', firstName: 'Quentin', lastName: 'Lobry', shirtNumber: 2, position: 'defender', nationality: 'FR', displayOrder: 2 },
  { slug: 'd-batisse', firstName: 'Erwin', lastName: 'Batisse', shirtNumber: 5, position: 'defender', nationality: 'FR', displayOrder: 3 },
  { slug: 'd-malsa', firstName: 'Mickael', lastName: 'Malsa', shirtNumber: 14, position: 'defender', nationality: 'FR', displayOrder: 4 },
  // Milieux
  { slug: 'm-armougom', firstName: 'Hugo', lastName: 'Armougom', shirtNumber: 8, position: 'midfielder', nationality: 'FR', displayOrder: 1 },
  { slug: 'm-saivet', firstName: 'Henri', lastName: 'Saivet', shirtNumber: 10, position: 'midfielder', nationality: 'SN', displayOrder: 2 },
  { slug: 'm-koffi', firstName: 'Romaric', lastName: 'Koffi', shirtNumber: 6, position: 'midfielder', nationality: 'CI', displayOrder: 3 },
  // Attaquants
  { slug: 'a-evans', firstName: 'Antoine', lastName: 'Evans', shirtNumber: 9, position: 'forward', nationality: 'FR', displayOrder: 1 },
  { slug: 'a-soumano', firstName: 'Fode', lastName: 'Soumano', shirtNumber: 11, position: 'forward', nationality: 'ML', displayOrder: 2 },
];

const staff = [
  { slug: 's-batlles', firstName: 'Laurent', lastName: 'Batlles', role: 'coach', staffTitle: 'Entraîneur principal', nationality: 'FR', displayOrder: 1 },
  { slug: 's-adjoint', firstName: 'Pierre', lastName: 'Marichal', role: 'staff', staffTitle: 'Entraîneur adjoint', nationality: 'FR', displayOrder: 2 },
  { slug: 's-prep', firstName: 'Julien', lastName: 'Casanova', role: 'staff', staffTitle: 'Préparateur physique', nationality: 'FR', displayOrder: 3 },
  { slug: 's-gardien', firstName: 'Cédric', lastName: 'Hengbart', role: 'staff', staffTitle: 'Entraîneur des gardiens', nationality: 'FR', displayOrder: 4 },
];

// ---- Calendrier (mock matchs saison 2025-2026) ----------------------

function daysFromNow(days, hour = 20, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const matches = [
  // Matchs joués
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(-14, 20, 0),
    isHome: true,
    opponent: 'Grenoble Foot 38',
    venue: 'Nouste Camp',
    status: 'played',
    homeScore: 2,
    awayScore: 1,
    broadcaster: 'BeIN Sports',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(-7, 19, 0),
    isHome: false,
    opponent: 'AS Saint-Étienne',
    venue: 'Stade Geoffroy-Guichard',
    status: 'played',
    homeScore: 1,
    awayScore: 1,
    broadcaster: 'BeIN Sports',
  },
  // Match à venir (proche)
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(3, 20, 45),
    isHome: true,
    opponent: 'Bastia',
    venue: 'Nouste Camp',
    status: 'scheduled',
    ticketUrl: 'https://billetterie.paufc.fr',
    broadcaster: 'BeIN Sports',
  },
  {
    competition: 'Coupe de France',
    season: '2025-2026',
    kickoffAt: daysFromNow(10, 21, 0),
    isHome: false,
    opponent: 'FC Sochaux-Montbéliard',
    venue: 'Stade Auguste-Bonal',
    status: 'scheduled',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(17, 20, 0),
    isHome: true,
    opponent: 'Caen',
    venue: 'Nouste Camp',
    status: 'scheduled',
    ticketUrl: 'https://billetterie.paufc.fr',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(24, 19, 0),
    isHome: false,
    opponent: 'Annecy',
    venue: 'Parc des Sports',
    status: 'scheduled',
  },
];

// ---- Actualités (mock) ----------------------------------------------

const articles = [
  {
    slug: 'victoire-grenoble-resume',
    title: 'Pau enchaîne face à Grenoble au Nouste Camp',
    excerpt:
      'Portés par un public bouillant, les Palois s’imposent 2-1 dans un match maîtrisé dès l’entame. Retour sur les temps forts.',
    body:
      "Le Nouste Camp a vibré samedi soir. Devant 8 200 spectateurs, le Pau FC s’est imposé 2-1 face à Grenoble dans un match au scénario maîtrisé. Ouverture du score dès la 12e minute par Antoine Evans sur un service en retrait de Henri Saivet, puis doublé en seconde période sur penalty.\n\nLes Isérois ont réduit l’écart en fin de match mais n’auront jamais réellement inquiété la défense paloise, solide. Une victoire qui place le Pau FC dans le ventre mou du classement et confirme la dynamique amorcée depuis le début du printemps.\n\nProchaine échéance : déplacement à Saint-Étienne dans une semaine, avant la réception de Bastia au Nouste Camp.",
    coverImageUrl: null,
    category: 'matchday',
    featured: true,
    publishedAt: daysFromNow(-13),
  },
  {
    slug: 'prolongation-evans',
    title: 'Antoine Evans prolonge jusqu’en 2028',
    excerpt:
      'Buteur du club depuis trois saisons, Antoine Evans s’engage pour deux années supplémentaires. Une signature stratégique pour le projet sportif.',
    body:
      "C’est officiel : Antoine Evans portera la tunique du Pau FC jusqu’en juin 2028. Le club a annoncé ce vendredi la prolongation de son attaquant français, arrivé en 2023 et auteur de 23 buts toutes compétitions confondues depuis ses débuts en Béarn.\n\nUne marque de confiance dans le projet sportif piloté par Laurent Batlles et qui s’appuie sur une ossature stable. « Pau, c’est ma famille football. Le club me fait grandir, je veux continuer à y construire quelque chose », confie le joueur à l’issue de la signature.\n\nLes négociations, entamées en début d’année, ont abouti rapidement, signe d’une volonté commune de prolonger l’aventure.",
    category: 'transfer',
    featured: false,
    publishedAt: daysFromNow(-6),
  },
  {
    slug: 'fondation-clinique',
    title: 'La Fondation Pau FC visite le service pédiatrie',
    excerpt:
      'Cinq joueurs de l’effectif se sont rendus au CHU de Pau ce mercredi pour rencontrer les enfants hospitalisés.',
    body:
      "Toujours engagée auprès des plus jeunes, la Fondation Pau FC a organisé une nouvelle visite au service pédiatrie du CHU de Pau ce mercredi après-midi. Cinq joueurs de l’effectif professionnel se sont prêtés au jeu : photos, dédicaces, échanges, et même un atelier de coloriage avec les plus petits.\n\nUne demi-journée riche en émotions pour les enfants hospitalisés et pour les joueurs eux-mêmes. « Ce sont des moments qui rappellent ce qui compte vraiment », souligne le capitaine Steeve Yago.\n\nLa Fondation poursuit sa mission tout au long de la saison, avec d’autres actions prévues dans les écoles et les hôpitaux du Béarn.",
    category: 'foundation',
    featured: false,
    publishedAt: daysFromNow(-2),
  },
  {
    slug: 'nouvelle-tribune-presentation',
    title: 'La nouvelle tribune Béarn ouvrira ses portes en août',
    excerpt:
      'Le club dévoile les premiers visuels de la nouvelle tribune Béarn, dont la livraison est attendue pour le coup d’envoi de la saison 2026-2027.',
    body:
      "Pierre par pierre, le Nouste Camp se transforme. Le Pau FC a dévoilé ce mardi les premiers visuels de la nouvelle tribune Béarn, dont la livraison est attendue pour la rentrée. Capacité totale du stade portée à 9 800 places, nouveaux espaces hospitalité, accès PMR repensés et fan zone permanente : la tribune s’inscrit dans le plan stratégique 2024-2028 du club.\n\nLes travaux, lancés à l’été 2025, respectent le calendrier. La nouvelle tribune sera inaugurée pour le premier match de Ligue 2 de la saison 2026-2027.",
    category: 'club',
    featured: false,
    publishedAt: daysFromNow(-21),
  },
];

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

  await logStep('Effectif (joueurs + staff)');
  for (const p of [...players, ...staff]) {
    await prisma.player.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  await logStep('Calendrier');
  // Pas de slug naturel sur Match : on identifie par (season, kickoff, opponent)
  for (const m of matches) {
    const existing = await prisma.match.findFirst({
      where: { season: m.season, kickoffAt: m.kickoffAt, opponent: m.opponent },
    });
    if (existing) {
      await prisma.match.update({ where: { id: existing.id }, data: m });
    } else {
      await prisma.match.create({ data: m });
    }
  }

  await logStep('Actualités');
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

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

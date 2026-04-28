import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const partners = [
  // Premium
  {
    slug: 'joma',
    name: 'Joma',
    tier: 'premium',
    logoUrl: '/logos/partners/Joma_Blue.png',
    websiteUrl: 'https://www.joma-sport.com',
    description: 'Équipementier officiel du Pau FC.',
    position: 1,
  },
  {
    slug: 'holy',
    name: 'Holy',
    tier: 'premium',
    logoUrl: '/logos/partners/Holy_Outline_Mono.png',
    websiteUrl: 'https://fr.holy.com/',
    description: 'Sponsor maillot et partenaire nutrition.',
    position: 2,
  },
  {
    slug: 'groupama',
    name: 'Groupama',
    tier: 'premium',
    logoUrl: '/logos/partners/groupama-ws-2.png',
    websiteUrl: 'https://www.groupama.fr',
    description: 'Partenaire assurance et prévoyance.',
    position: 3,
  },
  // Officiel
  {
    slug: 'intersport',
    name: 'Intersport',
    tier: 'officiel',
    logoUrl: '/logos/partners/Intersport.png',
    websiteUrl: 'https://www.intersport.fr',
    description: 'Partenaire équipements sportifs.',
    position: 1,
  },
  {
    slug: 'sarthou',
    name: 'Sarthou',
    tier: 'officiel',
    logoUrl: '/logos/partners/sarthou-site-1.png',
    websiteUrl: null,
    description: 'Partenaire construction et travaux.',
    position: 2,
  },
  {
    slug: 'ville-de-pau',
    name: 'Ville de Pau',
    tier: 'officiel',
    logoUrl: '/logos/partners/Pau.png',
    websiteUrl: 'https://www.pau.fr',
    description: 'Soutien de la commune de Pau.',
    position: 3,
  },
  // Local
  {
    slug: 'arobase-emploi',
    name: 'Arobase Emploi',
    tier: 'local',
    logoUrl: '/logos/partners/arobase.png',
    websiteUrl: 'https://arobase-emploi.fr/',
    description: "Agence d'intérim locale.",
    position: 1,
  },
  {
    slug: 'pbm-concept',
    name: 'PBM Concept',
    tier: 'local',
    logoUrl: '/logos/partners/pbm-concept.png',
    websiteUrl: 'https://pbmconcept.fr/',
    description: 'Aménagement et agencement.',
    position: 2,
  },
  {
    slug: 'assurance-navarre',
    name: 'Assurance de Navarre',
    tier: 'local',
    logoUrl: '/logos/partners/assurance-navare.png',
    websiteUrl: 'https://www.assurances-de-navarre.fr/',
    description: 'Assurance locale béarnaise.',
    position: 3,
  },
  {
    slug: 'bullux-services',
    name: 'Bullux Services',
    tier: 'local',
    logoUrl: '/logos/partners/bullux-services.png',
    websiteUrl: null,
    description: 'Services locaux.',
    position: 4,
  },
];

async function main() {
  console.log('🔄 Insertion des partenaires...');

  let inserted = 0;
  let updated = 0;

  for (const pt of partners) {
    const existing = await prisma.partner.findUnique({
      where: { slug: pt.slug },
    });

    await prisma.partner.upsert({
      where: { slug: pt.slug },
      update: pt,
      create: pt,
    });

    if (existing) {
      updated++;
      console.log(`  ✓ Mis à jour: ${pt.name}`);
    } else {
      inserted++;
      console.log(`  + Créé: ${pt.name}`);
    }
  }

  console.log(`\n✅ Terminé: ${inserted} créés, ${updated} mis à jour`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

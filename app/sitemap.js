import { prisma } from '@/lib/prisma';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.paufc.fr').replace(
  /\/$/,
  '',
);

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/boutique', priority: 0.9, changeFrequency: 'daily' },
  { path: '/equipe', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/calendrier', priority: 0.8, changeFrequency: 'daily' },
  { path: '/actualites', priority: 0.8, changeFrequency: 'daily' },
  { path: '/club', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/nouste-camp', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/partenaires', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/cgv', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/rgpd', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const now = new Date();

  const [products, categories, articles] = await Promise.all([
    prisma.product.findMany({
      where: { status: 'active' },
      select: { slug: true, updatedAt: true, customizable: true },
    }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({
      where: { publishedAt: { not: null, lte: now } },
      select: { slug: true, updatedAt: true, publishedAt: true },
    }),
  ]).catch(() => [[], [], []]); // graceful si BDD absente au build

  const entries = [
    ...STATIC_ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...categories.map((c) => ({
      url: `${BASE}/boutique/categorie/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...products.flatMap((p) => {
      const base = {
        url: `${BASE}/boutique/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
      return p.customizable
        ? [base, { ...base, url: `${BASE}/boutique/${p.slug}/personnaliser`, priority: 0.7 }]
        : [base];
    }),
    ...articles.map((a) => ({
      url: `${BASE}/actualites/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];

  return entries;
}

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.paufc.fr').replace(
  /\/$/,
  '',
);

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/compte/',
          '/connexion',
          '/inscription',
          '/mot-de-passe-oublie',
          '/checkout',
          '/checkout/success',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

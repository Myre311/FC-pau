// JSON-LD SportsTeam — injecté dans le root layout pour identification
// du club par Google + plateformes de search (rich results).

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.paufc.fr').replace(
  /\/$/,
  '',
);

const data = {
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  '@id': `${SITE_URL}/#club`,
  name: 'Pau FC',
  alternateName: 'Football Club de Pau',
  sport: 'Soccer',
  url: SITE_URL,
  foundingDate: '1920',
  foundingLocation: 'Pau, France',
  memberOf: {
    '@type': 'SportsOrganization',
    name: 'Ligue 2 BKT',
  },
  location: {
    '@type': 'StadiumOrArena',
    name: 'Nouste Camp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Boulevard de la Paix',
      postalCode: '64000',
      addressLocality: 'Pau',
      addressCountry: 'FR',
    },
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

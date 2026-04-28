import Link from 'next/link';

/**
 * Footer Sitemap - 6 colonnes de liens
 */
export function FooterSitemap() {
  const columns = [
    {
      title: 'Club',
      links: [
        { label: 'Le Club', href: '/club' },
        { label: 'Histoire', href: '/club#histoire' },
        { label: 'Stade', href: '/club#stade' },
        { label: 'Organigramme', href: '/club#organigramme' },
      ],
    },
    {
      title: 'Équipe',
      links: [
        { label: 'Effectif', href: '/equipe' },
        { label: 'Staff', href: '/equipe#staff' },
        { label: 'Calendrier', href: '/calendrier' },
        { label: 'Classement', href: '/calendrier#classement' },
      ],
    },
    {
      title: 'Billetterie',
      links: [
        { label: 'Réserver', href: '/billetterie' },
        { label: 'Tarifs', href: '/billetterie#tarifs' },
        { label: 'Infos pratiques', href: '/billetterie#infos' },
        { label: 'Abonnements', href: '/billetterie#abonnements' },
      ],
    },
    {
      title: 'Boutique',
      links: [
        { label: 'Maillots', href: '/boutique?categorie=maillots' },
        { label: 'Textile', href: '/boutique?categorie=textile' },
        { label: 'Accessoires', href: '/boutique?categorie=accessoires' },
        { label: 'Collections', href: '/boutique' },
      ],
    },
    {
      title: 'Actualités',
      links: [
        { label: 'Toutes les actus', href: '/actualites' },
        { label: 'Matchs', href: '/actualites?categorie=matchs' },
        { label: 'Transferts', href: '/actualites?categorie=transferts' },
        { label: 'Communiqués', href: '/actualites?categorie=communiques' },
      ],
    },
    {
      title: 'Partenaires',
      links: [
        { label: 'Nos partenaires', href: '/partenaires' },
        { label: 'Devenir partenaire', href: '/partenaires#devenir' },
        { label: 'Hospitalité', href: '/partenaires#hospitalite' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <section className="border-t border-white/10 bg-paufc-dark py-12">
      <div className="container-pau">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-paufc-yellow">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

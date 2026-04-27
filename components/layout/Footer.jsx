import Link from 'next/link';

// Footer sombre inspiré site officiel paufc.fr
// Fond nuit, bordure jaune, structure multi-colonnes

const FOOTER_SECTIONS = [
  {
    title: "L'équipe pro",
    links: [
      { href: '/equipe', label: 'Effectif' },
      { href: '/calendrier', label: 'Calendrier' },
      { href: '/actualites', label: 'Actualités' },
    ],
  },
  {
    title: 'Billetterie',
    links: [
      { href: '/billetterie', label: 'Acheter des places' },
      { href: '/billetterie/cashless', label: 'Carte cashless' },
      { href: '/billetterie/cashless/offres', label: 'Offres' },
      { href: '/billetterie/cashless/faq', label: 'FAQ Cashless' },
    ],
  },
  {
    title: 'Boutique',
    links: [
      { href: '/boutique', label: 'Catalogue' },
      { href: '/cgv', label: 'CGV Boutique' },
    ],
  },
  {
    title: 'Academy',
    links: [
      { href: '/academy', label: 'Présentation' },
      { href: '/academy/masculin', label: 'Pôle masculin' },
      { href: '/academy/feminin', label: 'Pôle féminin' },
      { href: '/academy/integrer', label: 'Rejoindre' },
      { href: '/academy/stages', label: 'Stages' },
    ],
  },
  {
    title: 'Le Club',
    links: [
      { href: '/club', label: 'Présentation' },
      { href: '/club/histoire', label: 'Histoire' },
      { href: '/partenaires', label: 'Partenaires' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/cgv', label: 'CGV' },
      { href: '/rgpd', label: 'Données personnelles' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/paufc',
    icon: (
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/paufc',
    icon: (
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/paufc',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/paufc',
    icon: (
      <>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-pau-yellow bg-pau-night text-white">
      {/* Main footer */}
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {FOOTER_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-pau-yellow">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-hover block text-sm text-white/80 transition-colors hover:text-pau-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-white/10">
        <div className="wrap py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p>© {year} Pau FC. Tous droits réservés.</p>
              <p className="text-xs">
                Nouste Camp, 8 Boulevard de l'Aviation, 64320 Bizanos
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border-2 border-white/30 text-white transition-colors hover:border-pau-yellow hover:bg-pau-yellow hover:text-pau-night"
                  aria-label={social.name}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

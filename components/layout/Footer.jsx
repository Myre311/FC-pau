import Link from 'next/link';

import { Logo } from '@/components/ui/Logo';
import { NewsletterTrigger } from '@/components/layout/NewsletterTrigger';

const COLUMNS = [
  {
    title: 'Boutique',
    links: [
      { href: '/boutique', label: 'Tout le catalogue' },
      { href: '/boutique/categorie/maillots', label: 'Maillots' },
      { href: '/boutique/categorie/lifestyle', label: 'Lifestyle' },
      { href: '/boutique/categorie/accessoires', label: 'Accessoires' },
    ],
  },
  {
    title: 'Le club',
    links: [
      { href: '/club', label: 'Histoire & projet' },
      { href: '/equipe', label: 'Effectif' },
      { href: '/calendrier', label: 'Calendrier' },
      { href: '/actualites', label: 'Actualités' },
      { href: '/nouste-camp', label: 'Nouste Camp' },
      { href: '/partenaires', label: 'Partenaires' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/cgv', label: 'CGV' },
      { href: '/rgpd', label: 'Confidentialité' },
      { href: '/cookies', label: 'Cookies' },
      { href: '/mentions-legales', label: 'Mentions légales' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-blanc/10 bg-nuit text-blanc">
      <div className="container-fc grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,_1fr)] md:gap-10 md:py-20">
        <div>
          <Logo className="text-3xl md:text-4xl" />
          <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-blanc/60">
            Pau FC — club de football professionnel basé en Béarn. Site officiel,
            boutique et espace partenaires.
          </p>
          <NewsletterTrigger className="mt-6 inline-flex items-center gap-2 border border-blanc/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc transition-colors hover:border-jaune hover:text-jaune">
            Recevoir la newsletter →
          </NewsletterTrigger>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              {col.title}
            </p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-blanc/70 transition-colors hover:text-jaune"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-blanc/10">
        <div className="container-fc flex flex-col gap-3 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40 md:flex-row md:items-center md:justify-between">
          <span>© {year} Pau FC · Tous droits réservés</span>
          <span>Béarn · 1920 · Hala Pau</span>
        </div>
      </div>
    </footer>
  );
}

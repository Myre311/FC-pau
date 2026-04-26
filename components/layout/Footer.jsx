'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

const NAV_SECTIONS = [
  {
    title: 'Club',
    links: [
      { href: '/equipe', label: 'Équipe pro' },
      { href: '/calendrier', label: 'Calendrier' },
      { href: '/actualites', label: 'Actualités' },
      { href: '/club', label: 'Présentation' },
      { href: '/club/histoire', label: 'Histoire' },
      { href: '/partenaires', label: 'Partenaires' },
    ],
  },
  {
    title: 'Boutique',
    links: [
      { href: '/boutique', label: 'Catalogue' },
      { href: '/billetterie', label: 'Billetterie' },
      { href: '/billetterie/cashless', label: 'Carte cashless' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/cgv', label: 'CGV Boutique' },
      { href: '/cgv-billetterie', label: 'CGV Billetterie' },
      { href: '/rgpd', label: 'Confidentialité' },
      { href: '/mentions-legales', label: 'Mentions légales' },
    ],
  },
];

const PARTNERS_LOGOS = [
  'Crédit Agricole',
  'Orange',
  'Caisse d\'Épargne',
  'Engie',
  'Carrefour',
  'Nike',
  'Ville de Pau',
  'Béarn Pyrénées',
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/paufc',
    icon: (
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/paufc',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/paufc',
    icon: (
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@paufc',
    icon: (
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: gérer l'inscription newsletter
    console.log('Newsletter:', email);
  };

  return (
    <footer className="relative border-t border-blanc/10 bg-gradient-to-b from-nuit to-n2 text-blanc">
      {/* Brand Hero Zone */}
      <div className="container-fc border-b border-blanc/5 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          {/* Brand storytelling */}
          <div>
            <Logo size="lg" className="mb-8" />
            <h2 className="mb-6 font-display text-[clamp(32px,5vw,56px)] uppercase leading-crush tracking-display-tight text-blanc">
              Béarn<br />
              <span className="text-jaune">1920</span><br />
              <span className="text-blanc/40">Hala Pau</span>
            </h2>
            <p className="mb-10 max-w-md font-sans text-[15px] leading-relaxed text-blanc/85">
              Club de football professionnel basé en Béarn. Passion, tradition et excellence depuis plus d'un siècle.
            </p>

            {/* Mini stats */}
            <dl className="grid grid-cols-3 gap-8">
              <div className="group">
                <dt className="font-display text-[28px] leading-none text-jaune transition-transform group-hover:scale-110">105+</dt>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/60">Ans d'histoire</dd>
              </div>
              <div className="group">
                <dt className="font-display text-[28px] leading-none text-jaune transition-transform group-hover:scale-110">15k</dt>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/60">Supporters</dd>
              </div>
              <div className="group">
                <dt className="font-display text-[28px] leading-none text-jaune transition-transform group-hover:scale-110">L2</dt>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/60">Ligue 2 BKT</dd>
              </div>
            </dl>
          </div>

          {/* Newsletter Hero */}
          <div className="flex flex-col justify-center">
            <div className="rounded-sm border border-jaune/20 bg-jaune/5 p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="mb-2 font-display text-[22px] uppercase leading-crush tracking-display-base text-jaune">
                  Newsletter
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-blanc/85">
                  Mercato, billetterie en avant-première, actus exclusives du club.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className="h-12 w-full border border-blanc/20 bg-nuit/60 px-4 font-sans text-[14px] text-blanc placeholder:text-blanc/40 transition-all focus:border-jaune focus:bg-nuit focus:outline-none focus:ring-2 focus:ring-jaune/20"
                />
                <Button type="submit" variant="primary" size="md" cornerCut className="btn-ripple w-full">
                  S'inscrire
                  <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="container-fc border-b border-blanc/5 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {NAV_SECTIONS.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h4 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-hover inline-block font-sans text-[14px] text-blanc/85 transition-colors hover:text-blanc"
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

      {/* Partenaires Carousel */}
      <div className="border-b border-blanc/5 py-10">
        <div className="overflow-hidden">
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...PARTNERS_LOGOS, ...PARTNERS_LOGOS].map((partner, idx) => (
              <span
                key={idx}
                className="mx-8 font-display text-[18px] uppercase tracking-wider text-blanc/15 transition-colors hover:text-dore"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Social + Legal */}
      <div className="container-fc py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Social icons */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-hover flex h-11 w-11 items-center justify-center border border-blanc/15 bg-blanc/5 text-blanc/70 transition-all duration-300 hover:border-jaune hover:bg-jaune hover:text-nuit"
                aria-label={social.name}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Legal + Badge */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blanc/40">
              © {year} Pau FC · Tous droits réservés
            </span>
            <span className="clip-mark inline-flex items-center gap-2 border border-jaune/30 bg-jaune/10 px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.15em] text-jaune">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Site officiel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

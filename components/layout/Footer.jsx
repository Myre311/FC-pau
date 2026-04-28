import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

const FOOTER_LINKS = [
  { href: '/equipe', label: 'Équipe' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/billetterie', label: 'Billetterie' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/club', label: 'Club' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/cgv', label: 'CGV' },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com/paufc' },
  { name: 'Twitter', href: 'https://twitter.com/paufc' },
  { name: 'Instagram', href: 'https://instagram.com/paufc' },
  { name: 'YouTube', href: 'https://youtube.com/paufc' },
];

export function Footer() {
  return (
    <footer className="border-t border-pau-yellow bg-pau-night">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        {/* Logo + Réseaux */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <Logo className="text-3xl" />
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-pau-yellow"
                aria-label={social.name}
              >
                <span className="font-mono text-sm uppercase tracking-wider">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm uppercase tracking-wider text-white transition-colors hover:text-pau-yellow"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-white/60">
            © {new Date().getFullYear()} Pau Football Club · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

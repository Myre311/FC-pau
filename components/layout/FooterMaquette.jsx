import Link from 'next/link';
import Image from 'next/image';

export function FooterMaquette() {
  return (
    <footer className="border-t border-white/10 bg-pau-night">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <Image
              src="/images/homepage/Logo-Pau-FC-2023.png"
              alt="Pau FC"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/60">
              Club de football professionnel évoluant en Ligue 2 BKT, domicilié au stade Nouste Camp à Pau.
              L'excellence sportive au service du Béarn.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/billetterie" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Billetterie
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/calendrier" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Calendrier
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Équipe
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Informations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/rgpd" className="font-sans text-sm text-white/60 transition-colors hover:text-pau-yellow">
                  RGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="font-sans text-xs text-white/40">
            © {new Date().getFullYear()} Pau Football Club. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

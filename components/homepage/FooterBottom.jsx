import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer Bottom - Adresse, liens légaux, copyright
 */
export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="border-t border-white/10 bg-paufc-dark py-8">
      <div className="container-pau">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo + Adresse */}
          <div className="text-center md:text-left">
            <div className="mb-3 flex justify-center md:justify-start">
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Pau FC"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="font-sans text-xs text-white/50">
              Nouste Camp, 8 Boulevard de l'Aviation
            </p>
            <p className="font-sans text-xs text-white/50">
              64320 Bizanos, France
            </p>
          </div>

          {/* Liens légaux */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link
              href="/mentions-legales"
              className="font-sans text-xs text-white/50 transition-colors hover:text-white"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="font-sans text-xs text-white/50 transition-colors hover:text-white"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/cgv"
              className="font-sans text-xs text-white/50 transition-colors hover:text-white"
            >
              CGV
            </Link>
            <Link
              href="/contact"
              className="font-sans text-xs text-white/50 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-mono text-xs text-white/40">
              © {currentYear} Pau FC
            </p>
            <p className="mt-1 font-mono text-xs text-white/30">
              Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

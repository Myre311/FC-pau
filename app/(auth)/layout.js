import Link from 'next/link';

import { Logo } from '@/components/ui/Logo';

// Layout minimaliste pour les pages auth — pas de Header/Footer pleins,
// juste le logo en haut et un lien de retour. On veut concentrer
// l'attention sur le formulaire.

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-pau-night text-white">
      <header className="border-b border-white/10">
        <div className="container-fc flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-jaune"
            aria-label="Retour accueil"
          >
            <Logo className="text-2xl md:text-3xl" />
          </Link>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-pau-yellow"
          >
            ← Accueil
          </Link>
        </div>
      </header>

      <main className="container-fc grid min-h-[calc(100vh-5rem)] place-items-center py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}

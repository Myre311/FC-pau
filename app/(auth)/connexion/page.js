import Link from 'next/link';

import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Connexion',
  robots: { index: false, follow: false },
};

export default function ConnexionPage({ searchParams }) {
  const next = typeof searchParams?.next === 'string' ? searchParams.next : null;

  return (
    <div>
      <p className="badge-mono">Mon espace</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
        Connexion
      </h1>
      <p className="mt-4 font-sans text-sm text-white/60">
        Retrouvez vos commandes, adresses et personnalisations.
      </p>

      <div className="mt-10">
        <LoginForm next={next} />
      </div>

      <div className="mt-8 space-y-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em]">
        <p className="text-white/60">
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="text-pau-yellow hover:underline">
            Créer un compte
          </Link>
        </p>
        <p className="text-white/60">
          <Link
            href="/mot-de-passe-oublie"
            className="text-white/60 transition-colors hover:text-pau-yellow"
          >
            Mot de passe oublié ?
          </Link>
        </p>
      </div>
    </div>
  );
}

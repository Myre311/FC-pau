import Link from 'next/link';

import { SignupForm } from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Inscription',
  robots: { index: false, follow: false },
};

export default function InscriptionPage() {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">Rejoignez les rangs</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
        Créer un<br />compte
      </h1>
      <p className="mt-4 font-sans text-sm text-white/60">
        Suivi des commandes, paiement express, sauvegarde des
        personnalisations maillot — un seul compte pour tout.
      </p>

      <div className="mt-10">
        <SignupForm />
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        Déjà inscrit ?{' '}
        <Link href="/connexion" className="text-pau-yellow hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}

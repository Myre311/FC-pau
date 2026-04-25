import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Mes favoris' };

// Page favoris — placeholder en attendant le modèle Favorite (Phase 6).
// Pour l'instant, redirige vers la boutique.

export default function FavorisPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="badge-mono">Mes coups de cœur</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Favoris
        </h1>
      </header>

      <div className="border border-dashed border-blanc/15 p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
          Bientôt disponible
        </p>
        <p className="mt-4 font-sans text-blanc/60">
          La gestion des favoris arrive avec la prochaine mise à jour. En
          attendant, ajoutez vos pièces préférées au panier.
        </p>
        <Link href="/boutique" className="mt-6 inline-block">
          <Button variant="outline" size="md">
            Voir la boutique
          </Button>
        </Link>
      </div>
    </div>
  );
}

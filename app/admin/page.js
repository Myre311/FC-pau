import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export const metadata = { title: 'Tableau de bord' };

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Bienvenue sur le dashboard"
        title="Tableau de bord"
      />

      <div className="rounded-lg border border-blanc/10 bg-primaire/30 p-8">
        <h2 className="font-display text-2xl text-blanc mb-4">
          Dashboard Admin - Version Simplifiée
        </h2>
        <p className="text-blanc/70 mb-6">
          Cette version temporaire permet de vérifier que l'authentification fonctionne.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/produits"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Produits</h3>
            <p className="text-blanc/60 text-sm">Gérer le catalogue</p>
          </Link>

          <Link
            href="/admin/commandes"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Commandes</h3>
            <p className="text-blanc/60 text-sm">Voir les commandes</p>
          </Link>

          <Link
            href="/admin/actualites"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Actualités</h3>
            <p className="text-blanc/60 text-sm">Gérer les articles</p>
          </Link>

          <Link
            href="/admin/matchs"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Matchs</h3>
            <p className="text-blanc/60 text-sm">Calendrier et résultats</p>
          </Link>

          <Link
            href="/admin/clients"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Clients</h3>
            <p className="text-blanc/60 text-sm">Gérer les utilisateurs</p>
          </Link>

          <Link
            href="/admin/stock"
            className="block rounded-lg border border-blanc/10 bg-nuit/50 p-6 transition-colors hover:border-jaune/30"
          >
            <h3 className="font-display text-lg text-blanc mb-2">Stock</h3>
            <p className="text-blanc/60 text-sm">Gérer les stocks</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

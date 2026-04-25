import Link from 'next/link';

import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatPrice, formatDate } from '@/lib/format';

const STATUS_LABELS = {
  pending: 'En attente',
  paid: 'Payée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

export const metadata = { title: 'Mes commandes' };

export default async function MesCommandesPage() {
  const { dbUser } = await requireUser();

  const orders = await prisma.order.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="badge-mono">Historique</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-blanc md:text-6xl">
          Mes commandes
        </h1>
      </header>

      {orders.length === 0 ? (
        <div className="border border-dashed border-blanc/15 p-10 text-center">
          <p className="font-sans text-blanc/60">
            Vous n&apos;avez pas encore passé de commande.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-blanc/10 border border-blanc/10">
          {orders.map((o) => (
            <li key={o.id} className="grid gap-3 px-4 py-5 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-6">
              <div>
                <Link
                  href={`/compte/commandes/${o.number}`}
                  className="font-mono text-sm text-blanc transition-colors hover:text-jaune"
                >
                  {o.number}
                </Link>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                  {formatDate(o.createdAt)} · {o.items.length} article
                  {o.items.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="font-sans text-sm text-blanc/70">
                {o.items
                  .slice(0, 2)
                  .map((it) => it.productName)
                  .join(' · ')}
                {o.items.length > 2 && ` · +${o.items.length - 2}`}
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-blanc">{formatPrice(o.total)}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
                  {STATUS_LABELS[o.status] ?? o.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

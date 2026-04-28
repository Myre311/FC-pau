import Link from 'next/link';

import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatPrice, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Mon espace' };

export default async function ComptePage() {
  const { dbUser } = await requireUser();

  const [recentOrders, addressCount, customizationCount] = await Promise.all([
    prisma.order.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { items: true },
    }),
    prisma.address.count({ where: { userId: dbUser.id } }),
    prisma.jerseyCustomization.count({ where: { userId: dbUser.id } }),
  ]);

  return (
    <div className="space-y-10">
      <header>
        <p className="badge-mono">Tableau de bord</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white md:text-6xl">
          Bonjour {dbUser.firstName ?? 'Supporter'}
        </h1>
      </header>

      <section className="grid gap-3 md:grid-cols-3">
        <KpiCard
          label="Commandes"
          value={recentOrders.length}
          href="/compte/commandes"
          cta="Voir tout"
        />
        <KpiCard
          label="Adresses"
          value={addressCount}
          href="/compte/adresses"
          cta="Gérer"
        />
        <KpiCard
          label="Personnalisations"
          value={customizationCount}
          href="/compte/personnalisations"
          cta="Voir"
        />
      </section>

      <section>
        <header className="mb-5 flex items-end justify-between border-b border-white/10 pb-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-yellow">
            Dernières commandes
          </h2>
          <Link
            href="/compte/commandes"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-pau-yellow"
          >
            Voir tout
          </Link>
        </header>

        {recentOrders.length === 0 ? (
          <div className="border border-dashed border-white/15 p-8 text-center">
            <p className="font-sans text-sm text-white/60">
              Aucune commande pour le moment.
            </p>
            <Link href="/boutique" className="mt-4 inline-block">
              <Button variant="outline" size="md">
                Voir la boutique
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-blanc/10 border border-white/10">
            {recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-4 px-4 py-4">
                <div className="min-w-0">
                  <Link
                    href={`/compte/commandes/${o.number}`}
                    className="font-mono text-sm text-white transition-colors hover:text-pau-yellow"
                  >
                    {o.number}
                  </Link>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {formatDate(o.createdAt)} · {o.items.length} article
                    {o.items.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-white">
                    {formatPrice(o.total)}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
                    {o.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function KpiCard({ label, value, href, cta }) {
  return (
    <Link
      href={href}
      className="block border border-white/10 bg-pau-primary/20 p-5 transition-colors hover:border-white/25"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
        {label}
      </p>
      <p className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white">
        {value}
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        {cta} →
      </p>
    </Link>
  );
}

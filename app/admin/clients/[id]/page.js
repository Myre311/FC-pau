import { notFound } from 'next/navigation';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice, formatDate } from '@/lib/format';

export const metadata = { title: 'Fiche client' };

export default async function ClientFichePage({ params }) {
  const customer = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      orders: { orderBy: { createdAt: 'desc' }, include: { items: true } },
      addresses: true,
    },
  }).catch(() => null);
  if (!customer) notFound();

  const lifetimeValue = customer.orders
    .filter((o) => ['paid', 'preparing', 'shipped', 'delivered'].includes(o.status))
    .reduce((n, o) => n + o.total, 0);

  return (
    <div className="space-y-10">
      <AdminPageHeader
        kicker="Client"
        title={`${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim() || customer.email}
        breadcrumb={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/clients', label: 'Clients' },
          { label: customer.email },
        ]}
      />

      <section className="grid gap-3 md:grid-cols-3">
        <Stat label="LTV" value={formatPrice(lifetimeValue)} />
        <Stat label="Commandes" value={customer.orders.length} />
        <Stat label="Inscription" value={formatDate(customer.createdAt)} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <header className="mb-4 border-b border-blanc/10 pb-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Commandes · {customer.orders.length}
            </h2>
          </header>
          {customer.orders.length === 0 ? (
            <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
              Pas encore de commande.
            </p>
          ) : (
            <ul className="divide-y divide-blanc/10 border border-blanc/10">
              {customer.orders.map((o) => (
                <li
                  key={o.id}
                  className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6"
                >
                  <Link
                    href={`/admin/commandes/${o.number}`}
                    className="font-mono text-sm text-blanc transition-colors hover:text-jaune"
                  >
                    {o.number}
                  </Link>
                  <StatusBadge status={o.status} />
                  <span className="font-mono text-sm md:text-right">
                    {formatPrice(o.total)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <header className="mb-4 border-b border-blanc/10 pb-3">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Adresses · {customer.addresses.length}
            </h2>
          </header>
          {customer.addresses.length === 0 ? (
            <p className="border border-dashed border-blanc/15 p-6 font-sans text-sm text-blanc/60">
              Aucune adresse enregistrée.
            </p>
          ) : (
            <ul className="space-y-3">
              {customer.addresses.map((a) => (
                <li key={a.id} className="border border-blanc/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
                    {a.type === 'shipping' ? 'Livraison' : 'Facturation'}
                    {a.isDefault && (
                      <span className="ml-2 text-blanc/60">· Par défaut</span>
                    )}
                  </p>
                  <p className="mt-2 font-sans text-sm text-blanc">
                    {a.firstName} {a.lastName}
                  </p>
                  <p className="font-sans text-sm text-blanc/70">
                    {a.line1}
                    {a.line2 && <>, {a.line2}</>}
                    <br />
                    {a.postalCode} {a.city} · {a.country}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-blanc/10 bg-primaire/20 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl uppercase leading-crush tracking-tightest text-blanc">
        {value}
      </p>
    </div>
  );
}

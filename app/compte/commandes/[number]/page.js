import { notFound } from 'next/navigation';
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

export const metadata = { title: 'Détail commande' };

export default async function OrderDetailPage({ params }) {
  const { dbUser } = await requireUser();

  const order = await prisma.order.findUnique({
    where: { number: params.number },
    include: { items: true },
  });

  // Vérification d'autorisation : la commande doit appartenir au user
  if (!order || order.userId !== dbUser.id) notFound();

  const shipping = order.shippingAddress;
  const billing = order.billingAddress;

  return (
    <article className="space-y-8">
      <header>
        <Link
          href="/compte/commandes"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60 hover:text-jaune"
        >
          ← Retour aux commandes
        </Link>
        <h1 className="mt-4 font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
          {order.number}
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
          {STATUS_LABELS[order.status]} · {formatDate(order.createdAt)}
        </p>
      </header>

      <section className="border border-blanc/10">
        <header className="flex items-center justify-between border-b border-blanc/10 px-4 py-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
            Articles
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
            {order.items.length}
          </span>
        </header>
        <ul className="divide-y divide-blanc/10">
          {order.items.map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="min-w-0">
                <p className="font-sans text-sm text-blanc">{it.productName}</p>
                {it.variantLabel && (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                    {it.variantLabel} · ×{it.quantity}
                  </p>
                )}
              </div>
              <span className="font-mono text-sm text-blanc">
                {formatPrice(it.unitPrice * it.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-blanc/10 p-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
          Récapitulatif
        </h2>
        <dl className="mt-4 space-y-2 font-mono text-sm">
          <Line label="Sous-total" value={formatPrice(order.subtotal)} />
          {order.discountTotal > 0 && (
            <Line
              label={`Remise${order.couponCode ? ` (${order.couponCode})` : ''}`}
              value={`- ${formatPrice(order.discountTotal)}`}
            />
          )}
          <Line label="Livraison" value={formatPrice(order.shippingCost)} />
          {order.taxTotal > 0 && <Line label="TVA" value={formatPrice(order.taxTotal)} />}
          <Line label="Total" value={formatPrice(order.total)} bold />
        </dl>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {shipping && (
          <AddressBlock title="Adresse de livraison" address={shipping} />
        )}
        {billing && billing !== shipping && (
          <AddressBlock title="Adresse de facturation" address={billing} />
        )}
      </section>
    </article>
  );
}

function Line({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between border-b border-blanc/5 py-1">
      <dt className="text-blanc/60">{label}</dt>
      <dd className={bold ? 'text-blanc' : 'text-blanc/80'}>{value}</dd>
    </div>
  );
}

function AddressBlock({ title, address }) {
  return (
    <div className="border border-blanc/10 p-4">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
        {title}
      </h3>
      <address className="mt-3 not-italic font-sans text-sm text-blanc/80">
        <p className="text-blanc">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.postalCode} {address.city}
        </p>
        <p>{address.country}</p>
        {address.phone && <p className="mt-2 font-mono text-xs">{address.phone}</p>}
      </address>
    </div>
  );
}

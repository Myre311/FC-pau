import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { OrderStatusForm } from '@/components/admin/OrderStatusForm';
import { formatPrice, formatDate } from '@/lib/format';

export const metadata = { title: 'Commande' };

export default async function AdminOrderPage({ params }) {
  const order = await prisma.order.findUnique({
    where: { number: params.number },
    include: {
      items: { include: { variant: { include: { product: true } } } },
      user: true,
    },
  });
  if (!order) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Commande"
        title={order.number}
        breadcrumb={[
          { href: '/admin', label: 'Admin' },
          { href: '/admin/commandes', label: 'Commandes' },
          { label: order.number },
        ]}
        actions={<StatusBadge status={order.status} />}
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <div className="border border-blanc/10">
            <header className="flex items-center justify-between border-b border-blanc/10 px-4 py-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
                Articles · {order.items.length}
              </h2>
            </header>
            <ul className="divide-y divide-blanc/10">
              {order.items.map((it) => (
                <li key={it.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6">
                  <div>
                    <p className="font-sans text-sm text-blanc">{it.productName}</p>
                    {it.variantLabel && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
                        {it.variantLabel}
                        {it.variant?.sku && (
                          <span className="ml-2 text-blanc/30">SKU {it.variant.sku}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-blanc/70">×{it.quantity}</span>
                  <span className="font-mono text-sm text-blanc md:text-right">
                    {formatPrice(it.unitPrice * it.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-blanc/10 p-4">
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {order.shippingAddress && (
              <AddressBlock title="Livraison" address={order.shippingAddress} />
            )}
            {order.billingAddress && (
              <AddressBlock title="Facturation" address={order.billingAddress} />
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="border border-blanc/10 p-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Client
            </h2>
            <dl className="mt-3 space-y-2 font-sans text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                  Email
                </dt>
                <dd className="mt-1 truncate text-blanc">
                  {order.user?.email ?? order.guestEmail ?? '—'}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                  Compte
                </dt>
                <dd className="mt-1 text-blanc">
                  {order.user
                    ? `${order.user.firstName ?? ''} ${order.user.lastName ?? ''}`.trim() || 'Compte client'
                    : 'Invité'}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                  Date
                </dt>
                <dd className="mt-1 text-blanc">{formatDate(order.createdAt)}</dd>
              </div>
              {order.stripePaymentIntentId && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
                    Stripe PI
                  </dt>
                  <dd className="mt-1 truncate font-mono text-xs text-blanc/70">
                    {order.stripePaymentIntentId}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="border border-blanc/10 p-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
              Mise à jour statut
            </h2>
            <div className="mt-4">
              <OrderStatusForm order={order} />
            </div>
          </div>
        </aside>
      </div>
    </div>
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
      </address>
    </div>
  );
}

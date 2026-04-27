import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminStat } from '@/components/admin/AdminStat';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Newsletter' };

export default async function AdminNewsletterPage({ searchParams }) {
  const segment = typeof searchParams?.segment === 'string' ? searchParams.segment : null;

  const where = {
    unsubscribedAt: null,
    ...(segment ? { segments: { has: segment } } : {}),
  };

  const [active, confirmed, all, list] = await Promise.all([
    prisma.newsletterSubscriber.count({ where: { unsubscribedAt: null } }).catch(() => 0),
    prisma.newsletterSubscriber.count({
      where: { unsubscribedAt: null, confirmedAt: { not: null } },
    }).catch(() => 0),
    prisma.newsletterSubscriber.count().catch(() => 0),
    prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200,
    }).catch(() => []),
  ]);

  const exportHref = segment
    ? `/api/admin/newsletter/export?segment=${segment}`
    : '/api/admin/newsletter/export';

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="Communication"
        title="Newsletter"
        actions={
          <a
            href={exportHref}
            className="border border-jaune/40 bg-jaune/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-jaune transition-colors hover:bg-jaune hover:text-nuit"
          >
            Exporter CSV ↓
          </a>
        }
      />

      <section className="grid gap-3 md:grid-cols-3">
        <AdminStat label="Abonnés actifs" value={active} hint="Hors désinscrits" tone="accent" />
        <AdminStat label="Confirmés" value={confirmed} hint="Double opt-in validé" />
        <AdminStat label="Total tous statuts" value={all} hint="Inclut désinscrits" />
      </section>

      <nav aria-label="Filtre segment" className="flex flex-wrap gap-2">
        {[
          { value: null, label: 'Tous' },
          { value: 'matchday', label: 'Matchday' },
          { value: 'shop', label: 'Boutique' },
          { value: 'partners', label: 'Partenaires' },
          { value: 'all', label: 'Tout' },
        ].map((s) => {
          const active = segment === s.value;
          const href = s.value
            ? `/admin/newsletter?segment=${s.value}`
            : '/admin/newsletter';
          return (
            <Link
              key={s.label}
              href={href}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                active ? 'bg-jaune text-nuit' : 'border border-blanc/15 text-blanc/70 hover:border-blanc/40'
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>

      <AdminTable
        columns={[
          { key: 'email', label: 'Email' },
          { key: 'segments', label: 'Thématiques' },
          { key: 'status', label: 'Statut', width: '110px' },
          { key: 'source', label: 'Source', width: '110px' },
          { key: 'date', label: 'Inscription', width: '140px' },
        ]}
        rows={list}
        empty="Aucun abonné pour ce filtre"
        mobileCardLabel={(s) => s.email}
        renderRow={(s) => ({
          email: <span className="font-mono text-xs text-blanc/85">{s.email}</span>,
          segments: (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60">
              {s.segments.join(' · ')}
            </span>
          ),
          status: (
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                s.confirmedAt ? 'text-jaune' : 'text-blanc/40'
              }`}
            >
              {s.confirmedAt ? 'Confirmé' : 'En attente'}
            </span>
          ),
          source: (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
              {s.source ?? '—'}
            </span>
          ),
          date: <span className="font-mono text-xs text-blanc/60">{formatDate(s.createdAt)}</span>,
        })}
      />
    </div>
  );
}

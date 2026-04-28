// Badge de statut commande / publication. Couleurs accord avec
// la charte stricte (jaune accent, blanc neutre, primaire fond).

const STYLES = {
  // Order
  pending: 'bg-white/10 text-gray-900',
  paid: 'bg-pau-yellow text-pau-night',
  preparing: 'bg-white text-pau-night',
  shipped: 'bg-white/15 text-gray-900',
  delivered: 'bg-white/5 text-gray-900/70',
  cancelled: 'bg-white border border-gray-200/30 text-gray-900/50',
  refunded: 'bg-pau-night border border-pau-yellow/40 text-pau-yellow',
  // Product
  draft: 'bg-white/5 text-gray-900/60',
  active: 'bg-pau-yellow text-pau-night',
  archived: 'bg-white border border-gray-200/20 text-gray-900/40',
  // Match
  scheduled: 'bg-white/10 text-gray-900',
  live: 'bg-pau-yellow text-pau-night',
  played: 'bg-white/5 text-gray-900/60',
  postponed: 'bg-white border border-gray-200/30 text-gray-900/60',
};

const LABELS = {
  pending: 'En attente',
  paid: 'Payée',
  preparing: 'Préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
  draft: 'Brouillon',
  active: 'Publié',
  archived: 'Archivé',
  scheduled: 'Planifié',
  live: 'En direct',
  played: 'Joué',
  postponed: 'Reporté',
};

export function StatusBadge({ status, label }) {
  const cls = STYLES[status] ?? 'bg-white/10 text-gray-900';
  const text = label ?? LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${cls}`}>
      {text}
    </span>
  );
}

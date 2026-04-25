// Badge de statut commande / publication. Couleurs accord avec
// la charte stricte (jaune accent, blanc neutre, primaire fond).

const STYLES = {
  // Order
  pending: 'bg-blanc/10 text-blanc',
  paid: 'bg-jaune text-nuit',
  preparing: 'bg-blanc text-nuit',
  shipped: 'bg-blanc/15 text-blanc',
  delivered: 'bg-blanc/5 text-blanc/70',
  cancelled: 'bg-nuit border border-blanc/30 text-blanc/50',
  refunded: 'bg-nuit border border-jaune/40 text-jaune',
  // Product
  draft: 'bg-blanc/5 text-blanc/60',
  active: 'bg-jaune text-nuit',
  archived: 'bg-nuit border border-blanc/20 text-blanc/40',
  // Match
  scheduled: 'bg-blanc/10 text-blanc',
  live: 'bg-jaune text-nuit',
  played: 'bg-blanc/5 text-blanc/60',
  postponed: 'bg-nuit border border-blanc/30 text-blanc/60',
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
  const cls = STYLES[status] ?? 'bg-blanc/10 text-blanc';
  const text = label ?? LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${cls}`}>
      {text}
    </span>
  );
}

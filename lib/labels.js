// Traductions FR pour les enums Prisma exposés à l'UI.
// Centralisé ici pour rester cohérent entre toutes les pages.

export const POSITION_LABELS = {
  goalkeeper: 'Gardiens',
  defender: 'Défenseurs',
  midfielder: 'Milieux',
  forward: 'Attaquants',
};

export const POSITION_SHORT = {
  goalkeeper: 'GK',
  defender: 'DEF',
  midfielder: 'MIL',
  forward: 'ATT',
};

export const PERSON_ROLE_LABELS = {
  player: 'Joueur',
  staff: 'Staff',
  coach: 'Coach',
};

export const ARTICLE_CATEGORY_LABELS = {
  matchday: 'Matchday',
  club: 'Club',
  transfer: 'Mercato',
  foundation: 'Fondation',
  other: 'Autre',
};

export const MATCH_STATUS_LABELS = {
  scheduled: 'À venir',
  live: 'En direct',
  played: 'Terminé',
  cancelled: 'Annulé',
  postponed: 'Reporté',
};

export const PARTNER_TIER_LABELS = {
  premium: 'Partenaires Premium',
  officiel: 'Partenaires Officiels',
  local: 'Partenaires Locaux',
};

export const PARTNER_TIER_ORDER = ['premium', 'officiel', 'local'];

// Date FR pour calendrier — "Sam. 27 avril, 20h45"
export function formatMatchDate(date) {
  if (!date) return '—';
  const d = new Date(date);
  const day = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(d);
  const time = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(d)
    .replace(':', 'h');
  return `${day} · ${time}`;
}

// Date longue FR pour articles — "27 avril 2026"
export function formatArticleDate(date) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

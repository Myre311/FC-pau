// Tous les prix sont stockés en centimes (Int) en BDD pour éviter les floats.
// Les helpers de cette lib font la conversion vers / depuis affichage.

export function formatPrice(cents, { currency = 'EUR', locale = 'fr-FR' } = {}) {
  if (typeof cents !== 'number' || Number.isNaN(cents)) return '—';
  const value = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date, { locale = 'fr-FR' } = {}) {
  if (!date) return '—';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

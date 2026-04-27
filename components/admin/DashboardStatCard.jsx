const ICONS = {
  revenue: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  orders: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cart: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  alert: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const TONE_STYLES = {
  success: 'border-green-500/20 bg-green-500/5',
  warning: 'border-yellow-500/20 bg-yellow-500/5',
  danger: 'border-red-500/20 bg-red-500/5',
  default: 'border-blanc/10 bg-primaire/30',
};

const ICON_TONE_STYLES = {
  success: 'bg-green-500/10 text-green-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
  danger: 'bg-red-500/10 text-red-400',
  default: 'bg-jaune/10 text-jaune',
};

export function DashboardStatCard({ label, value, subtitle, icon = 'revenue', trend, tone = 'default' }) {
  return (
    <div className={`rounded-lg border p-6 transition-all hover:shadow-lg ${TONE_STYLES[tone]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-wider text-blanc/60">
            {label}
          </p>
          <p className="mt-3 font-display text-3xl text-blanc">{value}</p>
          {subtitle && (
            <p className="mt-2 font-mono text-xs text-blanc/40">{subtitle}</p>
          )}
          {trend && (
            <p className="mt-2 font-mono text-xs text-green-400">
              {trend} vs mois dernier
            </p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${ICON_TONE_STYLES[tone]}`}>
          {ICONS[icon]}
        </div>
      </div>
    </div>
  );
}

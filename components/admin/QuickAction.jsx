import Link from 'next/link';

const ICONS = {
  plus: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  article: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  orders: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  stock: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function QuickAction({ href, icon = 'plus', label, description, badge }) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 rounded-lg border border-gray-200/10 bg-pau-primary/20 p-4 transition-all hover:border-pau-yellow/30 hover:bg-pau-primary/40"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-jaune/10 text-pau-yellow transition-transform group-hover:scale-110">
        {ICONS[icon]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm uppercase text-gray-900">{label}</p>
        <p className="mt-0.5 font-mono text-xs text-gray-900/50">{description}</p>
      </div>
      {badge && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-jaune text-xs font-bold text-nuit">
          {badge}
        </div>
      )}
      <svg className="h-4 w-4 text-gray-900/30 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

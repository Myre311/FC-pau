import Link from 'next/link';

export function AdminPageHeader({ kicker, title, breadcrumb, actions }) {
  return (
    <header className="border-b border-blanc/10 pb-6">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
          {breadcrumb.map((b, i) => (
            <span key={b.href ?? b.label}>
              {i > 0 && <span className="mx-2 text-blanc/30">/</span>}
              {b.href ? (
                <Link href={b.href} className="hover:text-jaune">
                  {b.label}
                </Link>
              ) : (
                <span className="text-blanc">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {kicker && (
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              {kicker}
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl uppercase leading-crush tracking-tightest text-blanc md:text-5xl">
            {title}
          </h1>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
}

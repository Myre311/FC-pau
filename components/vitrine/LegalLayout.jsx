// Container partagé pour les pages légales — typographie longue,
// largeur lecture confortable.

export function LegalLayout({ kicker, title, lastUpdated, children }) {
  return (
    <article className="container-fc py-12 md:py-20">
      <header className="mb-12 max-w-3xl">
        {kicker && <p className="badge-mono">{kicker}</p>}
        <h1 className="mt-4 font-display text-5xl uppercase leading-crush tracking-tightest text-pau-primary md:text-6xl">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/50">
            Mise à jour : {lastUpdated}
          </p>
        )}
      </header>

      <div className="prose-fc max-w-3xl space-y-8 font-sans text-base leading-relaxed text-pau-primary/80 md:text-base">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl uppercase leading-crush tracking-tightest text-pau-primary md:text-3xl">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

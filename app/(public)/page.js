// Homepage placeholder — sera remplacée en Phase 4 par le portage de
// fcpau-index.html (hero canvas animé, sections actu/calendrier, etc.).
// Pour l'instant, vitrine du design system.

export default function HomePage() {
  return (
    <>
      <section className="container-fc pt-16 pb-12 md:pt-24">
        <p className="badge-mono">FC PAU · BÉARN · 1920</p>
        <h1 className="mt-6 text-[20vw] md:text-[14vw] lg:text-[180px]">
          PAU<span className="text-jaune">.</span>FC
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blanc/80 md:text-xl">
          Site officiel en construction. Vitrine, boutique, configurateur maillot et espace
          partenaires — un seul écosystème pour le club et ses supporters.
        </p>
      </section>

      <section className="container-fc grid grid-cols-2 gap-3 pb-16 md:grid-cols-5 md:gap-4">
        <ColorChip name="Nuit" hex="#04091D" className="bg-nuit text-blanc" />
        <ColorChip name="Primaire" hex="#1A1D38" className="bg-primaire text-blanc" />
        <ColorChip name="Jaune" hex="#FFCC00" className="bg-jaune text-nuit" />
        <ColorChip name="Doré · Partenaires" hex="#CBA74D" className="bg-dore text-nuit" />
        <ColorChip name="Blanc" hex="#FFFFFF" className="bg-blanc text-nuit" />
      </section>

      <section className="container-fc grid gap-6 pb-24 md:grid-cols-3 md:gap-8">
        <TypeSample
          label="Display · Big Shoulders"
          example="HALA PAU"
          className="font-display text-6xl tracking-tightest leading-crush"
        />
        <TypeSample
          label="Sans · Instrument Sans"
          example="Le Pau FC est un club professionnel basé en Béarn."
          className="font-sans text-lg leading-relaxed"
        />
        <TypeSample
          label="Mono · DM Mono"
          example="MATCHDAY · 25.04.26 · 20H45"
          className="font-mono text-base tracking-widest"
        />
      </section>
    </>
  );
}

function ColorChip({ name, hex, className }) {
  return (
    <div className={`corner-cut flex flex-col justify-between p-4 ${className}`} style={{ minHeight: 140 }}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{name}</span>
      <span className="font-mono text-sm">{hex}</span>
    </div>
  );
}

function TypeSample({ label, example, className }) {
  return (
    <div className="border border-blanc/10 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">{label}</p>
      <p className={`mt-4 ${className}`}>{example}</p>
    </div>
  );
}

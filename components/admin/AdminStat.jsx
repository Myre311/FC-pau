export function AdminStat({ label, value, hint, tone = 'default' }) {
  const tones = {
    default: 'text-blanc',
    accent: 'text-jaune',
    warn: 'text-jaune',
  };
  return (
    <div className="border border-blanc/10 bg-primaire/20 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-4xl uppercase leading-crush tracking-tightest ${tones[tone]}`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/40">
          {hint}
        </p>
      )}
    </div>
  );
}

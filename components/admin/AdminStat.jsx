export function AdminStat({ label, value, hint, tone = 'default' }) {
  const tones = {
    default: 'text-gray-900',
    accent: 'text-pau-yellow',
    warn: 'text-pau-yellow',
  };
  return (
    <div className="border border-gray-200/10 bg-pau-primary/20 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/50">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-4xl uppercase leading-crush tracking-tightest ${tones[tone]}`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-900/40">
          {hint}
        </p>
      )}
    </div>
  );
}

// Champ formulaire partagé pour /connexion + /inscription.
// Pas de "use client" : utilise simplement HTML natif.
export function AuthFormField({
  label,
  name,
  type = 'text',
  required = true,
  autoComplete,
  defaultValue,
  hint,
  pattern,
  minLength,
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
        {label}
        {required && <span className="ml-1 text-jaune">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        pattern={pattern}
        minLength={minLength}
        className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
      />
      {hint && (
        <span className="mt-1.5 block font-mono text-[10px] tracking-[0.15em] text-blanc/40">
          {hint}
        </span>
      )}
    </label>
  );
}

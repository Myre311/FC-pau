// Skip to content link pour l'accessibilité clavier
// Apparaît uniquement au focus, permet de sauter le header/nav

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="skip-to-content fixed left-6 top-[-100px] z-[9999] border-2 border-jaune bg-jaune px-6 py-3 font-display text-sm uppercase tracking-[0.1em] text-nuit shadow-focus-ring-strong transition-all duration-200 focus:top-6"
    >
      Aller au contenu principal
    </a>
  );
}

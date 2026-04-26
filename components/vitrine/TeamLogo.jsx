/**
 * Composant Logo d'équipe avec vrais logos
 * Pour ajouter un vrai logo : placer le fichier dans /public/logos/[slug].svg
 */
export function TeamLogo({ name = '???', isHome = false }) {
  // Mapping nom → slug pour les logos
  const teamSlugs = {
    'Pau FC': 'pau-fc',
    'Paris FC': 'paris-fc',
    'EA Guingamp': 'guingamp',
    'AC Ajaccio': 'ajaccio',
    'SC Bastia': 'bastia',
    'SM Caen': 'caen',
    'Grenoble Foot 38': 'grenoble',
    'Stade Lavallois': 'laval',
    'FC Annecy': 'annecy',
    'Amiens SC': 'amiens',
    'Rodez AF': 'rodez',
    'ESTAC Troyes': 'troyes',
    'USL Dunkerque': 'dunkerque',
    'FC Martigues': 'martigues',
    'FC Lorient': 'lorient',
    'Red Star FC': 'red-star',
  };

  const slug = teamSlugs[name];
  const logoPath = slug ? `/logos/${slug}.svg` : null;

  // Couleurs par équipe (pour les placeholders)
  const teamColors = {
    'Pau FC': { bg: 'bg-[#04091D]', text: 'text-jaune', border: 'border-jaune' },
    'Paris FC': { bg: 'bg-[#003087]', text: 'text-white', border: 'border-white' },
    'EA Guingamp': { bg: 'bg-red-600', text: 'text-white', border: 'border-white' },
    'AC Ajaccio': { bg: 'bg-red-700', text: 'text-white', border: 'border-white' },
    'SC Bastia': { bg: 'bg-blue-700', text: 'text-white', border: 'border-white' },
    'SM Caen': { bg: 'bg-red-600', text: 'text-blue-700', border: 'border-blue-700' },
  };

  const colors = teamColors[name] || {
    bg: isHome ? 'bg-nuit' : 'bg-blanc/10',
    text: isHome ? 'text-jaune' : 'text-blanc',
    border: isHome ? 'border-jaune' : 'border-blanc/30'
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 transition-all md:h-28 md:w-28 ${colors.border} ${colors.bg}`}>
        {logoPath ? (
          // Vrai logo SVG (à ajouter dans /public/logos/)
          <img
            src={logoPath}
            alt={`Logo ${name}`}
            className="h-16 w-16 object-contain md:h-20 md:w-20"
            onError={(e) => {
              // Fallback si le logo n'existe pas
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}

        {/* Fallback texte (affiché si pas de logo ou erreur) */}
        <span
          className={`font-display text-2xl font-black md:text-3xl ${colors.text}`}
          style={{ display: logoPath ? 'none' : 'block' }}
        >
          {name.substring(0, 3).toUpperCase()}
        </span>
      </div>

      <p className={`max-w-[100px] text-center font-display text-xs font-bold uppercase leading-tight md:text-sm ${
        isHome ? 'text-jaune' : 'text-blanc/70'
      }`}>
        {name}
      </p>
    </div>
  );
}

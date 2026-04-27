import Image from 'next/image';

/**
 * Affiche le logo de la compétition (Ligue 2 BKT) au lieu du texte
 * Utilisé partout où la compétition est affichée
 */
export function CompetitionBadge({ competition = 'Ligue 2 BKT', className = '' }) {
  const isLigue2 = competition?.includes('Ligue 2') || competition?.includes('L2');

  if (isLigue2) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Image
          src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
          alt="Ligue 2 BKT"
          width={120}
          height={34}
          className="h-auto w-20 sm:w-24 md:w-28"
          priority
        />
      </div>
    );
  }

  // Fallback pour les autres compétitions (Coupe de France, etc.)
  return (
    <span className={`badge-pau ${className}`}>
      {competition}
    </span>
  );
}

import { prisma } from '@/lib/prisma';
import { StatsGrid } from '@/components/stats/StatsGrid';
import { TopScorers } from '@/components/stats/TopScorers';
import { TeamOverview } from '@/components/stats/TeamOverview';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Statistiques Équipe',
  description:
    'Statistiques détaillées des joueurs du Pau FC : buts, passes, minutes jouées, classements.',
};

export default async function StatsPage() {
  // Récupérer tous les joueurs avec leurs stats
  const players = await prisma.player.findMany({
    where: {
      active: true,
      role: 'player',
    },
    include: {
      stats: true,
    },
    orderBy: { lastName: 'asc' },
  });

  // Stats globales de l'équipe
  const teamStats = players.reduce(
    (acc, player) => {
      if (player.stats) {
        acc.goals += player.stats.goals;
        acc.assists += player.stats.assists;
        acc.yellowCards += player.stats.yellowCards;
        acc.redCards += player.stats.redCards;
        acc.matchesPlayed = Math.max(acc.matchesPlayed, player.stats.matchesPlayed);
      }
      return acc;
    },
    { goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0 }
  );

  // Top buteurs
  const topScorers = players
    .filter((p) => p.stats && p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 10);

  // Top passeurs
  const topAssisters = players
    .filter((p) => p.stats && p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists)
    .slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-jaune bg-nuit py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-4 h-1 w-16 bg-jaune" />
          <h1 className="title-hero text-blanc">Statistiques</h1>
          <p className="mt-4 max-w-2xl text-lg text-blanc/80">
            Performances détaillées de l'équipe et des joueurs - Saison 2025-2026
          </p>
        </div>
      </section>

      {/* Overview équipe */}
      <section className="section-pau bg-blanc">
        <div className="container-pau">
          <TeamOverview stats={teamStats} />
        </div>
      </section>

      {/* Top buteurs et passeurs */}
      <section className="section-pau border-t-4 border-gray-300 bg-gray-50">
        <div className="container-pau">
          <div className="grid gap-8 lg:grid-cols-2">
            <TopScorers title="Meilleurs buteurs" players={topScorers} statKey="goals" />
            <TopScorers title="Meilleurs passeurs" players={topAssisters} statKey="assists" />
          </div>
        </div>
      </section>

      {/* Grid complète des stats */}
      <section className="section-pau bg-blanc">
        <div className="container-pau">
          <div className="mb-8">
            <div className="mb-4 h-1 w-16 bg-jaune" />
            <h2 className="title-section">Statistiques détaillées</h2>
          </div>
          <StatsGrid players={players} />
        </div>
      </section>
    </>
  );
}

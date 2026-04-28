import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const metadata = {
  title: "L'Équipe Pro — Pau FC",
  description: "Découvrez l'effectif complet du Pau FC saison 2025/2026 : joueurs et staff.",
};

export default async function EquipePage() {
  // Récupérer tous les joueurs par poste
  const players = await prisma.player
    .findMany({
      where: { status: 'active' },
      orderBy: [{ position: 'asc' }, { jerseyNumber: 'asc' }],
    })
    .catch(() => []);

  const gardiens = players.filter((p) => p.position === 'GK');
  const defenseurs = players.filter((p) => p.position === 'DEF');
  const milieux = players.filter((p) => p.position === 'MID');
  const attaquants = players.filter((p) => p.position === 'ATT');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-pau-night/10 bg-white py-12 md:py-16">
        <div className="container-pau">
          <span className="badge-mono text-pau-primary">Saison 2025/2026</span>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl lg:text-6xl">
            L'Équipe Pro 25/26
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="container-pau py-12 md:py-16">
        {/* Gardiens */}
        {gardiens.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-pau-night">
              Les Gardiens
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gardiens.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Défenseurs */}
        {defenseurs.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-pau-night">
              Les Défenseurs
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {defenseurs.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Milieux */}
        {milieux.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-pau-night">
              Les Milieux
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {milieux.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Attaquants */}
        {attaquants.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-pau-night">
              Les Attaquants
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {attaquants.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Staff */}
        <div className="border-t border-pau-night/10 pt-16">
          <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-night">
            Le Staff
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Staff technique */}
            <div>
              <h3 className="mb-6 font-display text-xl font-bold uppercase text-pau-yellow">
                Staff Technique
              </h3>
              <div className="space-y-4">
                <StaffMember name="Didier Tholot" role="Entraîneur principal" />
                <StaffMember name="Vincent Bracigliano" role="Entraîneur adjoint" />
                <StaffMember name="Julien Cardy" role="Préparateur physique" />
                <StaffMember name="Thomas Ayassamy" role="Analyste vidéo" />
              </div>
            </div>

            {/* Staff médical */}
            <div>
              <h3 className="mb-6 font-display text-xl font-bold uppercase text-pau-yellow">
                Staff Médical
              </h3>
              <div className="space-y-4">
                <StaffMember name="Dr. Marc Laporte" role="Médecin du club" />
                <StaffMember name="Pierre Durand" role="Kinésithérapeute" />
                <StaffMember name="Sophie Martin" role="Kinésithérapeute" />
                <StaffMember name="Alexandre Petit" role="Ostéopathe" />
                <StaffMember name="Julie Bernard" role="Podologue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Player Card
function PlayerCard({ player }) {
  return (
    <article className="group border-2 border-pau-night/10 bg-white transition-all hover:border-pau-yellow">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-pau-night/5">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-bold text-pau-night/20">
              {player.jerseyNumber}
            </span>
          </div>
        )}

        {/* Numéro overlay */}
        <div className="absolute left-0 top-0 bg-pau-yellow px-3 py-1">
          <span className="font-display text-xl font-bold text-pau-night">
            {player.jerseyNumber}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold uppercase text-pau-night">
          {player.firstName} {player.lastName}
        </h3>
        <p className="mt-1 font-sans text-sm text-pau-night/60">
          {getPositionLabel(player.position)}
        </p>
      </div>
    </article>
  );
}

// Composant Staff Member
function StaffMember({ name, role }) {
  return (
    <div className="border-l-2 border-pau-yellow pl-4">
      <h4 className="font-display text-base font-bold uppercase text-pau-night">
        {name}
      </h4>
      <p className="mt-1 font-sans text-sm text-pau-night/70">{role}</p>
    </div>
  );
}

// Helper position label
function getPositionLabel(position) {
  const labels = {
    GK: 'Gardien',
    DEF: 'Défenseur',
    MID: 'Milieu',
    ATT: 'Attaquant',
  };
  return labels[position] || position;
}

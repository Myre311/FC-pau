import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const metadata = {
  title: "L'Équipe Pro - Pau FC",
  description: "L'effectif 2025/2026 du Pau FC : joueurs, staff technique et médical au Nouste Camp.",
};

export default async function EquipePage() {
  // Récupérer tous les joueurs par poste
  const players = await prisma.player
    .findMany({
      where: { active: true, role: 'player' },
      orderBy: [{ position: 'asc' }, { shirtNumber: 'asc' }],
    })
    .catch(() => []);

  const gardiens = players.filter((p) => p.position === 'goalkeeper');
  const defenseurs = players.filter((p) => p.position === 'defender');
  const milieux = players.filter((p) => p.position === 'midfielder');
  const attaquants = players.filter((p) => p.position === 'forward');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[60vh] md:min-h-[500px] bg-pau-night">
        <Image
          src="/images/hero-equipe.jpg"
          alt="Équipe Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
          <div className="max-w-7xl">
            <span className="font-mono text-xs uppercase text-pau-yellow">Saison 2025/2026</span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase text-white md:text-6xl">
              L'Équipe Pro
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <div className="container-pau pb-14 pt-12 md:pb-20 md:pt-16">
        {/* Gardiens */}
        {gardiens.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-10 font-display text-3xl font-bold uppercase text-pau-yellow">
              Gardiens de but
            </h2>
            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gardiens.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Défenseurs */}
        {defenseurs.length > 0 && (
          <section className="mb-18">
            <h2 className="mb-10 font-display text-3xl font-bold uppercase text-pau-yellow">
              La défense
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
            <h2 className="mb-9 font-display text-3xl font-bold uppercase text-pau-yellow">
              Milieux de terrain
            </h2>
            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {milieux.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Attaquants */}
        {attaquants.length > 0 && (
          <section className="mb-18">
            <h2 className="mb-10 font-display text-3xl font-bold uppercase text-pau-yellow">
              L'attaque
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {attaquants.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>
        )}

        {/* Staff */}
        <section className="border-t border-pau-night/10 pt-16">
          <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-yellow">
            Le Staff
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Staff technique */}
            <div>
              <h3 className="mb-6 font-display text-xl font-bold uppercase text-pau-yellow">
                Staff Technique
              </h3>
              <div className="space-y-4">
                <StaffMember name="Didier Tholot" role="EntraÎneur principal" image="/images/club/DSC00082.png" />
                <StaffMember name="Vincent Bracigliano" role="EntraÎneur adjoint" image={null} />
                <StaffMember name="Julien Cardy" role="Préparateur physique" image={null} />
                <StaffMember name="Thomas Ayassamy" role="Analyste vidéo" image={null} />
              </div>
            </div>

            {/* Staff médical */}
            <div>
              <h3 className="mb-6 font-display text-xl font-bold uppercase text-pau-yellow">
                Staff Médical
              </h3>
              <div className="space-y-4">
                <StaffMember name="Dr. Marc Laporte" role="Médecin du club" image={null} />
                <StaffMember name="Pierre Durand" role="Kinésithérapeute" image={null} />
                <StaffMember name="Sophie Martin" role="Kinésithérapeute" image={null} />
                <StaffMember name="Alexandre Petit" role="Ostéopathe" image={null} />
                <StaffMember name="Julie Bernard" role="Podologue" image={null} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Composant Player Card
function PlayerCard({ player }) {
  return (
    <article className="group border border-pau-night/10 bg-pau-primary transition-all hover:border-pau-night/20">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-pau-night/80">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt={`${player.firstName} ${player.lastName}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-bold text-white/20">
              {player.shirtNumber}
            </span>
          </div>
        )}

        {/* Numéro overlay */}
        <div className="absolute left-0 top-0 bg-pau-yellow px-3 py-1">
          <span className="font-display text-xl font-bold text-pau-night">
            {player.shirtNumber}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold uppercase text-white">
          {player.firstName} {player.lastName}
        </h3>
        <p className="mt-1 font-sans text-sm text-white/70">
          {getPositionLabel(player.position)}
        </p>
      </div>
    </article>
  );
}

// Composant Staff Member
function StaffMember({ name, role, image }) {
  return (
    <article className="border border-pau-night/10 bg-pau-night p-5 transition-all hover:border-pau-night/20">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-pau-primary">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-[50%_40%]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-lg font-bold text-white/20">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-display text-base font-bold uppercase text-white">
            {name}
          </h4>
          <p className="mt-1 font-sans text-sm text-white/70">{role}</p>
        </div>
      </div>
    </article>
  );
}

// Helper position label
function getPositionLabel(position) {
  const labels = {
    goalkeeper: 'Gardien',
    defender: 'Défenseur',
    midfielder: 'Milieu',
    forward: 'Attaquant',
  };
  return labels[position] || position;
}

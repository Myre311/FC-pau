import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Le Club — Pau FC',
  description: "Histoire, stade, dirigeants et joueurs emblématiques du Pau FC.",
};

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-pau-night">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] bg-pau-night">
        <Image
          src="/images/hero-club.jpg"
          alt="Le Club Pau FC"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />
        <div className="container-pau relative flex h-full items-end pb-16">
          <div>
            <span className="font-mono text-xs uppercase text-pau-yellow">Histoire & Valeurs</span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase text-white md:text-6xl">
              Le Club
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-pau-night py-16 md:py-24">
        <div className="container-pau">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-48 w-48 md:h-64 md:w-64">
                <Image
                  src="/images/homepage/Logo-Pau-FC-2023.png"
                  alt="Logo PAU FC"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
                Origines du Football Palois
              </h2>
              <div className="space-y-4 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                <p>Les premières sections football se créent dans les clubs omnisports au début du XXe siècle à Pau.</p>
                <p>Trois clubs fondateurs marquent l'histoire du football palois :</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li><strong className="text-white">Football Association Bourbaki</strong> (1904)</li>
                  <li><strong className="text-white">Jeanne d'Arc le Béarn</strong> (1909)</li>
                  <li><strong className="text-white">Union Jurançonnaise</strong> (1907)</li>
                </ul>
                <div className="pt-4">
                  <Link href="/club/histoire" className="inline-block border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night">
                    Voir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-pau-primary py-16 md:py-24">
        <div className="container-pau">
          <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            Les Joueurs Passés par le Club
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <PlayerProfile name="André-Pierre Gignac" position="Attaquant" years="2005-2006" description="Formé au PAU FC, Gignac a brillé en Ligue 1 avec l'OM et Toulouse avant de devenir une légende au Mexique avec les Tigres UANL." />
            <PlayerProfile name="Adrien Rabiot" position="Milieu" years="2008-2009" description="Passé par le centre de formation du PAU FC, Rabiot a ensuite rejoint le PSG avant de s'imposer comme un cadre de la Juventus et de l'équipe de France." />
            <PlayerProfile name="Anthony Briançon" position="Défenseur" years="2025-2027" description="Capitaine emblématique du PAU FC, Briançon incarne l'esprit de combativité et le leadership sur le terrain." />
          </div>
        </div>
      </section>

      <section className="bg-pau-night py-16 md:py-24">
        <div className="container-pau">
          <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            PAU FC 2025/2026
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <DirectorProfile name="Bernard Laporte-Fray" role="Président" description="À la tête du club depuis plusieurs années, il œuvre au quotidien pour le développement et le rayonnement du PAU FC." />
            <DirectorProfile name="Luis de Sousa" role="Directeur Sportif" description="Responsable de la stratégie sportive du club, du recrutement et de la gestion de l'effectif professionnel." />
            <DirectorProfile name="Nicolas Usaï" role="Entraîneur Principal" description="À la tête de l'équipe professionnelle, il dirige les entraînements et la stratégie tactique sur le terrain." />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-pau-primary py-16 md:py-24">
        <div className="container-pau">
          <h2 className="mb-12 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            Notre Stade
          </h2>

          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <StatCard number="11,800" label="Places assises" />
            <StatCard number="2022" label="Année de rénovation" />
            <StatCard number="500" label="Hospitalités" />
            <StatCard number="85%" label="Taux de remplissage" />
          </div>

          <div className="relative aspect-[21/9] overflow-hidden border-2 border-white/10">
            <Image src="/images/homepage/Boutique.png" alt="Nouste Camp" fill className="object-cover" />
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 bg-pau-night py-8">
        <div className="container-pau text-center">
          <a href="#" className="inline-block font-display text-sm font-bold uppercase tracking-wide text-white/60 transition-colors hover:text-pau-yellow">
            Retour en haut
          </a>
        </div>
      </div>
    </div>
  );
}

function PlayerProfile({ name, position, years, description }) {
  return (
    <article className="border-2 border-white/10 bg-pau-night p-6">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-pau-primary">
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-4xl font-bold text-white/20">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      <h3 className="mb-2 font-display text-xl font-bold uppercase text-white">{name}</h3>
      <p className="mb-1 font-sans text-sm text-pau-yellow">{position}</p>
      <p className="mb-3 font-sans text-sm text-white/60">{years}</p>
      <p className="font-sans text-sm leading-relaxed text-white/80">{description}</p>
    </article>
  );
}

function DirectorProfile({ name, role, description }) {
  return (
    <article className="border-2 border-white/10 bg-pau-primary p-6">
      <div className="relative mb-4 aspect-square overflow-hidden bg-pau-night">
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-4xl font-bold text-white/20">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      <h3 className="mb-2 font-display text-xl font-bold uppercase text-white">{name}</h3>
      <p className="mb-3 font-sans text-sm font-bold text-pau-yellow">{role}</p>
      <p className="font-sans text-sm leading-relaxed text-white/70">{description}</p>
    </article>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="border-2 border-white/10 bg-pau-night p-6 text-center">
      <div className="mb-2 font-display text-4xl font-bold text-pau-yellow">{number}</div>
      <div className="font-sans text-sm text-white/70">{label}</div>
    </div>
  );
}

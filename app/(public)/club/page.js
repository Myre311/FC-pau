import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Le Club â€” Pau FC',
  description: "Notre histoire, le Nouste Camp, les lÃ©gendes qui ont portÃ© le maillot jaune et bleu.",
};

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-pau-night">
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[60vh] md:min-h-[500px] bg-pau-night">
        <Image
          src="/images/hero-club.jpg"
          alt="Le Club Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
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

      <section className="bg-pau-night pb-20 pt-14 md:pb-28 md:pt-22">
        <div className="container-pau">
          <div className="grid gap-14 md:grid-cols-[1fr_2fr] md:items-start">
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
              <h2 className="mb-7 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
                Notre Histoire
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-white/80 md:text-lg">
                <p>Le football Ã  Pau naÃ®t au dÃ©but du XXe siÃ¨cle, lorsque le ballon rond fait son apparition dans les clubs omnisports bÃ©arnais.</p>
                <p>Trois clubs historiques ont posÃ© les fondations du football palois :</p>
                <ul className="ml-6 space-y-2 list-disc">
                  <li><strong className="text-white">Football Association Bourbaki</strong> (1904)</li>
                  <li><strong className="text-white">Jeanne d'Arc le BÃ©arn</strong> (1909)</li>
                  <li><strong className="text-white">Union JuranÃ§onnaise</strong> (1907)</li>
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

      <section className="border-t border-white/10 bg-pau-primary pb-22 pt-18 md:pb-28 md:pt-24">
        <div className="container-pau">
          <h2 className="mb-14 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            Ils ont portÃ© nos couleurs
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            <PlayerProfile name="AndrÃ©-Pierre Gignac" position="Attaquant" years="2005-2006" description="FormÃ© au PAU FC, Gignac a brillÃ© en Ligue 1 avec l'OM et Toulouse avant de devenir une lÃ©gende au Mexique avec les Tigres UANL." image={null} />
            <PlayerProfile name="Adrien Rabiot" position="Milieu" years="2008-2009" description="PassÃ© par le centre de formation du PAU FC, Rabiot a ensuite rejoint le PSG avant de s'imposer comme un cadre de la Juventus et de l'Ã©quipe de France." image={null} />
            <PlayerProfile name="Anthony BrianÃ§on" position="DÃ©fenseur" years="2025-2027" description="Capitaine emblÃ©matique du PAU FC, BrianÃ§on incarne l'esprit de combativitÃ© et le leadership sur le terrain." image="/images/players/anthony-brianÃ§on-23.jpg" />
          </div>
        </div>
      </section>

      <section className="bg-pau-night pb-20 pt-16 md:pb-26 md:pt-22">
        <div className="container-pau">
          <h2 className="mb-14 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            Ceux qui font le club aujourd'hui
          </h2>

          <div className="grid gap-9 md:grid-cols-3">
            <DirectorProfile name="Bernard Laporte-Fray" role="PrÃ©sident" description="Ã€ la tÃªte du club depuis plusieurs annÃ©es, il Å“uvre au quotidien pour le dÃ©veloppement et le rayonnement du PAU FC." image="/images/club/BernardLaporte-Fray.png" />
            <DirectorProfile name="Luis de Sousa" role="Directeur Sportif" description="Responsable de la stratÃ©gie sportive du club, du recrutement et de la gestion de l'effectif professionnel." image="/images/club/luis-de-sousa-1.png" />
            <DirectorProfile name="Nicolas UsaÃ¯" role="EntraÃ®neur Principal" description="Ã€ la tÃªte de l'Ã©quipe professionnelle, il dirige les entraÃ®nements et la stratÃ©gie tactique sur le terrain." image="/images/club/DSC00082.png" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-pau-primary pb-24 pt-18 md:pb-30 md:pt-24">
        <div className="container-pau">
          <h2 className="mb-14 font-display text-3xl font-bold uppercase text-pau-yellow md:text-4xl">
            Nouste Camp â€” notre forteresse
          </h2>

          <div className="mb-16 grid gap-8 md:grid-cols-4">
            <StatCard number="11,800" label="Places assises" />
            <StatCard number="2022" label="AnnÃ©e de rÃ©novation" />
            <StatCard number="500" label="HospitalitÃ©s" />
            <StatCard number="85%" label="Taux de remplissage" />
          </div>

          <div className="relative aspect-[21/9] overflow-hidden border-2 border-white/10">
            <Image src="/images/homepage/Boutique.png" alt="Nouste Camp" fill className="object-cover object-[50%_40%]" />
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

function PlayerProfile({ name, position, years, description, image }) {
  return (
    <article className="border border-white/10 bg-pau-night p-7 transition-all hover:border-2 hover:border-pau-yellow">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-pau-primary">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-[50%_40%]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-4xl font-bold text-white/20">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
      </div>
      <h3 className="mb-2 font-display text-xl font-bold uppercase text-white">{name}</h3>
      <p className="mb-1 font-sans text-sm text-pau-yellow">{position}</p>
      <p className="mb-3 font-sans text-sm text-white/60">{years}</p>
      <p className="font-sans text-sm leading-relaxed text-white/80">{description}</p>
    </article>
  );
}

function DirectorProfile({ name, role, description, image }) {
  return (
    <article className="border border-white/10 bg-pau-primary p-7 transition-all hover:border-2 hover:border-pau-yellow">
      <div className="relative mb-4 aspect-square overflow-hidden bg-pau-night">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-[50%_40%]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-4xl font-bold text-white/20">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
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

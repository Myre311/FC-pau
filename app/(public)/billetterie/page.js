import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Billetterie — Pau FC',
  description:
    'Réservez vos places au Nouste Camp. Billetterie en ligne pour tous les matchs du Pau FC, tarifs réduits et packs famille.',
};

export default async function BilletteriePage() {
  // Récupérer les prochains matchs à domicile
  const upcomingMatches = await prisma.match.findMany({
    where: {
      isHome: true,
      status: 'scheduled',
      kickoffAt: { gte: new Date() },
    },
    orderBy: { kickoffAt: 'asc' },
    take: 6,
  });

  return (
    <article>
      {/* Hero fullscreen */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-pau-night md:h-[70vh]">
        {/* Image de fond */}
        <Image
          src="/images/homepage/billetterie-enfant.jpg"
          alt="Billetterie Pau FC"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />

        {/* Contenu */}
        <div className="container-pau relative flex h-full items-end pb-16 md:pb-20">
          <div className="max-w-3xl">
            <span className="badge-mono text-pau-yellow">Nouste Camp</span>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
              Billetterie
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Réservez vos places pour les matchs à domicile. Vivez l'ambiance du Nouste Camp, notre forteresse béarnaise.
            </p>
          </div>
        </div>
      </section>

      {/* Prochains matchs */}
      <section className="bg-pau-night pb-20 pt-14 md:pb-28 md:pt-22">
        <div className="container-pau">
          <div className="mb-14">
            <span className="badge-mono text-pau-yellow">Au Nouste Camp</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-yellow md:text-5xl">
              Les prochains rendez-vous
            </h2>
          </div>

          {upcomingMatches.length === 0 ? (
            <p className="font-sans text-lg text-white/60">
              Aucun match à domicile programmé pour le moment.{' '}
              <Link href="/calendrier" className="text-pau-yellow hover:underline">
                Consultez le calendrier complet
              </Link>
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {upcomingMatches.map((match) => (
                <MatchCardMaquette key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tarifs */}
      <section className="border-y border-white/10 bg-pau-primary pb-22 pt-18 md:pb-28 md:pt-24">
        <div className="container-pau">
          <div className="mb-14">
            <span className="badge-mono text-pau-yellow">Les tarifs</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Combien ça coûte ?
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <TarifCardMaquette
              title="Plein tarif"
              price="25€"
              description="Tribune Principale · Catégorie A"
            />
            <TarifCardMaquette
              title="Tarif réduit"
              price="15€"
              description="-18 ans, étudiants, +65 ans, demandeurs d'emploi"
            />
            <TarifCardMaquette
              title="Enfant"
              price="10€"
              description="-12 ans · Accompagné d'un adulte"
            />
            <TarifCardMaquette
              title="Abonné"
              price="15€"
              description="Tarif préférentiel pour les abonnés saison"
            />
            <TarifCardMaquette
              title="Groupe 10+"
              price="20€"
              description="À partir de 10 personnes · Réservation anticipée"
            />
            <TarifCardMaquette
              title="Pack Famille"
              price="55€"
              description="2 adultes + 2 enfants"
            />
          </div>

          <p className="mt-8 font-sans text-sm text-white/60">
            Tarifs indicatifs pour matchs de Ligue 2. Les tarifs peuvent varier selon la catégorie de match.
          </p>
        </div>
      </section>

      {/* Cashless */}
      <section className="bg-pau-night pb-18 pt-16 md:pb-24 md:pt-22">
        <div className="container-pau">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <div>
              <span className="badge-mono text-pau-yellow">Paiement sans contact</span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-yellow md:text-5xl">
                Cashless au stade
              </h2>
            </div>

            <div className="space-y-5 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              <p>
                Au Nouste Camp, le paiement est 100% cashless. Carte sans contact ou smartphone, vous choisissez.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-white">Rapide</strong> — Rechargez en ligne avant le match</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-white">Sécurisé</strong> — Paiement sans contact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-white">Remboursable</strong> — Solde non utilisé remboursé</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/billetterie/cashless"
                  className="inline-block border-2 border-pau-yellow bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-yellow transition-all hover:bg-pau-yellow hover:text-pau-night"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="border-y border-white/10 bg-pau-primary pb-20 pt-18 md:pb-26 md:pt-24">
        <div className="container-pau">
          <div className="mb-14">
            <span className="badge-mono text-pau-yellow">Bon à savoir</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Comment ça se passe
            </h2>
          </div>

          <div className="grid gap-14 md:grid-cols-2">
            <div className="border-2 border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 font-display text-2xl font-bold uppercase text-pau-yellow">
                Accès au stade
              </h3>
              <div className="space-y-4 font-sans text-base text-white/80">
                <p>
                  <strong className="text-white">Adresse</strong><br />
                  Nouste Camp, 8 Boulevard de l'Aviation, 64320 Bizanos
                </p>
                <p>
                  <strong className="text-white">Parking</strong><br />
                  Gratuit autour du stade (places limitées)
                </p>
                <p>
                  <strong className="text-white">Bus</strong><br />
                  Ligne 4, arrêt "Nouste Camp"
                </p>
                <p>
                  <strong className="text-white">Ouverture portes</strong><br />
                  1h avant le coup d'envoi
                </p>
              </div>
            </div>

            <div className="border-2 border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 font-display text-2xl font-bold uppercase text-pau-yellow">
                Règlement intérieur
              </h3>
              <ul className="space-y-3 font-sans text-base text-white/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pau-yellow">•</span>
                  <span>Interdiction de fumigènes, pétards, objets dangereux</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pau-yellow">•</span>
                  <span>Pas de bouteilles en verre</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pau-yellow">•</span>
                  <span>Contrôle de sécurité à l'entrée obligatoire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pau-yellow">•</span>
                  <span>Billet dématérialisé (QR code) requis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-pau-night pb-20 pt-16 md:pb-26 md:pt-22">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-mono text-pau-yellow">Besoin d'aide ?</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-yellow md:text-5xl">
              Nous sommes à votre écoute
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-sans text-lg text-white/70">
              Questions sur les billets, tarifs de groupe ou abonnements ? Notre équipe billetterie vous répond.
            </p>

            <div className="mt-8 space-y-3 font-sans text-base text-white/80">
              <p>
                Email :{' '}
                <a href="mailto:billetterie@paufc.fr" className="font-medium text-pau-yellow hover:underline">
                  billetterie@paufc.fr
                </a>
              </p>
              <p>
                Téléphone :{' '}
                <a href="tel:+33559000000" className="font-medium text-pau-yellow hover:underline">
                  +33 5 59 00 00 00
                </a>
              </p>
              <p className="text-sm text-white/60">Horaires : Lundi au vendredi, 9h-17h</p>
            </div>

            <div className="mt-8">
              <Link
                href="/cgv-billetterie"
                className="font-sans text-sm text-white/60 hover:text-pau-yellow"
              >
                Conditions générales de vente →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

// Composant Match Card style maquette
function MatchCardMaquette({ match }) {
  const dateObj = new Date(match.kickoffAt);
  const dateFr = dateObj.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const heure = dateObj.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="group border border-white/10 bg-pau-primary p-7 transition-all hover:border-2 hover:border-pau-yellow md:p-9">
      {/* Logo compétition */}
      {match.competition && (
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/competitions/ligue2-bkt.png"
            alt={match.competition}
            width={120}
            height={40}
            className="h-auto w-28 object-contain md:w-32"
          />
        </div>
      )}

      {/* Logos des équipes */}
      <div className="mb-6 flex items-center justify-center gap-6 md:gap-8">
        {/* Logo Pau FC */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white p-3 md:h-20 md:w-20">
          <Image
            src="/images/homepage/Logo-Pau-FC-2023.png"
            alt="Pau FC"
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>

        <span className="font-display text-2xl font-bold text-white md:text-3xl">vs</span>

        {/* Logo équipe adverse */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white p-3 md:h-20 md:w-20">
          {match.opponentLogo ? (
            <Image
              src={match.opponentLogo}
              alt={match.opponent}
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-pau-night">
              ?
            </div>
          )}
        </div>
      </div>

      {/* Équipes */}
      <h3 className="mb-3 text-center font-display text-2xl font-bold uppercase text-white md:text-3xl">
        Pau FC vs {match.opponent}
      </h3>

      {/* Date & heure */}
      <p className="mb-2 text-center font-sans text-base text-white/70">
        {dateFr} · {heure}
      </p>
      <p className="mb-6 text-center font-sans text-sm text-white/60">
        {match.venue || 'Nouste Camp'}
        {match.broadcaster && ` · ${match.broadcaster}`}
      </p>

      {/* CTA */}
      <div className="text-center">
        {match.ticketUrl ? (
          <a
            href={match.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
          >
            Réserver mes places
          </a>
        ) : (
          <span className="inline-block border-2 border-white/20 bg-white/5 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white/40">
            Bientôt disponible
          </span>
        )}
      </div>
    </article>
  );
}

// Composant Tarif Card style maquette
function TarifCardMaquette({ title, price, description }) {
  return (
    <div className="border border-white/10 bg-pau-night p-7 transition-all hover:border-2 hover:border-pau-yellow">
      <h3 className="mb-3 font-display text-2xl font-bold uppercase text-white">
        {title}
      </h3>
      <div className="mb-4 font-display text-4xl font-bold text-pau-yellow">
        {price}
      </div>
      <p className="font-sans text-sm leading-relaxed text-white/70">
        {description}
      </p>
    </div>
  );
}

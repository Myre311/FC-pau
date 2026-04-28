import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Billetterie — Pau FC',
  description:
    'Réservez vos places pour les matchs du Pau FC au Nouste Camp. Billetterie en ligne, tarifs, abonnements.',
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
              Vivez chaque match à domicile. Réservez vos places en ligne et soutenez le Pau FC au cœur du Béarn.
            </p>
          </div>
        </div>
      </section>

      {/* Prochains matchs */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-pau">
          <div className="mb-12">
            <span className="badge-mono text-pau-primary">Matchs à domicile</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Prochains matchs
            </h2>
          </div>

          {upcomingMatches.length === 0 ? (
            <p className="font-sans text-lg text-pau-night/60">
              Aucun match à domicile programmé pour le moment.{' '}
              <Link href="/calendrier" className="text-pau-yellow hover:underline">
                Voir le calendrier complet
              </Link>
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingMatches.map((match) => (
                <MatchCardMaquette key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tarifs */}
      <section className="border-y border-pau-night/10 bg-pau-night py-16 md:py-24">
        <div className="container-pau">
          <div className="mb-12">
            <span className="badge-mono text-pau-yellow">Prix</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Tarifs
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="bg-white py-16 md:py-24">
        <div className="container-pau">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="badge-mono text-pau-primary">Paiement</span>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
                Carte cashless
              </h2>
            </div>

            <div className="space-y-4 font-sans text-base leading-relaxed text-pau-night/70 md:text-lg">
              <p>
                Le Nouste Camp est 100% cashless. Payez vos consommations directement avec votre carte cashless ou smartphone.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-pau-night">Rapide</strong> — Rechargez en ligne avant le match</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-pau-night">Sécurisé</strong> — Paiement sans contact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pau-yellow" />
                  <span><strong className="text-pau-night">Remboursable</strong> — Solde non utilisé remboursé</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/billetterie/cashless"
                  className="inline-block border-2 border-pau-night bg-transparent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-night hover:text-white"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="border-y border-pau-night/10 bg-pau-night py-16 md:py-24">
        <div className="container-pau">
          <div className="mb-12">
            <span className="badge-mono text-pau-yellow">Informations</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              Infos pratiques
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
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
      <section className="bg-white py-16 md:py-24">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-mono text-pau-primary">Besoin d'aide ?</span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-pau-night md:text-5xl">
              Contact billetterie
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-pau-night/70">
              Pour toute question sur la billetterie, les tarifs de groupe ou les abonnements
            </p>

            <div className="mt-8 space-y-3 font-sans text-base text-pau-night/80">
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
              <p className="text-sm text-pau-night/60">Horaires : Lundi au vendredi, 9h-17h</p>
            </div>

            <div className="mt-8">
              <Link
                href="/cgv-billetterie"
                className="font-sans text-sm text-pau-night/60 hover:text-pau-yellow"
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
    <article className="group border-2 border-pau-night/10 bg-white p-6 transition-all hover:border-pau-yellow hover:shadow-lg md:p-8">
      {/* Badge compétition */}
      {match.competition && (
        <span className="mb-4 inline-block border border-pau-yellow bg-pau-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-pau-night">
          {match.competition}
        </span>
      )}

      {/* Équipes */}
      <h3 className="mb-3 font-display text-2xl font-bold uppercase text-pau-night md:text-3xl">
        Pau FC vs {match.opponentName}
      </h3>

      {/* Date & heure */}
      <p className="mb-2 font-sans text-base text-pau-night/70">
        {dateFr} · {heure}
      </p>
      <p className="mb-6 font-sans text-sm text-pau-night/60">
        {match.venue || 'Nouste Camp'}
        {match.broadcaster && ` · ${match.broadcaster}`}
      </p>

      {/* CTA */}
      {match.ticketUrl ? (
        <a
          href={match.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-pau-yellow bg-pau-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-pau-night hover:border-pau-night hover:text-pau-yellow"
        >
          Réserver mes places
        </a>
      ) : (
        <span className="inline-block border-2 border-pau-night/20 bg-pau-night/5 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night/40">
          Bientôt disponible
        </span>
      )}
    </article>
  );
}

// Composant Tarif Card style maquette
function TarifCardMaquette({ title, price, description }) {
  return (
    <div className="border-2 border-white/10 bg-white/5 p-6 transition-all hover:border-pau-yellow hover:bg-white/10">
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

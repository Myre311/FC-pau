import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Billetterie',
  description:
    'Achète tes billets pour les matchs du Pau FC au Nouste Camp. Billetterie en ligne, tarifs, abonnements.',
};

export default async function BilletteriePage() {
  // Récupérer les prochains matchs à domicile
  const matchsAVenir = await prisma.match.findMany({
    where: {
      isHome: true,
      status: 'scheduled',
      kickoffAt: {
        gte: new Date(),
      },
    },
    orderBy: { kickoffAt: 'asc' },
    take: 5,
  });

  return (
    <article>
      <PageHero
        image="/images/hero-billetterie.jpg"
        surtitle="Billetterie officielle · Nouste Camp"
        title="Vivez chaque match à domicile"
        subtitle="Viens soutenir le Pau FC au Nouste Camp ! Achète tes billets en ligne et profite d'une ambiance unique au cœur du Béarn."
      />

      {/* Prochains matchs */}
      <SectionLight>
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
          Prochains matchs à domicile
        </h2>

        {matchsAVenir.length === 0 ? (
          <p className="font-sans text-base text-[#0F1E45]/60">
            Aucun match à domicile programmé pour le moment. Consulte le{' '}
            <Link href="/calendrier" className="text-[#FFD60A] hover:underline">
              calendrier complet
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-6">
            {matchsAVenir.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </SectionLight>

      {/* Tarifs */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
          Tarifs
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <TarifCard
            title="Plein tarif"
            price="25€"
            description="Tribune Principale · Catégorie A"
          />
          <TarifCard
            title="Tarif réduit"
            price="15€"
            description="- de 18 ans, étudiants, + de 65 ans, demandeurs d'emploi"
          />
          <TarifCard
            title="Enfant"
            price="10€"
            description="- de 12 ans · Accompagné d'un adulte"
          />
          <TarifCard
            title="Abonné"
            price="15€"
            description="Tarif préférentiel pour les abonnés saison"
          />
          <TarifCard
            title="Groupe (10+)"
            price="20€"
            description="À partir de 10 personnes · Réservation à l'avance"
          />
          <TarifCard
            title="Famille (2+2)"
            price="55€"
            description="2 adultes + 2 enfants · Pack famille"
          />
        </div>

        <p className="mt-8 font-sans text-sm text-[#0F1E45]/60">
          Tarifs indicatifs pour matchs de Ligue 2. Les tarifs peuvent varier
          selon la catégorie de match (Coupe de France, matchs de gala, etc.).
        </p>
      </SectionLight>

      {/* Cashless */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
            Carte cashless
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-[#0F1E45]/75 md:text-lg">
            <p>
              Le Nouste Camp est 100% cashless. Paye tes consommations
              (buvette, boutique) directement avec ta carte cashless ou ton
              smartphone.
            </p>
            <p>
              <strong className="text-[#0F1E45]">Rapide</strong> — Plus besoin
              d'espèces, recharge ta carte en ligne avant le match.
            </p>
            <p>
              <strong className="text-[#0F1E45]">Sécurisé</strong> — Paiement sans
              contact, zéro risque de perte ou vol.
            </p>
            <p>
              <strong className="text-[#0F1E45]">Remboursable</strong> — Solde non
              utilisé remboursé à tout moment.
            </p>
            <div className="mt-6">
              <Link
                href="/billetterie/cashless"
                className="inline-block border border-[#0F1E45]/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-[#0F1E45] transition-colors hover:border-[#FFD60A] hover:text-[#FFD60A]"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </SectionLight>

      {/* Infos pratiques */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <h2 className="mb-12 font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
          Infos pratiques
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-[#FFD60A]">
              Accès au stade
            </h3>
            <div className="mt-4 space-y-3 font-sans text-base text-[#0F1E45]/75">
              <p>
                <strong className="text-[#0F1E45]">Adresse</strong> — Nouste Camp, 8
                Boulevard de l'Aviation, 64320 Bizanos
              </p>
              <p>
                <strong className="text-[#0F1E45]">Parking</strong> — Gratuit autour
                du stade (places limitées)
              </p>
              <p>
                <strong className="text-[#0F1E45]">Bus</strong> — Ligne 4, arrêt
                "Nouste Camp"
              </p>
              <p>
                <strong className="text-[#0F1E45]">Ouverture portes</strong> — 1h
                avant le coup d'envoi
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-[#FFD60A]">
              Règlement intérieur
            </h3>
            <div className="mt-4 space-y-3 font-sans text-base text-[#0F1E45]/75">
              <p>
                 Interdiction de fumigènes, pétards, objets dangereux
              </p>
              <p> Pas de bouteilles en verre</p>
              <p> Interdiction d'introduire de la nourriture extérieure</p>
              <p> Contrôle de sécurité à l'entrée obligatoire</p>
              <p> Billet dématérialisé (QR code) sur smartphone ou papier</p>
            </div>
          </div>
        </div>
      </SectionLight>

      {/* CTA */}
      <SectionLight className="border-t border-[#0F1E45]/10">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl uppercase leading-crush tracking-tightest text-[#0F1E45] md:text-6xl">
            Contact billetterie
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-[#0F1E45]/75 md:text-lg">
            Pour toute question sur la billetterie, les tarifs de groupe ou les
            abonnements :
          </p>

          <div className="mt-6 space-y-3 font-sans text-base text-[#0F1E45]/75">
            <p>
              Email :{' '}
              <a
                href="mailto:billetterie@paufc.fr"
                className="text-[#FFD60A] hover:underline"
              >
                billetterie@paufc.fr
              </a>
            </p>
            <p>
              Téléphone :{' '}
              <a href="tel:+33559000000" className="text-[#FFD60A] hover:underline">
                +33 5 59 00 00 00
              </a>
            </p>
            <p>Horaires : Lundi au vendredi, 9h-17h</p>
          </div>

          <div className="mt-8">
            <Link
              href="/cgv-billetterie"
              className="font-mono text-sm uppercase tracking-wider text-[#0F1E45]/60 hover:text-[#FFD60A]"
            >
              Conditions générales de vente →
            </Link>
          </div>
        </div>
      </SectionLight>
    </article>
  );
}

// Composant Match Card
function MatchCard({ match }) {
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
    <div className="group relative overflow-hidden border border-blanc/10 bg-primaire p-6 transition-all hover:border-jaune md:p-8">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
        <div>
          <span className="inline-block font-mono text-xs uppercase tracking-wider text-jaune">
            {match.competition}
          </span>
          <h3 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-blanc transition-colors group-hover:text-jaune md:text-4xl">
            Pau FC vs {match.opponent}
          </h3>
          <p className="mt-2 font-mono text-sm uppercase tracking-wider text-blanc/60">
            {dateFr} · {heure}
          </p>
          <p className="mt-1 font-sans text-sm text-blanc/60">
            {match.venue}
            {match.broadcaster && ` · ${match.broadcaster}`}
          </p>
        </div>

        <div className="flex items-center gap-4 md:justify-end">
          {match.ticketUrl ? (
            <a
              href={match.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-jaune px-6 py-3 font-mono text-sm uppercase tracking-wider text-nuit transition-transform hover:scale-105"
            >
              Réserver
            </a>
          ) : (
            <span className="inline-block border border-blanc/20 px-6 py-3 font-mono text-sm uppercase tracking-wider text-blanc/40">
              Bientôt disponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant Tarif Card
function TarifCard({ title, price, description }) {
  return (
    <div className="border-l-2 border-[#FFD60A] pl-6">
      <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-[#0F1E45]">
        {title}
      </h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-4xl text-[#FFD60A]">{price}</span>
      </div>
      <p className="mt-3 font-sans text-sm text-[#0F1E45]/75">{description}</p>
    </div>
  );
}

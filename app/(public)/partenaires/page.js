import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PartnersForm from './PartnersForm';

export const metadata = {
  title: 'Partenaires · Pau FC',
  description: 'Devenez partenaire du Pau FC. Visibilité terrain et tribunes, hospitalités VIP, et un réseau d\'affaires actif dans tout le Béarn.',
};

export default async function PartenairesPage() {
  // Récupérer tous les partenaires actifs avec logos
  const allPartners = await prisma.partner
    .findMany({
      where: {
        active: true,
        logoUrl: { not: '' }
      },
      orderBy: [{ tier: 'asc' }, { position: 'asc' }],
    })
    .catch(() => []);

  // Grouper par tier
  const premiumPartners = allPartners.filter(p => p.tier === 'premium');
  const officielPartners = allPartners.filter(p => p.tier === 'officiel');
  const localPartners = allPartners.filter(p => p.tier === 'local');
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[60vh] md:min-h-[500px] bg-pau-night">
        <Image
          src="/images/hero-partenaires.jpg"
          alt="Partenaires Pau FC"
          fill
          className="object-cover object-[50%_40%] brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night via-pau-night/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
          <div className="max-w-4xl">
            <span className="font-mono text-xs uppercase text-pau-gold">Partenariats</span>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase text-pau-gold md:text-5xl lg:text-6xl">
              Devenez partenaire<br />du Pau FC
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Associez votre entreprise au club. Visibilité terrain et tribunes, hospitalités VIP,
              et un réseau d'affaires actif dans tout le Béarn.
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="border-y border-pau-gold/20 bg-white py-18 md:py-24">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-5">
            <StatBox number="11,800" label="Sièges/match" />
            <StatBox number="50+" label="Entreprises partenaires" />
            <StatBox number="300" label="Convives VIP/match" />
            <StatBox number="200k+" label="Spectateurs annuels" />
            <StatBox number="1M+" label="Audience TV" />
          </div>
        </div>
      </section>

      {/* Nos Partenaires */}
      <section className="bg-white pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="container-pau">
          <h2 className="mb-14 text-center font-display text-3xl font-bold uppercase text-pau-gold md:text-4xl">
            Ils nous font confiance
          </h2>

          {/* Partenaires Premium */}
          {premiumPartners.length > 0 && (
            <div className="mb-16">
              <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
                Partenaires Premium
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {premiumPartners.map((partner) => (
                  <PartnerLogo key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}

          {/* Partenaires Officiels */}
          {officielPartners.length > 0 && (
            <div className="mb-16">
              <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
                Partenaires Officiels
              </h3>
              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {officielPartners.map((partner) => (
                  <PartnerLogoMedium key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}

          {/* Partenaires Locaux */}
          {localPartners.length > 0 && (
            <div>
              <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
                Partenaires Locaux
              </h3>
              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {localPartners.map((partner) => (
                  <PartnerLogoSmall key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Formulaire Devenir Partenaire */}
      <section className="border-t border-pau-gold/20 bg-pau-night pb-22 pt-18 md:pb-28 md:pt-24">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-center font-display text-3xl font-bold uppercase text-pau-gold md:text-4xl">
              Rejoignez nos partenaires
            </h2>
            <p className="mb-14 text-center font-sans text-lg text-white/80">
              Présentez-nous votre projet, nous vous recontactons sous 48 heures.
            </p>

            <PartnersForm />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-pau-night py-16">
        <div className="container-pau text-center">
          <p className="mb-4 font-sans text-base text-white/70">
            Pour toute question sur les partenariats
          </p>
          <div className="space-y-2">
            <p className="font-sans text-lg text-pau-gold">
              <a href="tel:+33559000000" className="hover:underline">+33 5 59 00 00 00</a>
            </p>
            <p className="font-sans text-lg text-pau-gold">
              <a href="mailto:partenariats@paufc.fr" className="hover:underline">partenariats@paufc.fr</a>
            </p>
          </div>
          <p className="mt-4 font-sans text-sm text-pau-night/60">
            Nouste Camp, 8 Boulevard de l'Aviation, 64320 Bizanos
          </p>
        </div>
      </section>
    </div>
  );
}

function StatBox({ number, label }) {
  return (
    <div className="text-center">
      <div className="mb-2 font-display text-3xl font-bold text-pau-gold md:text-4xl">{number}</div>
      <div className="font-sans text-sm text-pau-night/70">{label}</div>
    </div>
  );
}

function PartnerLogo({ partner }) {
  const content = (
    <div className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-transparent p-6 transition-transform hover:scale-105">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={180}
        height={90}
        className="h-auto w-full max-h-20 object-contain transition-all"
        style={{ filter: 'brightness(0) saturate(100%) invert(72%) sepia(32%) saturate(427%) hue-rotate(356deg) brightness(91%) contrast(88%)' }}
      />
    </div>
  );

  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : content;
}

function PartnerLogoMedium({ partner }) {
  const content = (
    <div className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-transparent p-4 transition-transform hover:scale-105">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={150}
        height={75}
        className="h-auto w-full max-h-16 object-contain transition-all"
        style={{ filter: 'brightness(0) saturate(100%) invert(72%) sepia(32%) saturate(427%) hue-rotate(356deg) brightness(91%) contrast(88%)' }}
      />
    </div>
  );

  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : content;
}

function PartnerLogoSmall({ partner }) {
  const content = (
    <div className="group relative flex aspect-square items-center justify-center overflow-hidden bg-transparent p-3 transition-transform hover:scale-105">
      <Image
        src={partner.logoUrl}
        alt={partner.name}
        width={120}
        height={60}
        className="h-auto w-full max-h-12 object-contain transition-all"
        style={{ filter: 'brightness(0) saturate(100%) invert(72%) sepia(32%) saturate(427%) hue-rotate(356deg) brightness(91%) contrast(88%)' }}
      />
    </div>
  );

  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : content;
}

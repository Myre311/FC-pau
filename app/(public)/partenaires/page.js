'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PartenairesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    partnerType: '',
    budget: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-pau-night">
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
        <div className="container-pau relative flex h-full items-center justify-center">
          <div className="max-w-4xl text-center">
            <span className="font-mono text-xs uppercase text-pau-gold">Partenariats</span>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase text-pau-gold md:text-5xl lg:text-6xl">
              Devenez partenaire<br />du Pau FC
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-sans text-lg leading-relaxed text-white/80 md:text-xl">
              Associez votre entreprise au club. VisibilitÃ© terrain et tribunes, hospitalitÃ©s VIP,
              et un rÃ©seau d'affaires actif dans tout le BÃ©arn.
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="border-y border-pau-gold/20 bg-pau-primary py-18 md:py-24">
        <div className="container-pau">
          <div className="grid gap-10 md:grid-cols-5">
            <StatBox number="11,800" label="SiÃ¨ges/match" />
            <StatBox number="50+" label="Entreprises partenaires" />
            <StatBox number="300" label="Convives VIP/match" />
            <StatBox number="200k+" label="Spectateurs annuels" />
            <StatBox number="1M+" label="Audience TV" />
          </div>
        </div>
      </section>

      {/* Nos Partenaires */}
      <section className="bg-pau-night pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="container-pau">
          <h2 className="mb-14 text-center font-display text-3xl font-bold uppercase text-pau-gold md:text-4xl">
            Ils nous font confiance
          </h2>

          {/* Partenaires Majeurs */}
          <div className="mb-16">
            <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
              Partenaires Majeurs
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <PartnerLogo name="Intersport / Joma" />
              <PartnerLogo name="Groupama" />
              <PartnerLogo name="Casino de Pau" />
              <PartnerLogo name="Ville de Pau" />
              <PartnerLogo name="CommunautÃ© d'AgglomÃ©ration" />
              <PartnerLogo name="RÃ©gion Nouvelle-Aquitaine" />
              <PartnerLogo name="Holy Energy" />
              <PartnerLogo name="Nouste Energia" />
              <PartnerLogo name="BKT" />
            </div>
          </div>

          {/* Partenaires Premiums */}
          <div className="mb-16">
            <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
              Partenaires Premiums
            </h3>
            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <PartnerLogoSmall name="Banque Populaire" />
              <PartnerLogoSmall name="CrÃ©dit Agricole" />
              <PartnerLogoSmall name="EDF" />
              <PartnerLogoSmall name="Orange" />
              <PartnerLogoSmall name="Total Energies" />
              <PartnerLogoSmall name="Carrefour" />
              <PartnerLogoSmall name="DÃ©cathlon" />
              <PartnerLogoSmall name="Leclerc" />
              <PartnerLogoSmall name="McDonald's" />
              <PartnerLogoSmall name="Burger King" />
              <PartnerLogoSmall name="Subway" />
              <PartnerLogoSmall name="KFC" />
            </div>
          </div>

          {/* Partenaires Officiels */}
          <div>
            <h3 className="mb-8 font-display text-2xl font-bold uppercase text-pau-gold">
              Partenaires Officiels
            </h3>
            <p className="font-sans text-base text-white/70">
              90+ entreprises locales soutiennent le Pau FC au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire Devenir Partenaire */}
      <section className="border-t border-pau-gold/20 bg-pau-primary pb-22 pt-18 md:pb-28 md:pt-24">
        <div className="container-pau">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-center font-display text-3xl font-bold uppercase text-pau-gold md:text-4xl">
              Rejoignez nos partenaires
            </h2>
            <p className="mb-14 text-center font-sans text-lg text-white/80">
              PrÃ©sentez-nous votre projet, nous vous recontactons sous 48 heures.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="PrÃ©nom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Entreprise"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="w-full border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
              />

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="TÃ©lÃ©phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
                />
              </div>

              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                required
                className="w-full border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white focus:border-pau-gold focus:outline-none"
              >
                <option value="">Type de partenariat souhaitÃ©</option>
                <option value="majeur">Partenaire Majeur</option>
                <option value="premium">Partenaire Premium</option>
                <option value="officiel">Partenaire Officiel</option>
              </select>

              <input
                type="text"
                placeholder="Budget envisagÃ©"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
              />

              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full border-2 border-pau-gold/30 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-pau-gold focus:outline-none"
              />

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  className="mt-1 h-4 w-4 border-2 border-pau-gold/30 bg-white/5"
                />
                <label htmlFor="consent" className="font-sans text-sm text-white/70">
                  J'accepte que mes donnÃ©es soient utilisÃ©es dans le cadre de ma demande de partenariat et en accord avec la politique de confidentialitÃ©.
                </label>
              </div>

              <button
                type="submit"
                className="w-full border-2 border-pau-gold bg-pau-gold py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-gold"
              >
                Envoyer ma demande
              </button>
            </form>
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
          <p className="mt-4 font-sans text-sm text-white/60">
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
      <div className="font-sans text-sm text-white/70">{label}</div>
    </div>
  );
}

function PartnerLogo({ name }) {
  return (
    <div className="flex aspect-[3/2] items-center justify-center border-2 border-pau-gold/20 bg-pau-primary p-6 transition-all hover:border-pau-gold">
      <span className="font-display text-sm font-bold uppercase text-white/40">{name}</span>
    </div>
  );
}

function PartnerLogoSmall({ name }) {
  return (
    <div className="flex aspect-square items-center justify-center border border-pau-gold/10 bg-pau-primary p-4 transition-all hover:border-pau-gold">
      <span className="text-center font-sans text-xs font-medium text-white/40">{name}</span>
    </div>
  );
}

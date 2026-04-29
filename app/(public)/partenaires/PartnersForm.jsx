'use client';

import { useState } from 'react';

export default function PartnersForm() {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <input
          type="text"
          placeholder="Prénom"
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
          placeholder="Téléphone"
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
        <option value="">Type de partenariat souhaité</option>
        <option value="premium">Partenaire Premium</option>
        <option value="officiel">Partenaire Officiel</option>
        <option value="local">Partenaire Local</option>
      </select>

      <input
        type="text"
        placeholder="Budget envisagé"
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
          J'accepte que mes données soient utilisées dans le cadre de ma demande de partenariat et en accord avec la politique de confidentialité.
        </label>
      </div>

      <button
        type="submit"
        className="w-full border-2 border-pau-gold bg-pau-gold py-4 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-gold"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}

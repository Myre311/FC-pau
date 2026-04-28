'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { CONTACT_TOPICS } from '@/lib/validations/contact';

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: 'general',
    message: '',
    website: '', // honeypot
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState(null);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const { data, error: apiError } = await res.json();
      if (!res.ok || !data) throw new Error(apiError ?? 'Erreur serveur');
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-pau-yellow/40 bg-pau-yellow/5 p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          Message envoyé
        </p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-crush tracking-tightest text-pau-primary">
          Merci !
        </h2>
        <p className="mt-4 font-sans text-pau-primary/70">
          Nous avons bien reçu votre message. Notre équipe vous répond
          habituellement sous 48 h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Prénom" required value={form.firstName} onChange={update('firstName')} autoComplete="given-name" />
        <Field label="Nom" required value={form.lastName} onChange={update('lastName')} autoComplete="family-name" />
      </div>
      <Field label="Email" required type="email" value={form.email} onChange={update('email')} autoComplete="email" />

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/50">
          Sujet <span className="text-pau-yellow">*</span>
        </span>
        <select
          required
          value={form.topic}
          onChange={update('topic')}
          className="mt-2 block h-11 w-full border border-pau-primary/20 bg-white px-3 font-sans text-sm text-pau-primary outline-none transition-colors focus:border-pau-yellow"
        >
          {CONTACT_TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/50">
          Message <span className="text-pau-yellow">*</span>
        </span>
        <textarea
          required
          value={form.message}
          onChange={update('message')}
          minLength={20}
          maxLength={4000}
          rows={8}
          className="mt-2 block w-full resize-y border border-pau-primary/20 bg-transparent p-3 font-sans text-sm text-pau-primary outline-none transition-colors focus:border-pau-yellow"
        />
        <span className="mt-1 block text-right font-mono text-[10px] tracking-[0.15em] text-pau-primary/40">
          {form.message.length} / 4000
        </span>
      </label>

      {/* Honeypot — invisible aux humains, piège pour bots */}
      <label className="hidden" aria-hidden="true">
        Ne pas remplir
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update('website')}
        />
      </label>

      {error && (
        <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        cornerCut
        disabled={status === 'submitting'}
        className="md:min-w-[260px]"
      >
        {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer le message'}
      </Button>
    </form>
  );
}

function Field({ label, required, value, onChange, type = 'text', autoComplete }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/50">
        {label}
        {required && <span className="ml-1 text-pau-yellow">*</span>}
      </span>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="mt-2 block h-11 w-full border border-pau-primary/20 bg-transparent px-3 font-sans text-sm text-pau-primary outline-none transition-colors focus:border-pau-yellow"
      />
    </label>
  );
}

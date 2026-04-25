'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useUI } from '@/stores/ui';
import { Button } from '@/components/ui/Button';
import { NEWSLETTER_SEGMENTS } from '@/lib/validations/newsletter';

// Modal slide-over multi-étape.
// Étapes : email -> thématiques -> confirmation (double opt-in en attente).

export function NewsletterModal() {
  const open = useUI((s) => s.newsletterOpen);
  const close = useUI((s) => s.closeNewsletter);

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [segments, setSegments] = useState(['all']);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  // Reset à l'ouverture
  useEffect(() => {
    if (open) {
      setStep('email');
      setError(null);
    }
  }, [open]);

  // Block scroll body
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  function toggleSegment(value) {
    setSegments((prev) => {
      // 'all' est exclusif des autres
      if (value === 'all') return ['all'];
      const without = prev.filter((s) => s !== 'all');
      return without.includes(value)
        ? without.filter((s) => s !== value)
        : [...without, value];
    });
  }

  async function submit() {
    setError(null);
    if (segments.length === 0) {
      setError('Choisissez au moins une thématique.');
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segments, source: 'modal' }),
      });
      const { data, error: apiError } = await res.json();
      if (!res.ok || !data) throw new Error(apiError ?? 'Erreur serveur');
      setStep('done');
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-nuit/85 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-blanc/15 bg-nuit transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-blanc/10 px-6 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-jaune">
              Newsletter Pau FC
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase leading-crush tracking-tightest">
              {step === 'done' ? 'Inscription en cours' : 'Restez connecté'}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center text-blanc/60 transition-colors hover:text-jaune"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'email' && (
            <div className="space-y-5">
              <p className="font-sans text-sm text-blanc/70">
                Matchday, drops boutique, programmes partenaires.
                Désinscription en un clic depuis chaque email.
              </p>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/50">
                  Votre email <span className="text-jaune">*</span>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="mt-2 block h-11 w-full border border-blanc/15 bg-transparent px-3 font-sans text-sm text-blanc outline-none transition-colors focus:border-jaune"
                />
              </label>
              <Button
                onClick={() => {
                  if (!email.includes('@')) {
                    setError('Email invalide');
                    return;
                  }
                  setError(null);
                  setStep('segments');
                }}
                variant="primary"
                size="lg"
                cornerCut
                className="w-full"
              >
                Continuer
              </Button>
              {error && (
                <p className="border border-jaune/40 bg-jaune/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-jaune">
                  {error}
                </p>
              )}
            </div>
          )}

          {step === 'segments' && (
            <div className="space-y-5">
              <p className="font-sans text-sm text-blanc/70">
                Quelles thématiques souhaitez-vous recevoir ?
              </p>
              <div className="space-y-3">
                {NEWSLETTER_SEGMENTS.map((s) => {
                  const active = segments.includes(s.value);
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => toggleSegment(s.value)}
                      className={`block w-full border p-4 text-left transition-colors ${
                        active
                          ? 'border-jaune bg-jaune/10'
                          : 'border-blanc/15 hover:border-blanc/30'
                      }`}
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blanc">
                        {s.label}
                        {active && <span className="ml-2 text-jaune">●</span>}
                      </p>
                      <p className="mt-1 font-sans text-xs text-blanc/60">
                        {s.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {error && (
                <p className="border border-jaune/40 bg-jaune/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-jaune">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  onClick={submit}
                  disabled={pending}
                  variant="primary"
                  size="lg"
                  cornerCut
                  className="w-full"
                >
                  {pending ? 'Envoi…' : 'Je m’abonne'}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/50 transition-colors hover:text-blanc"
                >
                  ← Modifier l&apos;email
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-jaune">
                Confirmez votre email
              </p>
              <p className="font-sans text-sm text-blanc/80">
                Un email vient de partir vers <strong className="text-blanc">{email}</strong>.
                Cliquez sur le lien pour valider votre inscription (RGPD —
                double opt-in).
              </p>
              <p className="font-sans text-xs text-blanc/50">
                Vous gérerez vos préférences à tout moment depuis votre{' '}
                <Link href="/compte/infos" className="text-jaune hover:underline" onClick={close}>
                  espace compte
                </Link>{' '}
                ou via le lien en pied de chaque email.
              </p>
              <Button onClick={close} variant="outline" size="md" className="mt-4">
                Fermer
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

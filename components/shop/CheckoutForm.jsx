'use client';

import { useMemo, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { useCart, selectCartSubtotal } from '@/stores/cart';
import { getStripe } from '@/lib/stripe-client';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

// =====================================================================
// Tunnel de paiement avec Stripe Elements.
// 2 étapes :
//   1. Saisie email + adresse → POST /api/checkout/intent → clientSecret
//   2. PaymentElement + confirmPayment → redirection /checkout/success
// =====================================================================

const COUNTRIES = [
  { code: 'FR', label: 'France' },
  { code: 'BE', label: 'Belgique' },
  { code: 'CH', label: 'Suisse' },
  { code: 'LU', label: 'Luxembourg' },
  { code: 'ES', label: 'Espagne' },
];

export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectCartSubtotal);

  const [step, setStep] = useState('details');
  const [clientSecret, setClientSecret] = useState(null);
  const [intentAmount, setIntentAmount] = useState(0);
  const [contact, setContact] = useState({ email: '' });
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    postalCode: '',
    city: '',
    country: 'FR',
    phone: '',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const stripePromise = useMemo(() => getStripe(), []);

  const handleDetails = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const sessionId = readOrCreateSessionId();
      const res = await fetch('/api/checkout/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contact.email,
          items: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
            customizationId: i.customizationId ?? null,
          })),
          shipping,
          billingSameAsShipping: true,
          sessionId,
        }),
      });
      const { data, error: apiError } = await res.json();
      if (!res.ok || !data) {
        throw new Error(apiError ?? 'Erreur serveur');
      }
      setClientSecret(data.clientSecret);
      setIntentAmount(data.amount);
      setStep('payment');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="border border-pau-night/10 p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
          Panier vide
        </p>
        <p className="mt-3 font-sans text-pau-night/60">
          Ajoutez des articles pour passer commande.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Stepper step={step} />

      {step === 'details' && (
        <form onSubmit={handleDetails} className="space-y-8" noValidate>
          <Section title="Contact">
            <Field
              label="Email"
              required
              type="email"
              autoComplete="email"
              value={contact.email}
              onChange={(v) => setContact({ email: v })}
            />
          </Section>

          <Section title="Livraison">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Prénom"
                required
                autoComplete="given-name"
                value={shipping.firstName}
                onChange={(v) => setShipping({ ...shipping, firstName: v })}
              />
              <Field
                label="Nom"
                required
                autoComplete="family-name"
                value={shipping.lastName}
                onChange={(v) => setShipping({ ...shipping, lastName: v })}
              />
            </div>
            <Field
              label="Adresse"
              required
              autoComplete="address-line1"
              value={shipping.line1}
              onChange={(v) => setShipping({ ...shipping, line1: v })}
            />
            <Field
              label="Complément (étage, code…)"
              autoComplete="address-line2"
              value={shipping.line2}
              onChange={(v) => setShipping({ ...shipping, line2: v })}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_2fr_1fr]">
              <Field
                label="Code postal"
                required
                autoComplete="postal-code"
                value={shipping.postalCode}
                onChange={(v) => setShipping({ ...shipping, postalCode: v })}
              />
              <Field
                label="Ville"
                required
                autoComplete="address-level2"
                value={shipping.city}
                onChange={(v) => setShipping({ ...shipping, city: v })}
              />
              <SelectField
                label="Pays"
                value={shipping.country}
                onChange={(v) => setShipping({ ...shipping, country: v })}
                options={COUNTRIES}
              />
            </div>
            <Field
              label="Téléphone (optionnel)"
              type="tel"
              autoComplete="tel"
              value={shipping.phone}
              onChange={(v) => setShipping({ ...shipping, phone: v })}
            />
          </Section>

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
            disabled={submitting}
            className="w-full"
          >
            {submitting ? 'Préparation du paiement…' : `Payer ${formatPrice(subtotal)}`}
          </Button>
        </form>
      )}

      {step === 'payment' && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: stripeAppearance,
            locale: 'fr',
          }}
        >
          <PaymentStep amount={intentAmount} onBack={() => setStep('details')} />
        </Elements>
      )}
    </div>
  );
}

function PaymentStep({ amount, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    }
    // Sinon, redirection vers return_url par Stripe
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <p className="border border-pau-yellow/40 bg-pau-yellow/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-pau-yellow">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-pau-night/60 transition-colors hover:text-pau-yellow"
        >
          ← Modifier mes infos
        </button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          cornerCut
          disabled={!stripe || processing}
          className="md:min-w-[260px]"
        >
          {processing ? 'Paiement en cours…' : `Confirmer ${formatPrice(amount)}`}
        </Button>
      </div>
    </form>
  );
}

function Stepper({ step }) {
  const steps = [
    { id: 'details', label: '01 · Adresse' },
    { id: 'payment', label: '02 · Paiement' },
  ];
  return (
    <ol className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
      {steps.map((s) => (
        <li
          key={s.id}
          className={
            s.id === step ? 'text-pau-yellow' : 'text-pau-night/30'
          }
        >
          {s.label}
        </li>
      ))}
    </ol>
  );
}

function Section({ title, children }) {
  return (
    <fieldset className="space-y-4 border-t border-pau-night/10 pt-6">
      <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({ label, value, onChange, required, type = 'text', autoComplete }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-night/50">
        {label}
        {required && <span className="ml-1 text-pau-yellow">*</span>}
      </span>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block h-11 w-full border border-pau-night/20 bg-transparent px-3 font-sans text-sm text-pau-night outline-none transition-colors focus:border-pau-night"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-night/50">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block h-11 w-full border border-pau-night/20 bg-white px-3 font-sans text-sm text-pau-night outline-none transition-colors focus:border-pau-night"
      >
        {options.map((o) => (
          <option key={o.code} value={o.code}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function readOrCreateSessionId() {
  if (typeof window === 'undefined') return 'srv';
  const KEY = 'fcpau-session-id';
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

const stripeAppearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#FFCC00',
    colorBackground: '#FFFFFF',
    colorText: '#1A1D38',
    colorDanger: '#EF4444',
    fontFamily: 'Instrument Sans, system-ui, sans-serif',
    fontSizeBase: '14px',
    borderRadius: '0px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      backgroundColor: '#FFFFFF',
      borderColor: 'rgba(26,29,56,0.2)',
      boxShadow: 'none',
      color: '#1A1D38',
    },
    '.Input:focus': {
      borderColor: '#FFCC00',
    },
    '.Label': {
      color: 'rgba(26,29,56,0.6)',
      fontFamily: 'DM Mono, ui-monospace, monospace',
      fontSize: '10px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
  },
};

'use client';

import { loadStripe } from '@stripe/stripe-js';

// Singleton Stripe.js coté client. loadStripe doit etre appele une
// seule fois au niveau module pour eviter de re-injecter le script.

let stripePromise;

export function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn('[stripe-client] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquante');
    }
    stripePromise = loadStripe(key ?? '');
  }
  return stripePromise;
}

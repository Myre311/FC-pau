import Stripe from 'stripe';

// Singleton Stripe coté serveur. Ne jamais importer ce module
// dans un composant client (la cle secrete fuiterait).

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('STRIPE_SECRET_KEY manquante en production');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_stub', {
  apiVersion: '2024-11-20.acacia',
  typescript: false,
  appInfo: { name: 'FC Pau', version: '0.1.0' },
});

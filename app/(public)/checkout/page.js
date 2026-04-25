import Link from 'next/link';

import { CheckoutForm } from '@/components/shop/CheckoutForm';
import { CheckoutSummary } from '@/components/shop/CheckoutSummary';

export const metadata = {
  title: 'Paiement',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-fc grid gap-12 py-10 md:grid-cols-[1.5fr_1fr] md:gap-16 md:py-16">
      <section>
        <header className="mb-10 border-b border-blanc/10 pb-6">
          <p className="badge-mono">Commande sécurisée Stripe</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest md:text-6xl">
            Finaliser
          </h1>
          <Link
            href="/panier"
            className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-blanc/60 transition-colors hover:text-jaune"
          >
            ← Modifier le panier
          </Link>
        </header>

        <CheckoutForm />
      </section>

      <aside className="self-start md:sticky md:top-24">
        <CheckoutSummary />
      </aside>
    </div>
  );
}

import Image from 'next/image';
import { ContactForm } from '@/components/vitrine/ContactForm';

export const metadata = {
  title: 'Contact',
  description:
    'Une question, une demande presse, un partenariat ? Toutes les coordonnées du Pau FC pour nous joindre.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* HERO SIMPLE */}
      <section className="relative h-[300px] overflow-hidden border-b border-gray-200">
        <Image
          src="/images/hero-stade.jpg"
          alt="Contact Pau FC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pau-night/40" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/90">
              Une question, une idée ?
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-white md:text-5xl">
              Contact
            </h1>
            <p className="mt-3 text-sm text-white/90">
              Le service du club vous répond.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-12 md:grid-cols-2">
          <section>
            <ContactForm />
          </section>

          <aside className="space-y-6">
            <Block title="Boutique & Commandes">
              <Line label="Email" value="boutique@paufc.fr" />
              <Line label="Téléphone" value="+33 5 59 00 00 00" />
              <Line label="Horaires" value="Lun-Ven · 10h-18h" />
            </Block>
            <Block title="Billetterie">
              <Line label="Email" value="billetterie@paufc.fr" />
              <Line label="Guichets Nouste Camp" value="Jour de match · 2h avant le coup d'envoi" />
            </Block>
            <Block title="Presse">
              <Line label="Email" value="presse@paufc.fr" />
            </Block>
            <Block title="Partenariats">
              <Line label="Email" value="partenariats@paufc.fr" />
            </Block>
            <Block title="Adresse">
              <Line
                label="Siège & stade"
                value={
                  <>
                    Nouste Camp
                    <br />
                    Boulevard de la Paix
                    <br />
                    64000 Pau
                  </>
                }
              />
            </Block>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="border border-gray-200 bg-gray-50 p-6">
      <p className="font-mono text-xs uppercase tracking-wider text-pau-yellow">
        {title}
      </p>
      <dl className="mt-4 space-y-3 text-sm">{children}</dl>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-pau-primary/50">
        {label}
      </dt>
      <dd className="mt-1 text-pau-primary">{value}</dd>
    </div>
  );
}

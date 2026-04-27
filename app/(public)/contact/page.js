import { ContactForm } from '@/components/vitrine/ContactForm';
import PageHero from '@/components/PageHero';
import SectionLight from '@/components/SectionLight';

export const metadata = {
  title: 'Contact',
  description:
    'Une question, une demande presse, un partenariat ? Toutes les coordonnées du Pau FC pour nous joindre.',
};

export default function ContactPage() {
  return (
    <article>
      <PageHero
        image="/images/hero-contact.jpg"
        surtitle="Une question, une idée ?"
        title="CONTACT"
        subtitle="Le service du club vous répond. Choisissez le bon sujet pour gagner du temps, on s'occupe du reste."
      />

      <SectionLight>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <section>
            <div className="mt-12">
              <ContactForm />
            </div>
          </section>

          <aside className="self-start space-y-6 md:sticky md:top-24">
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
      </SectionLight>
    </article>
  );
}

function Block({ title, children }) {
  return (
    <div className="border border-pau-primary/10 bg-pau-primary/5 p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-yellow">
        {title}
      </p>
      <dl className="mt-4 space-y-3 font-sans text-sm">{children}</dl>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-pau-primary/40">
        {label}
      </dt>
      <dd className="mt-1 text-pau-primary">{value}</dd>
    </div>
  );
}

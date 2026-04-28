import Link from 'next/link';

export const metadata = {
  title: 'Espace Presse',
  description:
    'Kit média, communiqués de presse et contacts pour les journalistes et médias.',
};

const PRESS_RELEASES = [
  {
    date: '2026-04-20',
    title: 'Antoine Evans prolonge jusqu\'en 2028',
    excerpt: 'Le Pau FC annonce la prolongation de contrat de son attaquant vedette.',
    downloadUrl: '/press/communique-evans-2026.pdf',
  },
  {
    date: '2026-04-15',
    title: 'Nouvelle tribune Béarn : point d\'avancement',
    excerpt: 'Les travaux de modernisation du Nouste Camp avancent comme prévu.',
    downloadUrl: '/press/communique-tribune-2026.pdf',
  },
  {
    date: '2026-04-01',
    title: 'Bilan du mercato hivernal',
    excerpt: 'Retour sur les mouvements de l\'effectif lors de la fenêtre de janvier.',
    downloadUrl: '/press/communique-mercato-hiver-2026.pdf',
  },
];

const MEDIA_KIT_ITEMS = [
  {
    title: 'Logo officiel',
    description: 'Logo Pau FC haute résolution (PNG, SVG, EPS)',
    fileSize: '2.4 MB',
    downloadUrl: '/press/logo-paufc.zip',
  },
  {
    title: 'Photos officielles',
    description: 'Photos équipe, stade, joueurs saison 2025-2026',
    fileSize: '45 MB',
    downloadUrl: '/press/photos-officielles-2026.zip',
  },
  {
    title: 'Charte graphique',
    description: 'Guide d\'utilisation de l\'identité visuelle',
    fileSize: '1.2 MB',
    downloadUrl: '/press/charte-graphique-paufc.pdf',
  },
  {
    title: 'Dossier de presse',
    description: 'Présentation complète du club (PDF)',
    fileSize: '8.5 MB',
    downloadUrl: '/press/dossier-presse-paufc.pdf',
  },
];

const PRESS_CONTACTS = [
  {
    name: 'Service Communication',
    role: 'Relations presse et médias',
    email: 'presse@paufc.fr',
    phone: '+33 5 59 80 76 66',
  },
  {
    name: 'Direction Marketing',
    role: 'Partenariats et sponsoring',
    email: 'marketing@paufc.fr',
    phone: '+33 5 59 80 76 67',
  },
];

export default function PressePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-pau-yellow bg-pau-night py-16 md:py-20">
        <div className="container-pau">
          <div className="mb-4 h-1 w-16 bg-pau-yellow" />
          <h1 className="title-hero text-white">Espace Presse</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Kit média, communiqués de presse et contacts pour les journalistes et professionnels des médias.
          </p>
        </div>
      </section>

      {/* Communiqués de presse */}
      <section className="section-pau bg-white">
        <div className="container-pau">
          <div className="mb-8">
            <div className="mb-4 h-1 w-16 bg-pau-yellow" />
            <h2 className="title-section">Communiqués de presse</h2>
          </div>

          <div className="space-y-4">
            {PRESS_RELEASES.map((release) => (
              <div
                key={release.date}
                className="flex flex-col gap-4 border-2 border-gray-300 p-6 transition-all hover:border-pau-night md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-gray-500">
                    {new Date(release.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold uppercase text-pau-night">
                    {release.title}
                  </h3>
                  <p className="text-sm text-gray-700">{release.excerpt}</p>
                </div>
                <a
                  href={release.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 border-2 border-pau-night bg-white px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-colors hover:bg-pau-night hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Télécharger
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit média */}
      <section className="section-pau border-t-4 border-gray-300 bg-gray-50">
        <div className="container-pau">
          <div className="mb-8">
            <div className="mb-4 h-1 w-16 bg-pau-yellow" />
            <h2 className="title-section">Kit Média</h2>
            <p className="mt-2 text-gray-600">
              Ressources officielles du Pau FC pour les médias et partenaires
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MEDIA_KIT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="border-2 border-gray-300 bg-white p-6 transition-all hover:border-pau-night"
              >
                <h3 className="mb-4 font-display text-lg font-bold uppercase text-pau-night">
                  {item.title}
                </h3>
                <p className="mb-3 text-sm text-gray-700">{item.description}</p>
                <div className="mb-4 font-mono text-xs text-gray-500">{item.fileSize}</div>
                <a
                  href={item.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 border-2 border-pau-night bg-pau-night px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-pau-yellow hover:border-pau-yellow hover:text-pau-night"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Télécharger
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts presse */}
      <section className="section-pau bg-white">
        <div className="container-pau">
          <div className="mb-8">
            <div className="mb-4 h-1 w-16 bg-pau-yellow" />
            <h2 className="title-section">Contacts Presse</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PRESS_CONTACTS.map((contact) => (
              <div
                key={contact.email}
                className="border-2 border-gray-300 p-6"
              >
                <h3 className="mb-1 font-display text-xl font-bold uppercase text-pau-night">
                  {contact.name}
                </h3>
                <p className="mb-4 text-sm text-gray-600">{contact.role}</p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-sm font-bold text-pau-night transition-colors hover:text-pau-yellow"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-sm font-bold text-pau-night transition-colors hover:text-pau-yellow"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Accréditations */}
          <div className="mt-12 border-2 border-pau-yellow bg-pau-yellow/10 p-8 text-center">
            <h3 className="mb-3 font-display text-2xl font-bold uppercase text-pau-night">
              Demande d'accréditation
            </h3>
            <p className="mb-6 text-gray-700">
              Vous êtes journaliste et souhaitez couvrir un match au Nouste Camp ?
            </p>
            <a
              href="mailto:presse@paufc.fr?subject=Demande d'accréditation"
              className="inline-flex items-center gap-3 border-2 border-pau-night bg-pau-night px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-pau-yellow hover:border-pau-yellow hover:text-pau-night"
            >
              Demander une accréditation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

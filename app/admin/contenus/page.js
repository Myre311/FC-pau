export const metadata = {
  title: 'Contenus du site',
};

export default function ContenusPage() {
  const sections = [
    {
      id: 'home',
      name: 'Page d'accueil',
      icon: '🏠',
      fields: [
        { key: 'hero_title', label: 'Titre principal', value: 'VIVEZ LA PASSION DU PAU FC', type: 'text' },
        { key: 'hero_subtitle', label: 'Sous-titre', value: 'Ligue 2 BKT • Saison 2025-2026', type: 'text' },
        { key: 'home_cta', label: 'Texte bouton principal', value: 'Réserver vos places', type: 'text' },
        { key: 'newsletter_title', label: 'Titre newsletter', value: 'Restez informé', type: 'text' },
        { key: 'newsletter_desc', label: 'Description newsletter', value: 'Recevez les actualités, offres exclusives et informations billetterie directement dans votre boîte mail.', type: 'textarea' },
      ],
    },
    {
      id: 'billetterie',
      name: 'Billetterie',
      icon: '🎫',
      fields: [
        { key: 'billetterie_title', label: 'Titre principal', value: 'Vivez chaque match à domicile', type: 'text' },
        { key: 'billetterie_subtitle', label: 'Sous-titre', value: 'Viens soutenir le Pau FC au Nouste Camp ! Achète tes billets en ligne et profite d\'une ambiance unique au cœur du Béarn.', type: 'textarea' },
        { key: 'tarif_plein', label: 'Tarif plein (description)', value: 'Tribune Principale · Catégorie A', type: 'text' },
        { key: 'cashless_title', label: 'Titre cashless', value: 'Carte cashless', type: 'text' },
      ],
    },
    {
      id: 'boutique',
      name: 'Boutique',
      icon: '🛍️',
      fields: [
        { key: 'shop_title', label: 'Titre boutique', value: 'Boutique officielle', type: 'text' },
        { key: 'shop_cta', label: 'Bouton voir tout', value: 'Tout voir', type: 'text' },
        { key: 'product_featured_badge', label: 'Badge produit vedette', value: '★ Top', type: 'text' },
      ],
    },
    {
      id: 'footer',
      name: 'Pied de page',
      icon: '📄',
      fields: [
        { key: 'footer_tagline', label: 'Slogan footer', value: 'Plus qu\'un club, une passion', type: 'text' },
        { key: 'footer_address', label: 'Adresse', value: 'Nouste Camp, 8 Boulevard de l\'Aviation, 64320 Bizanos', type: 'text' },
        { key: 'footer_phone', label: 'Téléphone', value: '+33 5 59 00 00 00', type: 'text' },
        { key: 'footer_email', label: 'Email', value: 'contact@paufc.fr', type: 'text' },
      ],
    },
    {
      id: 'seo',
      name: 'SEO & Métadonnées',
      icon: '🔍',
      fields: [
        { key: 'site_title', label: 'Titre du site', value: 'Pau FC — Club de football professionnel', type: 'text' },
        { key: 'site_description', label: 'Description du site', value: 'Site officiel du Pau FC. Billetterie, boutique, actualités, équipe et calendrier. Ligue 2 BKT.', type: 'textarea' },
        { key: 'og_title', label: 'Titre Open Graph', value: 'Pau FC — Club de football professionnel', type: 'text' },
        { key: 'twitter_handle', label: 'Compte Twitter', value: '@PauFC', type: 'text' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Textes du site</h1>
          <p className="mt-1 text-sm text-gray-500">
            Modifiez les textes affichés sur le site sans toucher au code
          </p>
        </div>
        <button className="rounded-lg bg-pau-yellow px-4 py-2 text-sm font-semibold text-pau-night shadow-sm hover:bg-pau-yellow/90">
          💾 Enregistrer les modifications
        </button>
      </div>

      {/* Info box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-semibold text-blue-900">Comment ça marche ?</h3>
            <p className="mt-1 text-sm text-blue-700">
              Modifiez les textes ci-dessous, puis cliquez sur "Enregistrer". Les changements seront
              visibles immédiatement sur le site public. Vous pouvez revenir en arrière à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* Sections de contenu */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            {/* Header section */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{section.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.name}</h2>
                  <p className="text-sm text-gray-500">
                    {section.fields.length} champ{section.fields.length > 1 ? 's' : ''} modifiable{section.fields.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Champs */}
            <div className="divide-y divide-gray-100 p-6">
              {section.fields.map((field) => (
                <div key={field.key} className="grid gap-4 py-4 md:grid-cols-[200px_1fr] md:items-start">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <p className="mt-1 text-xs text-gray-500">{field.key}</p>
                  </div>
                  <div>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        defaultValue={field.value}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-pau-yellow focus:outline-none focus:ring-1 focus:ring-pau-yellow"
                      />
                    ) : (
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-pau-yellow focus:outline-none focus:ring-1 focus:ring-pau-yellow"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Historique des modifications */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Historique des modifications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div>
                <p className="font-medium text-gray-900">Modification du titre principal (Page d'accueil)</p>
                <p className="text-sm text-gray-500">Par admin@paufc.fr • Il y a 2 heures</p>
              </div>
              <button className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
                Restaurer
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div>
                <p className="font-medium text-gray-900">Mise à jour description newsletter</p>
                <p className="text-sm text-gray-500">Par admin@paufc.fr • Il y a 1 jour</p>
              </div>
              <button className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
                Restaurer
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <div>
                <p className="font-medium text-gray-900">Modification tarifs billetterie</p>
                <p className="text-sm text-gray-500">Par admin@paufc.fr • Il y a 3 jours</p>
              </div>
              <button className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
                Restaurer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions finales */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <p className="font-medium text-gray-900">Modifications non enregistrées</p>
          <p className="text-sm text-gray-500">
            Vous avez modifié 0 champ(s). N'oubliez pas d'enregistrer vos changements.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button className="rounded-lg bg-pau-yellow px-4 py-2 text-sm font-semibold text-pau-night shadow-sm hover:bg-pau-yellow/90">
            💾 Enregistrer tout
          </button>
        </div>
      </div>
    </div>
  );
}

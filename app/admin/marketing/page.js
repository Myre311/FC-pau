export const metadata = {
  title: 'Marketing',
};

export default function MarketingPage() {
  // Données mockées pour le visuel
  const campaigns = [
    {
      id: 1,
      name: 'Maillots 2025/26 - Lancement',
      platform: 'Google Ads',
      status: 'active',
      budget: '500€',
      impressions: '45,234',
      clicks: '1,234',
      conversions: 47,
      cost: '342.50€',
      roas: '3.2x',
    },
    {
      id: 2,
      name: 'Billetterie Match FC Annecy',
      platform: 'Facebook Ads',
      status: 'active',
      budget: '200€',
      impressions: '28,456',
      clicks: '856',
      conversions: 23,
      cost: '156.00€',
      roas: '2.8x',
    },
    {
      id: 3,
      name: 'Abonnements Saison 2025/26',
      platform: 'Google Ads',
      status: 'paused',
      budget: '1000€',
      impressions: '12,345',
      clicks: '345',
      conversions: 12,
      cost: '89.00€',
      roas: '4.1x',
    },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos campagnes publicitaires Google Ads, Facebook et plus
          </p>
        </div>
        <button className="rounded-lg bg-pau-yellow px-4 py-2 text-sm font-semibold text-pau-night shadow-sm hover:bg-pau-yellow/90">
          + Nouvelle campagne
        </button>
      </div>

      {/* Statistiques globales */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Budget total</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">1 700€</p>
          <p className="mt-1 text-sm text-gray-500">Ce mois</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Impressions</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">86K</p>
          <p className="mt-1 text-sm text-green-600">↑ +18% vs mois dernier</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Conversions</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">82</p>
          <p className="mt-1 text-sm text-green-600">↑ +24% vs mois dernier</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">ROAS moyen</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">3.4x</p>
          <p className="mt-1 text-sm text-gray-500">Return on Ad Spend</p>
        </div>
      </div>

      {/* Connecter Google Ads */}
      <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#34A853" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Connecter Google Ads
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Synchronisez votre compte Google Ads pour importer automatiquement vos campagnes,
              suivre les performances en temps réel et optimiser vos dépenses publicitaires.
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Connecter mon compte
            </button>
          </div>
        </div>
      </div>

      {/* Liste des campagnes */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Campagnes actives</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-6 py-3">Campagne</th>
                <th className="px-6 py-3">Plateforme</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Budget</th>
                <th className="px-6 py-3">Impressions</th>
                <th className="px-6 py-3">Clics</th>
                <th className="px-6 py-3">Conversions</th>
                <th className="px-6 py-3">Dépensé</th>
                <th className="px-6 py-3">ROAS</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {campaign.platform === 'Google Ads' ? '' : ''} {campaign.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {campaign.status === 'active' ? 'Actif' : 'En pause'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.budget}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.impressions}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.clicks}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{campaign.conversions}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{campaign.cost}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-green-600">{campaign.roas}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-medium text-pau-yellow hover:text-pau-yellow/80">
                      Modifier →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Recommandations */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recommandations</h2>
        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="font-medium text-gray-900">
              Augmenter le budget "Maillots 2025/26"
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Cette campagne a un ROAS de 3.2x. Augmenter le budget de 200€ pourrait générer
              environ 15 conversions supplémentaires.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="font-medium text-gray-900">
              Réactiver "Abonnements Saison"
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Cette campagne en pause a le meilleur ROAS (4.1x). La réactiver maintenant
              pourrait booster les ventes d'abonnements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

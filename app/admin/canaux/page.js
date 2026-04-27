export const metadata = {
  title: 'Canaux de vente',
};

export default function CanauxPage() {
  const channels = [
    {
      id: 'instagram',
      name: 'Instagram Shopping',
      icon: '📷',
      color: 'from-pink-500 to-purple-600',
      connected: true,
      stats: { products: 45, sales: '2,340€', orders: 34 },
      description: 'Vendez directement sur Instagram avec des posts et stories taggés produits',
    },
    {
      id: 'facebook',
      name: 'Facebook Shop',
      icon: '📘',
      color: 'from-blue-600 to-blue-700',
      connected: true,
      stats: { products: 45, sales: '1,890€', orders: 28 },
      description: 'Boutique intégrée sur votre page Facebook avec checkout natif',
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: '💬',
      color: 'from-blue-500 to-indigo-600',
      connected: false,
      stats: null,
      description: 'Vendez via conversations Messenger avec chatbot et catalogue produits',
    },
    {
      id: 'google',
      name: 'Google Shopping',
      icon: '🔍',
      color: 'from-red-500 to-yellow-500',
      connected: true,
      stats: { products: 38, sales: '4,120€', orders: 52 },
      description: 'Affichez vos produits dans les résultats de recherche Google Shopping',
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      icon: '🎵',
      color: 'from-black to-red-600',
      connected: false,
      stats: null,
      description: 'Vendez via TikTok avec lives shopping et vidéos produits',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: '📱',
      color: 'from-green-500 to-green-600',
      connected: false,
      stats: null,
      description: 'Catalogue produits et ventes via WhatsApp Business',
    },
  ];

  const connectedChannels = channels.filter((c) => c.connected);
  const availableChannels = channels.filter((c) => !c.connected);

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Canaux de vente</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vendez vos produits sur Instagram, Facebook, TikTok, Google et plus
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Canaux actifs</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{connectedChannels.length}</p>
          <p className="mt-1 text-sm text-gray-500">sur {channels.length} disponibles</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Ventes multicanal</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">8 350€</p>
          <p className="mt-1 text-sm text-green-600">↑ +32% vs mois dernier</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Commandes</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">114</p>
          <p className="mt-1 text-sm text-gray-500">Ce mois</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Produits publiés</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">45</p>
          <p className="mt-1 text-sm text-gray-500">Synchronisés automatiquement</p>
        </div>
      </div>

      {/* Canaux connectés */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Canaux connectés</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {connectedChannels.map((channel) => (
            <div
              key={channel.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Header avec gradient */}
              <div className={`h-24 bg-gradient-to-r ${channel.color} p-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{channel.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{channel.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                      ✓ Connecté
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                {channel.stats && (
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Produits</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">{channel.stats.products}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ventes</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">{channel.stats.sales}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commandes</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">{channel.stats.orders}</p>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-600">{channel.description}</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Gérer
                  </button>
                  <button className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                    Déconnecter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canaux disponibles */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Canaux disponibles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableChannels.map((channel) => (
            <div
              key={channel.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-pau-yellow hover:shadow-md"
            >
              {/* Header avec gradient */}
              <div className={`h-24 bg-gradient-to-r ${channel.color} opacity-80 p-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl opacity-80">{channel.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{channel.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                      Non connecté
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="mb-4 text-sm text-gray-600">{channel.description}</p>
                <button className="w-full rounded-lg bg-pau-yellow px-4 py-2 text-sm font-semibold text-pau-night shadow-sm hover:bg-pau-yellow/90">
                  Connecter {channel.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide de configuration */}
      <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          🚀 Comment connecter un canal de vente ?
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              1
            </div>
            <h3 className="font-semibold text-gray-900">Choisissez une plateforme</h3>
            <p className="mt-1 text-sm text-gray-600">
              Sélectionnez le canal sur lequel vous souhaitez vendre (Instagram, TikTok, etc.)
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              2
            </div>
            <h3 className="font-semibold text-gray-900">Connectez votre compte</h3>
            <p className="mt-1 text-sm text-gray-600">
              Autorisez Pau FC à publier vos produits sur la plateforme choisie
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
              3
            </div>
            <h3 className="font-semibold text-gray-900">Synchronisation automatique</h3>
            <p className="mt-1 text-sm text-gray-600">
              Vos produits sont automatiquement publiés et les commandes synchronisées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

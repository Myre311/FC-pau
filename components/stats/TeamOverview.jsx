export function TeamOverview({ stats }) {
  const metrics = [
    { label: 'Buts marqués', value: stats.goals, icon: '' },
    { label: 'Passes décisives', value: stats.assists, icon: '' },
    { label: 'Cartons jaunes', value: stats.yellowCards, icon: '' },
    { label: 'Cartons rouges', value: stats.redCards, icon: '' },
    { label: 'Matchs joués', value: stats.matchesPlayed, icon: '' },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 h-1 w-16 bg-pau-yellow" />
        <h2 className="title-section">Vue d'ensemble</h2>
        <p className="mt-2 text-gray-600">Saison 2025-2026</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="border-2 border-gray-300 bg-white p-6 text-center transition-all hover:border-pau-night"
          >
            <div className="mb-2 text-4xl">{metric.icon}</div>
            <div className="mb-1 font-display text-4xl font-black text-pau-night">
              {metric.value}
            </div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-gray-600">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

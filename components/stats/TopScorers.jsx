export function TopScorers({ title, players, statKey }) {
  return (
    <div className="card-pau p-6">
      <h3 className="mb-6 font-display text-2xl font-bold uppercase text-pau-night">
        {title}
      </h3>

      {players.length === 0 ? (
        <p className="text-center text-gray-500">Aucune statistique disponible</p>
      ) : (
        <div className="space-y-3">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-4 border-l-4 border-transparent p-3 transition-colors hover:border-pau-yellow hover:bg-gray-50"
            >
              {/* Rang */}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center font-display text-lg font-black ${
                  index === 0
                    ? 'bg-pau-yellow text-pau-night'
                    : index === 1
                      ? 'bg-gray-300 text-pau-night'
                      : index === 2
                        ? 'bg-gray-200 text-pau-night'
                        : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </div>

              {/* Photo placeholder */}
              {player.photoUrl && (
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden border-2 border-gray-300 bg-gray-200">
                  <img
                    src={player.photoUrl}
                    alt={`${player.firstName} ${player.lastName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Nom + poste */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold uppercase text-pau-night truncate">
                  {player.firstName} {player.lastName}
                </p>
                {player.position && (
                  <p className="font-mono text-xs uppercase text-gray-500">
                    {player.position}
                  </p>
                )}
              </div>

              {/* Stat */}
              <div className="flex-shrink-0 text-right">
                <div className="font-display text-2xl font-black text-pau-night">
                  {player.stats[statKey]}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

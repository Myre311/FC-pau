'use client';

import { useState } from 'react';

export function StatsGrid({ players }) {
  const [sortBy, setSortBy] = useState('goals');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedPlayers = [...players].sort((a, b) => {
    const aValue = a.stats?.[sortBy] || 0;
    const bValue = b.stats?.[sortBy] || 0;
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const SortButton = ({ column, label }) => (
    <button
      onClick={() => handleSort(column)}
      className={`w-full text-left font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
        sortBy === column ? 'text-pau-yellow' : 'text-gray-600 hover:text-pau-night'
      }`}
    >
      {label}
      {sortBy === column && (
        <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
      )}
    </button>
  );

  return (
    <div className="overflow-x-auto border-2 border-gray-300">
      <table className="w-full min-w-[800px]">
        <thead className="border-b-2 border-gray-300 bg-gray-50">
          <tr>
            <th className="p-3 text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-600">
                Joueur
              </span>
            </th>
            <th className="p-3">
              <SortButton column="matchesPlayed" label="MJ" />
            </th>
            <th className="p-3">
              <SortButton column="minutesPlayed" label="Min" />
            </th>
            <th className="p-3">
              <SortButton column="goals" label="Buts" />
            </th>
            <th className="p-3">
              <SortButton column="assists" label="PD" />
            </th>
            <th className="p-3">
              <SortButton column="yellowCards" label=· />
            </th>
            <th className="p-3">
              <SortButton column="redCards" label=· />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr
              key={player.id}
              className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <td className="p-3">
                <div className="flex items-center gap-3">
                  {player.shirtNumber && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-gray-300 bg-pau-night font-display text-sm font-bold text-pau-yellow">
                      {player.shirtNumber}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-pau-night">
                      {player.firstName} {player.lastName}
                    </p>
                    {player.position && (
                      <p className="font-mono text-xs uppercase text-gray-500">
                        {player.position}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-3 text-center font-display text-sm font-bold text-pau-night">
                {player.stats?.matchesPlayed || 0}
              </td>
              <td className="p-3 text-center font-display text-sm text-gray-600">
                {player.stats?.minutesPlayed || 0}
              </td>
              <td className="p-3 text-center font-display text-lg font-black text-pau-night">
                {player.stats?.goals || 0}
              </td>
              <td className="p-3 text-center font-display text-lg font-black text-pau-night">
                {player.stats?.assists || 0}
              </td>
              <td className="p-3 text-center font-display text-sm text-gray-600">
                {player.stats?.yellowCards || 0}
              </td>
              <td className="p-3 text-center font-display text-sm text-gray-600">
                {player.stats?.redCards || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

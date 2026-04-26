'use client';

import { useState, useEffect } from 'react';

export function LiveMatch({ match, events = [] }) {
  const [liveEvents, setLiveEvents] = useState(events);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Polling pour rafraîchir les événements toutes les 30 secondes
  useEffect(() => {
    if (match.status !== 'live') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/matches/${match.id}/events`);
        const data = await res.json();
        if (data.events) {
          setLiveEvents(data.events);
        }
      } catch (error) {
        console.error('Failed to fetch live events:', error);
      }
    }, 30000); // Toutes les 30 secondes

    return () => clearInterval(interval);
  }, [match.id, match.status]);

  // Horloge temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const homeGoals = liveEvents.filter(
    (e) => e.team === 'home' && (e.type === 'goal' || e.type === 'penalty')
  ).length;
  const awayGoals = liveEvents.filter(
    (e) => e.team === 'away' && (e.type === 'goal' || e.type === 'penalty')
  ).length;

  const EVENT_ICONS = {
    goal: '⚽',
    penalty: '⚽',
    yellow_card: '🟨',
    red_card: '🟥',
    substitution: '🔄',
    var: '📺',
    own_goal: '⚽',
  };

  return (
    <div className="overflow-hidden border-4 border-jaune bg-nuit">
      {/* Header live */}
      <div className="flex items-center justify-between border-b-2 border-jaune/30 bg-jaune/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-jaune">
            EN DIRECT
          </span>
        </div>
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-blanc">
          {match.competition}
        </div>
      </div>

      {/* Score */}
      <div className="p-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          {/* Home */}
          <div className="text-center">
            <div className="mb-3 font-display text-lg font-bold uppercase text-blanc">
              {match.isHome ? 'Pau FC' : match.opponent}
            </div>
            <div className="font-display text-6xl font-black text-jaune md:text-8xl">
              {match.isHome ? (match.homeScore ?? homeGoals) : (match.awayScore ?? awayGoals)}
            </div>
          </div>

          {/* Séparateur */}
          <div className="flex flex-col items-center gap-2">
            <div className="font-display text-3xl font-black text-blanc/40">-</div>
            <div className="min-w-[60px] border-2 border-jaune bg-jaune px-3 py-1 text-center font-mono text-sm font-bold text-nuit">
              {getMatchTime(match, currentTime)}
            </div>
          </div>

          {/* Away */}
          <div className="text-center">
            <div className="mb-3 font-display text-lg font-bold uppercase text-blanc">
              {match.isHome ? match.opponent : 'Pau FC'}
            </div>
            <div className="font-display text-6xl font-black text-jaune md:text-8xl">
              {match.isHome ? (match.awayScore ?? awayGoals) : (match.homeScore ?? homeGoals)}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline événements */}
      {liveEvents.length > 0 && (
        <div className="border-t-2 border-blanc/10 bg-nuit/50 p-6">
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-blanc/60">
            Événements du match
          </h3>
          <div className="space-y-3">
            {liveEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 border-l-4 border-jaune/30 bg-blanc/5 p-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-blanc/20 bg-nuit font-mono text-sm font-bold text-jaune">
                  {event.minute}'
                </div>
                <div className="text-2xl">{EVENT_ICONS[event.type]}</div>
                <div className="flex-1">
                  <p className="font-display text-sm font-bold uppercase text-blanc">
                    {event.playerName}
                  </p>
                  {event.description && (
                    <p className="mt-1 text-xs text-blanc/60">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getMatchTime(match, currentTime) {
  if (match.status === 'played') return 'FIN';
  if (match.status !== 'live') return '00:00';

  const kickoff = new Date(match.kickoffAt);
  const diff = Math.floor((currentTime - kickoff) / 1000 / 60);

  if (diff < 0) return '00:00';
  if (diff <= 45) return `${diff}'`;
  if (diff <= 60) return 'MI-TEMPS';
  if (diff <= 105) return `${diff - 15}'`;
  return '90+';
}

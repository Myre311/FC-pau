'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/format';

// Composant compte à rebours pour un match
export function MatchCountdown({ match }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(match.kickoffAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(match.kickoffAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [match.kickoffAt]);

  const opponentName = match.isHome ? match.awayTeam : match.homeTeam;
  const location = match.isHome ? 'Nouste Camp' : 'Extérieur';

  return (
    <div className="match-card">
      {/* Header avec date/heure */}
      <div className="mb-6 text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-gray-600">
          {formatMatchDate(match.kickoffAt)} · {location} · {formatMatchTime(match.kickoffAt)}
        </p>
      </div>

      {/* Logos équipes */}
      <div className="mb-8 flex items-center justify-center gap-8">
        {match.isHome ? (
          <>
            <TeamLogo name="Pau FC" isHome />
            <VsLabel />
            <TeamLogo name={opponentName} />
          </>
        ) : (
          <>
            <TeamLogo name={opponentName} />
            <VsLabel />
            <TeamLogo name="Pau FC" isHome />
          </>
        )}
      </div>

      {/* Compte à rebours */}
      {!timeLeft.expired && (
        <div className="mb-6 flex justify-center gap-3">
          <CountdownUnit value={timeLeft.days} label="Jours" />
          <CountdownUnit value={timeLeft.hours} label="Heures" />
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </div>
      )}

      {/* Compétition */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-widest text-pau-blue">
          {match.competition || 'Ligue 2 BKT'}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* CTA Billetterie */}
      {match.isHome && !timeLeft.expired && (
        <div className="text-center">
          <Link
            href="/billetterie"
            className="btn-primary btn-ripple inline-flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Réserver vos places
          </Link>
        </div>
      )}
    </div>
  );
}

function TeamLogo({ name, isHome = false }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all md:h-32 md:w-32 ${
        isHome ? 'border-pau-blue bg-gradient-to-br from-blue-50 to-blue-100' : 'border-gray-300 bg-gray-100'
      }`}>
        <span className="font-display text-3xl font-bold md:text-4xl" style={{ color: isHome ? '#1E40AF' : '#6B7280' }}>
          {name.substring(0, 3).toUpperCase()}
        </span>
      </div>
      <p className={`max-w-[100px] text-center font-display text-sm uppercase leading-tight md:text-base ${
        isHome ? 'text-pau-blue' : 'text-gray-700'
      }`}>
        {name}
      </p>
    </div>
  );
}

function VsLabel() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pau-blue text-white">
      <span className="font-display text-lg font-bold">VS</span>
    </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown-unit animate-countdown">
      <div className="countdown-value">{String(value).padStart(2, '0')}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

function calculateTimeLeft(kickoffAt) {
  const difference = new Date(kickoffAt) - new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}

function formatMatchDate(date) {
  const d = new Date(date);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`.toUpperCase();
}

function formatMatchTime(date) {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, '0')}H${String(d.getMinutes()).padStart(2, '0')}`;
}

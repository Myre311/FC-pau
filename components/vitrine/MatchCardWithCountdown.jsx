'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Carte match avec compte à rebours
 * Style maquette client
 */
export function MatchCardWithCountdown({ match }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const matchDate = new Date(match.kickoffAt);
      const now = new Date();
      const difference = matchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [match.kickoffAt]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-none border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
      {/* Logo Ligue 2 BKT */}
      {match.competition?.includes('Ligue 2') && (
        <div className="mb-6 flex justify-center">
          <div className="flex h-10 items-center bg-pau-primary px-4">
            <Image
              src="/LFP_LOGOTYPE_L2_BKT_MASTER_WHITE_RVB-2048x581.png"
              alt="Ligue 2 BKT"
              width={120}
              height={34}
              className="h-auto w-[120px]"
            />
          </div>
        </div>
      )}

      {/* Compte à rebours */}
      <div className="mb-8 grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="font-display text-4xl font-bold text-pau-yellow md:text-5xl">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="mt-1 font-sans text-xs uppercase tracking-wider text-white/60">
            Jours
          </div>
        </div>
        <div>
          <div className="font-display text-4xl font-bold text-pau-yellow md:text-5xl">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="mt-1 font-sans text-xs uppercase tracking-wider text-white/60">
            Heures
          </div>
        </div>
        <div>
          <div className="font-display text-4xl font-bold text-pau-yellow md:text-5xl">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="mt-1 font-sans text-xs uppercase tracking-wider text-white/60">
            Minutes
          </div>
        </div>
        <div>
          <div className="font-display text-4xl font-bold text-pau-yellow md:text-5xl">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="mt-1 font-sans text-xs uppercase tracking-wider text-white/60">
            Secondes
          </div>
        </div>
      </div>

      {/* Équipes */}
      <div className="mb-6 flex items-center justify-center gap-8">
        {/* Équipe gauche */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src={match.isHome ? '/logos/pau-fc.svg' : (match.opponentLogo || '/logos/pau-fc.svg')}
              alt={match.isHome ? 'Pau FC' : match.opponent}
              fill
              className="object-contain"
            />
          </div>
          <p className="font-display text-lg font-bold uppercase text-white md:text-xl">
            {match.isHome ? 'PAU FC' : match.opponent}
          </p>
        </div>

        {/* VS */}
        <div className="font-mono text-2xl text-white/40 md:text-3xl">VS</div>

        {/* Équipe droite */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src={match.isHome ? (match.opponentLogo || '/logos/pau-fc.svg') : '/logos/pau-fc.svg'}
              alt={match.isHome ? match.opponent : 'Pau FC'}
              fill
              className="object-contain"
            />
          </div>
          <p className="font-display text-lg font-bold uppercase text-white md:text-xl">
            {match.isHome ? match.opponent : 'PAU FC'}
          </p>
        </div>
      </div>

      {/* Informations */}
      <div className="mb-6 text-center">
        <p className="font-sans text-sm text-white/80">
          {formatDate(match.kickoffAt)} · {formatTime(match.kickoffAt)}
        </p>
        <p className="mt-1 font-sans text-sm text-white/60">
          {match.venue}
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href={match.ticketUrl || '/billetterie'}
          className="inline-block border-2 border-pau-yellow bg-pau-yellow px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-pau-night transition-all hover:bg-transparent hover:text-pau-yellow"
        >
          VOS PLACES
        </Link>
      </div>
    </div>
  );
}

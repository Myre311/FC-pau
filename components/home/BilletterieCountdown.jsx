'use client';

import { useState, useEffect } from 'react';

export function BilletterieCountdown({ kickoffAt, matchDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(kickoffAt) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [kickoffAt]);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <>
      <h3 className="mb-1 font-display text-xl font-bold uppercase text-white">
        {matchDate}
      </h3>
      <p className="font-mono text-2xl font-bold text-white">
        {pad(timeLeft.days)}:{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </p>
    </>
  );
}

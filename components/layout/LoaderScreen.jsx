'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Loader pleine page — logo officiel Pau FC en pulsing glow.
// Disparait apres 1.6s, marque sessionStorage pour ne pas reapparaitre
// a chaque navigation.

export function LoaderScreen() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('fcpau-loader-shown') === '1') {
      setDone(true);
      setHidden(true);
      return;
    }
    const t1 = setTimeout(() => setDone(true), 1600);
    const t2 = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem('fcpau-loader-shown', '1');
    }, 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-nuit transition-[opacity,visibility] duration-500 ${
        done ? 'pointer-events-none invisible opacity-0' : 'opacity-100'
      }`}
      aria-hidden={done}
    >
      <Image
        src="/logo-fcpau.png"
        alt="FC Pau"
        width={120}
        height={120}
        priority
        className="h-[120px] w-[120px] animate-logo-glow object-contain"
      />
      <div className="relative h-px w-[180px] overflow-hidden bg-blanc/10">
        <span className="absolute inset-0 -translate-x-full bg-jaune animate-loader-fill" />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-blanc/30">
        Pau FC · Chargement
      </p>
    </div>
  );
}

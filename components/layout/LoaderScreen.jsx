'use client';

import { useEffect, useState } from 'react';

// Loader pleine page "FC PAU" porté de la maquette HTML originale.
// Affiche barre + sub "Boutique Officielle · Chargement", puis fade-out
// 1.6s après window.load (cohérent avec fcpau-index.html).
//
// Désactivé via sessionStorage pour ne pas réapparaître à chaque navigation.

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-nuit transition-[opacity,visibility] duration-500 ${
        done ? 'pointer-events-none invisible opacity-0' : 'opacity-100'
      }`}
      aria-hidden={done}
    >
      <p className="font-display text-[56px] uppercase leading-none tracking-[0.06em] text-jaune animate-glow">
        FC PAU
      </p>
      <div className="relative h-px w-[180px] overflow-hidden bg-blanc/10">
        <span className="absolute inset-0 -translate-x-full bg-jaune animate-loader-fill" />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-blanc/20">
        Boutique Officielle · Chargement
      </p>
    </div>
  );
}

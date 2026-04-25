'use client';

import { useEffect, useRef } from 'react';

import { drawJerseyBackCanvas } from '@/lib/customization';

// Fallback 2D si WebGL indisponible (ou désactivé pour économie batterie).
// Affiche le rendu canvas du flocage seul, sans 3D.

export function JerseyScene2DFallback({ name, number, font }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    drawJerseyBackCanvas({ canvas: ref.current, name, number, font });
  }, [name, number, font]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-nuit p-6">
      <canvas
        ref={ref}
        width={512}
        height={640}
        className="h-full w-auto max-w-full border border-blanc/10"
      />
    </div>
  );
}

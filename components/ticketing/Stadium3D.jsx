'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

import { StadiumSeats } from './StadiumSeats';

/**
 * Vue 3D du Nouste Camp pour sélection de sièges
 * Stade simplifié en sections : Tribune, Virages, Pelouse
 */
export function Stadium3D({ onSeatSelect, selectedSeats = [], availableSeats = [] }) {
  return (
    <div className="relative h-[600px] w-full bg-gradient-to-b from-nuit to-primaire">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 40, 60]} fov={50} />
          <OrbitControls
            enablePan={false}
            minDistance={30}
            maxDistance={100}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            target={[0, 0, 0]}
          />

          {/* Lumières */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
          <directionalLight position={[-10, 20, -10]} intensity={0.5} />

          {/* Pelouse */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[60, 90]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>

          {/* Lignes de terrain */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <planeGeometry args={[58, 88]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>

          {/* Sections de sièges */}
          <StadiumSeats
            onSeatSelect={onSeatSelect}
            selectedSeats={selectedSeats}
            availableSeats={availableSeats}
          />
        </Suspense>
      </Canvas>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 space-y-2 border-2 border-pau-yellow bg-pau-night/90 p-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 border-2 border-white bg-green-500" />
          <span className="font-mono text-xs text-white">Disponible</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 border-2 border-white bg-pau-yellow" />
          <span className="font-mono text-xs text-white">Sélectionné</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 border-2 border-white bg-red-500" />
          <span className="font-mono text-xs text-white">Réservé</span>
        </div>
      </div>
    </div>
  );
}

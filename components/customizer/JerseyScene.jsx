'use client';

import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';

import { drawJerseyBackCanvas } from '@/lib/customization';

// =====================================================================
// Scène Three.js — Maillot stylisé en placeholder.
// Sera remplacé par un GLTF officiel de l'équipementier en V2.
// Le maillot ici est composé de primitives simples (torso = box
// arrondi via ExtrudeGeometry, manches = 2 boxes inclinés). Pas de
// model loader = aucun téléchargement, scène ultra légère, OK mobile.
// =====================================================================

const JERSEY_COLOR = '#1A1D38'; // primaire
const TRIM_COLOR = '#FFCC00'; // jaune

export function JerseyScene({ name, number, font }) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 3.5], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#04091D']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 5]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#FFCC00" />

      <Center>
        <Jersey name={name} number={number} font={font} />
      </Center>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}

function Jersey({ name, number, font }) {
  const meshRef = useRef(null);

  // Texture canvas pour le dos — re-généré à chaque changement
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 640;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return { canvas: c, texture: t };
  }, []);

  useEffect(() => {
    drawJerseyBackCanvas({ canvas, name, number, font });
    texture.needsUpdate = true;
  }, [canvas, texture, name, number, font]);

  // Légère oscillation pour donner du vivant
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  // Forme stylisée du maillot via ExtrudeGeometry (silhouette 2D extrudée)
  const torsoGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Silhouette d'un T-shirt vue de face (origine au centre)
    shape.moveTo(-0.7, 1.0); // épaule G
    shape.lineTo(-1.15, 0.85); // bord manche G
    shape.lineTo(-1.0, 0.55);
    shape.lineTo(-0.65, 0.7); // dessous manche G
    shape.lineTo(-0.7, -1.0);
    shape.lineTo(0.7, -1.0);
    shape.lineTo(0.65, 0.7);
    shape.lineTo(1.0, 0.55);
    shape.lineTo(1.15, 0.85);
    shape.lineTo(0.7, 1.0);
    // Encolure
    shape.bezierCurveTo(0.35, 1.05, 0.25, 0.75, 0, 0.75);
    shape.bezierCurveTo(-0.25, 0.75, -0.35, 1.05, -0.7, 1.0);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 12,
    });
  }, []);

  const trimGeometry = useMemo(() => {
    // Petit liseré jaune autour de l'encolure
    const shape = new THREE.Shape();
    shape.moveTo(-0.7, 1.05);
    shape.bezierCurveTo(-0.25, 0.78, 0.25, 0.78, 0.7, 1.05);
    shape.lineTo(0.65, 1.0);
    shape.bezierCurveTo(0.25, 0.74, -0.25, 0.74, -0.65, 1.0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.21, bevelEnabled: false });
  }, []);

  return (
    <group ref={meshRef} rotation={[0, Math.PI, 0]}>
      {/* Corps du maillot */}
      <mesh geometry={torsoGeometry}>
        <meshStandardMaterial
          color={JERSEY_COLOR}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Liseré encolure */}
      <mesh geometry={trimGeometry} position={[0, 0, -0.01]}>
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.6} />
      </mesh>

      {/* Décal du dos (face arrière du torso → on plaque la texture sur
          un plan derrière le maillot, légèrement en arrière) */}
      <mesh position={[0, -0.05, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.4, 1.75]} />
        <meshBasicMaterial map={texture} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

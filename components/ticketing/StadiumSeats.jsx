'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Sections de sièges du stade
 * Disposées autour de la pelouse
 */
export function StadiumSeats({ onSeatSelect, selectedSeats, availableSeats }) {
  return (
    <group>
      {/* Tribune principale (côté long, face caméra) */}
      <SeatSection
        position={[0, 0, -50]}
        rotation={[0, 0, 0]}
        rows={20}
        seatsPerRow={40}
        sectionId="tribune"
        onSeatSelect={onSeatSelect}
        selectedSeats={selectedSeats}
        availableSeats={availableSeats}
      />

      {/* Tribune opposée */}
      <SeatSection
        position={[0, 0, 50]}
        rotation={[0, Math.PI, 0]}
        rows={15}
        seatsPerRow={40}
        sectionId="tribune-opp"
        onSeatSelect={onSeatSelect}
        selectedSeats={selectedSeats}
        availableSeats={availableSeats}
      />

      {/* Virage gauche */}
      <SeatSection
        position={[-35, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        rows={15}
        seatsPerRow={30}
        sectionId="virage-gauche"
        onSeatSelect={onSeatSelect}
        selectedSeats={selectedSeats}
        availableSeats={availableSeats}
      />

      {/* Virage droit */}
      <SeatSection
        position={[35, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        rows={15}
        seatsPerRow={30}
        sectionId="virage-droit"
        onSeatSelect={onSeatSelect}
        selectedSeats={selectedSeats}
        availableSeats={availableSeats}
      />
    </group>
  );
}

/**
 * Section de sièges (une tribune)
 */
function SeatSection({
  position,
  rotation,
  rows,
  seatsPerRow,
  sectionId,
  onSeatSelect,
  selectedSeats,
  availableSeats,
}) {
  const seats = [];

  for (let row = 0; row < rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatId = `${sectionId}-${row}-${seat}`;
      const isSelected = selectedSeats.includes(seatId);
      const isAvailable = availableSeats.includes(seatId);

      seats.push(
        <Seat
          key={seatId}
          seatId={seatId}
          position={[
            (seat - seatsPerRow / 2) * 1.2,
            row * 0.8 + 1,
            0,
          ]}
          isSelected={isSelected}
          isAvailable={isAvailable}
          onClick={() => onSeatSelect?.(seatId)}
        />
      );
    }
  }

  return (
    <group position={position} rotation={rotation}>
      {seats}
    </group>
  );
}

/**
 * Siège individuel cliquable
 */
function Seat({ seatId, position, isSelected, isAvailable, onClick }) {
  const meshRef = useRef();

  // Animation hover
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = isSelected ? 1.3 : 1;
    }
  });

  // Couleur selon statut
  let color = '#EF4444'; // Rouge = réservé
  if (isAvailable) color = '#10B981'; // Vert = disponible
  if (isSelected) color = '#FFCC00'; // Jaune = sélectionné

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (isAvailable || isSelected) {
          onClick();
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (isAvailable || isSelected) {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <boxGeometry args={[0.8, 0.5, 0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

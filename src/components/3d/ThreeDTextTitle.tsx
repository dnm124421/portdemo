import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export const ThreeDTextTitle: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const textGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!textGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Hero dive occurs between scrollProgress 0.0 and 0.18
    const diveFactor = Math.min(Math.max(scrollProgress / 0.18, 0), 1);

    // As camera dives past, the 3D text object tilts, banks, and skews in 3D perspective space!
    textGroupRef.current.rotation.x = 0.08 - diveFactor * 0.45; // Pitch tilt
    textGroupRef.current.rotation.y = Math.sin(time * 0.8) * 0.04 + diveFactor * 0.25; // Yaw rotation
    textGroupRef.current.rotation.z = -diveFactor * 0.18; // Roll bank

    // Slight floating bounce
    textGroupRef.current.position.y = 1.0 + Math.sin(time * 1.5) * 0.08 - diveFactor * 0.5;
    textGroupRef.current.position.z = 4.0 - diveFactor * 2.0;
  });

  return (
    <group ref={textGroupRef} position={[0, 1.0, 4.0]}>
      {/* Main 3D Serif Text "Dhruv" */}
      <Text
        font="https://fonts.gstatic.com/s/cormorantgaramond/v19/allU-BADWXYvhGDUd43wR82s67Mpx4h0.woff"
        fontSize={2.6}
        letterSpacing={-0.02}
        lineHeight={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Dhruv
        <meshStandardMaterial
          roughness={0.2}
          metalness={0.8}
          color="#ffffff"
          emissive="#7be3b4"
          emissiveIntensity={0.15}
        />
      </Text>

      {/* Subtitle / Kicker in 3D */}
      <Text
        position={[0, -1.6, 0.1]}
        fontSize={0.32}
        letterSpacing={0.2}
        color="#7be3b4"
        anchorX="center"
        anchorY="middle"
      >
        DATA ANALYST • MUMBAI
        <meshBasicMaterial color="#7be3b4" />
      </Text>
    </group>
  );
};

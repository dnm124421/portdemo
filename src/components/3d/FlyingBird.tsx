import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const FlyingBird: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Flight trajectory across Hero Mountain
    const progress = Math.min(Math.max(scrollProgress / 0.25, 0), 1);
    
    // Position follows an arc
    const x = -12 + progress * 24 + Math.sin(time * 0.8) * 1.5;
    const y = 3.5 + Math.cos(time * 1.2) * 0.8 - progress * 2;
    const z = 8 - progress * 12 + Math.sin(time * 0.5) * 2;

    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = Math.PI / 4 + Math.sin(time * 0.5) * 0.1;
    groupRef.current.rotation.z = Math.sin(time * 2) * 0.08;

    // Wing flapping animation
    const flap = Math.sin(time * 12) * 0.45;
    if (wingLeftRef.current) wingLeftRef.current.rotation.z = flap;
    if (wingRightRef.current) wingRightRef.current.rotation.z = -flap;
  });

  return (
    <group ref={groupRef} scale={[0.3, 0.3, 0.3]}>
      {/* Low-poly bird body */}
      <mesh>
        <coneGeometry args={[0.2, 1.2, 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Left Wing */}
      <mesh ref={wingLeftRef} position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.4]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      {/* Right Wing */}
      <mesh ref={wingRightRef} position={[0.5, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.4]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
};

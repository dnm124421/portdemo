import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SunsetMountainTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 140, 140);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const elevation = Math.exp(-dist * dist * 0.003) * 11 + Math.sin(x * 0.4) * Math.cos(y * 0.4) * 2.2;
      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Floating golden embers
  const particlesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 240;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = Math.random() * 18;
      positions[i + 2] = (Math.random() - 0.5) * 45 - 90;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += 0.018;
        if (pos[i] > 20) pos[i] = 0;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -2, -100]}>
      {/* Sunset Mountain Mesh */}
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial
          color="#581c87"
          roughness={0.6}
          metalness={0.2}
          emissive="#7c2d12"
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>

      {/* Floating Sunset Embers */}
      <points ref={particlesRef} geometry={particlesGeo}>
        <pointsMaterial
          size={0.22}
          color="#fef08a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warm Sunset Directional & Ambient Lighting */}
      <directionalLight position={[15, 15, 12]} intensity={2.2} color="#f97316" />
      <ambientLight intensity={0.7} color="#4c1d95" />
    </group>
  );
};

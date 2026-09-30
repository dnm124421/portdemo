import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SunsetMountainTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(70, 70, 120, 120);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const elevation = Math.exp(-dist * dist * 0.0035) * 10 + Math.sin(x * 0.4) * Math.cos(y * 0.4) * 2;
      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Floating golden embers
  const particlesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 180;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = Math.random() * 15;
      positions[i + 2] = (Math.random() - 0.5) * 40 - 90;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += 0.015;
        if (pos[i] > 18) pos[i] = 0;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -2, -100]}>
      {/* Sunset Mountain Mesh */}
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial
          color="#4a3b52"
          roughness={0.7}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Floating Sunset Embers */}
      <points ref={particlesRef} geometry={particlesGeo}>
        <pointsMaterial
          size={0.15}
          color="#ffb703"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warm Sunset Directional & Ambient Lighting */}
      <directionalLight position={[10, 12, 10]} intensity={1.8} color="#ffaa5b" />
      <ambientLight intensity={0.5} color="#4a2545" />
    </group>
  );
};

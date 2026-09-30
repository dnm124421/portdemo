import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// 3D Simplex-like noise helper for procedural mountain terrain
function noise2D(x: number, y: number): number {
  const sin1 = Math.sin(x * 0.25 + y * 0.15);
  const cos1 = Math.cos(x * 0.15 - y * 0.3);
  const sin2 = Math.sin(x * 0.6 - y * 0.5) * 0.5;
  const cos2 = Math.cos(x * 0.4 + y * 0.8) * 0.5;
  const sin3 = Math.sin(x * 1.4 + y * 1.2) * 0.25;
  return sin1 + cos1 + sin2 + cos2 + sin3;
}

export const MountainTerrain: React.FC<{ scrollProgress?: number }> = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate displaced terrain geometry with central peak and detailed ridges
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 160, 160);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Distance from center for peak elevation
      const distFromCenter = Math.sqrt(x * x + y * y);
      const peakFactor = Math.exp(-distFromCenter * distFromCenter * 0.003) * 11.5;

      // Ridge detail
      const n1 = noise2D(x * 0.2, y * 0.2) * 2.5;
      const n2 = noise2D(x * 0.6, y * 0.6) * 0.8;
      const n3 = noise2D(x * 1.8, y * 1.8) * 0.3; // Micro close-up texture

      const elevation = peakFactor + n1 + n2 + n3;
      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Custom painterly shader material for mountain terrain
  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uSkyColor: { value: new THREE.Color('#3b82f6') },
        uRockColor: { value: new THREE.Color('#3a4a58') },
        uMossColor: { value: new THREE.Color('#4c7057') },
        uSnowColor: { value: new THREE.Color('#e2e8f0') },
        uLightPosition: { value: new THREE.Vector3(12, 20, 15) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vElevation = position.z;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uSkyColor;
        uniform vec3 uRockColor;
        uniform vec3 uMossColor;
        uniform vec3 uSnowColor;
        uniform vec3 uLightPosition;
        uniform float uTime;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          // Light direction
          vec3 lightDir = normalize(uLightPosition);
          float diff = max(dot(vNormal, lightDir), 0.0);
          
          // Toon / Painterly light stepping
          float toonLight = smoothstep(0.1, 0.15, diff) * 0.4 + smoothstep(0.5, 0.55, diff) * 0.4 + 0.2;

          // Height based gradient (Moss at bottom, Rock in middle, Snow on peak)
          vec3 baseColor = mix(uMossColor, uRockColor, smoothstep(1.5, 5.0, vElevation));
          baseColor = mix(baseColor, uSnowColor, smoothstep(8.5, 11.5, vElevation));

          // Detail noise pattern for close-up texture
          float detailNoise = sin(vUv.x * 120.0) * cos(vUv.y * 120.0) * 0.06;
          baseColor += detailNoise;

          // Final shaded color
          vec3 finalColor = baseColor * toonLight;

          // Rim / Atmospheric haze on peak edges
          float rim = 1.0 - max(dot(normalize(vViewPosition), vNormal), 0.0);
          rim = pow(rim, 4.0);
          finalColor += uSkyColor * rim * 0.25;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
      castShadow
    >
      <shaderMaterial ref={materialRef} attach="material" {...shaderArgs} />
    </mesh>
  );
};

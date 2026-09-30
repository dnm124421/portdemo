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
    const geo = new THREE.PlaneGeometry(90, 90, 180, 180);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Distance from center for peak elevation
      const distFromCenter = Math.sqrt(x * x + y * y);
      const peakFactor = Math.exp(-distFromCenter * distFromCenter * 0.0025) * 12.5;

      // Ridge detail
      const n1 = noise2D(x * 0.18, y * 0.18) * 3.0;
      const n2 = noise2D(x * 0.5, y * 0.5) * 1.0;
      const n3 = noise2D(x * 1.6, y * 1.6) * 0.35; // Micro close-up texture

      const elevation = peakFactor + n1 + n2 + n3;
      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Custom painterly shader material with rich, vibrant colors
  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uSkyColor: { value: new THREE.Color('#38bdf8') }, // Vivid Sky Blue
        uValleyGreen: { value: new THREE.Color('#15803d') }, // Vibrant Forest Moss Green
        uRockColor: { value: new THREE.Color('#78350f') }, // Rich Terracotta Rock
        uHighRockColor: { value: new THREE.Color('#475569') }, // Slate Ridge
        uSnowColor: { value: new THREE.Color('#f8fafc') }, // Crisp Pure Snow
        uSunColor: { value: new THREE.Color('#fef08a') }, // Warm Sunlight Glint
        uLightPosition: { value: new THREE.Vector3(15, 25, 20) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vElevation = position.z;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vec4 mvPosition = viewMatrix * worldPos;
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uSkyColor;
        uniform vec3 uValleyGreen;
        uniform vec3 uRockColor;
        uniform vec3 uHighRockColor;
        uniform vec3 uSnowColor;
        uniform vec3 uSunColor;
        uniform vec3 uLightPosition;
        uniform float uTime;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 lightDir = normalize(uLightPosition);
          float diff = max(dot(vNormal, lightDir), 0.0);
          
          // Toon / Painterly light stepping for artistic contrast
          float toonLight = smoothstep(0.05, 0.15, diff) * 0.35 + smoothstep(0.45, 0.6, diff) * 0.45 + 0.3;

          // Height-based color layering (Lush green valley -> Terracotta cliff -> Slate ridge -> Snow peak)
          vec3 baseColor = uValleyGreen;
          baseColor = mix(baseColor, uRockColor, smoothstep(1.5, 4.5, vElevation));
          baseColor = mix(baseColor, uHighRockColor, smoothstep(4.5, 8.0, vElevation));
          baseColor = mix(baseColor, uSnowColor, smoothstep(8.5, 11.5, vElevation));

          // Detail noise pattern for close-up texture richness
          float detailNoise = sin(vUv.x * 140.0) * cos(vUv.y * 140.0) * 0.05;
          baseColor += detailNoise;

          // Warm Sunlight Specular Highlights on snow & ridges
          float spec = pow(max(dot(reflect(-lightDir, vNormal), normalize(vViewPosition)), 0.0), 16.0);
          vec3 specular = uSunColor * spec * 0.3 * smoothstep(7.0, 12.0, vElevation);

          // Final shaded color
          vec3 finalColor = baseColor * toonLight + specular;

          // Atmospheric Sky Rim Glow
          float rim = 1.0 - max(dot(normalize(vViewPosition), vNormal), 0.0);
          rim = pow(rim, 3.5);
          finalColor += uSkyColor * rim * 0.3;

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

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const AerialValleyTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate top-down aerial river valley terrain
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(130, 150, 180, 200);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Winding river path along Y
      const riverCenter = Math.sin(y * 0.08) * 9 + Math.cos(y * 0.04) * 5;
      const distFromRiver = Math.abs(x - riverCenter);

      // Valley banks rise away from river
      let elevation = Math.pow(distFromRiver * 0.12, 1.8);

      // Add hill noise
      const n = Math.sin(x * 0.15 + y * 0.12) * 2.5 + Math.cos(x * 0.3 - y * 0.2) * 1.5;
      elevation += n;

      // Flatten riverbed
      if (distFromRiver < 4.0) {
        elevation = -0.6 - (4.0 - distFromRiver) * 0.4;
      }

      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  const shaderArgs = useMemo(() => {
    return {
      uniforms: {
        uTime: { value: 0 },
        uRiverColor: { value: new THREE.Color('#0284c7') }, // Sparkling Cerulean Blue
        uRiverGlint: { value: new THREE.Color('#38bdf8') }, // Bright Cyan Ripple
        uSandColor: { value: new THREE.Color('#eab308') }, // Golden Shore Sand
        uValleyGreen: { value: new THREE.Color('#16a34a') }, // Emerald Grass
        uHillGreen: { value: new THREE.Color('#22c55e') }, // Vibrant Forest Canopy Green
        uDeepForest: { value: new THREE.Color('#14532d') }, // Deep Pine Shade
        uLightPosition: { value: new THREE.Vector3(8, 30, 15) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vElevation = position.z;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uRiverColor;
        uniform vec3 uRiverGlint;
        uniform vec3 uSandColor;
        uniform vec3 uValleyGreen;
        uniform vec3 uHillGreen;
        uniform vec3 uDeepForest;
        uniform vec3 uLightPosition;
        uniform float uTime;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 lightDir = normalize(uLightPosition);
          float diff = max(dot(vNormal, lightDir), 0.0);
          float toonLight = smoothstep(0.1, 0.25, diff) * 0.4 + smoothstep(0.5, 0.65, diff) * 0.4 + 0.3;

          vec3 baseColor;
          
          // River water with animated wave ripples and glints
          if (vElevation < -0.2) {
            float wave = sin(vWorldPosition.x * 2.5 + uTime * 2.5) * cos(vWorldPosition.y * 2.5 + uTime * 2.0) * 0.15;
            baseColor = mix(uRiverColor, uRiverGlint, wave + 0.3);
            
            // Water glint specular highlight
            float spec = pow(max(dot(vNormal, lightDir), 0.0), 24.0);
            baseColor += vec3(0.9, 0.98, 1.0) * spec * 0.9;
          } else if (vElevation < 0.8) {
            // Shoreline golden sand transition
            baseColor = mix(uSandColor, uValleyGreen, smoothstep(-0.2, 0.8, vElevation));
          } else {
            // Emerald grass valley -> Vibrant forest canopy -> Deep pine hills
            baseColor = mix(uValleyGreen, uHillGreen, smoothstep(0.8, 4.0, vElevation));
            baseColor = mix(baseColor, uDeepForest, smoothstep(4.0, 7.5, vElevation));
          }

          // Foliage canopy micro texture
          float canopy = sin(vUv.x * 160.0) * sin(vUv.y * 160.0) * 0.05;
          baseColor += canopy;

          gl_FragColor = vec4(baseColor * toonLight, 1.0);
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
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, -45]}
      receiveShadow
    >
      <shaderMaterial ref={materialRef} attach="material" {...shaderArgs} />
    </mesh>
  );
};

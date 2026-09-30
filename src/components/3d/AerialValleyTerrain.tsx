import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const AerialValleyTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate top-down aerial river valley terrain
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 140, 160, 180);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Winding river path along Y
      const riverCenter = Math.sin(y * 0.08) * 8 + Math.cos(y * 0.04) * 4;
      const distFromRiver = Math.abs(x - riverCenter);

      // Valley banks rise away from river
      let elevation = Math.pow(distFromRiver * 0.12, 1.8);

      // Add hill noise
      const n = Math.sin(x * 0.15 + y * 0.12) * 2.2 + Math.cos(x * 0.3 - y * 0.2) * 1.2;
      elevation += n;

      // Flatten riverbed
      if (distFromRiver < 3.5) {
        elevation = -0.5 - (3.5 - distFromRiver) * 0.4;
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
        uRiverColor: { value: new THREE.Color('#38bdf8') },
        uValleyGreen: { value: new THREE.Color('#2d6a4f') },
        uHillGreen: { value: new THREE.Color('#52b788') },
        uSandColor: { value: new THREE.Color('#d4a373') },
        uLightPosition: { value: new THREE.Vector3(5, 25, 10) },
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
        uniform vec3 uValleyGreen;
        uniform vec3 uHillGreen;
        uniform vec3 uSandColor;
        uniform vec3 uLightPosition;
        uniform float uTime;

        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 lightDir = normalize(uLightPosition);
          float diff = max(dot(vNormal, lightDir), 0.0);
          float toonLight = smoothstep(0.1, 0.2, diff) * 0.35 + smoothstep(0.45, 0.55, diff) * 0.45 + 0.2;

          vec3 baseColor;
          
          // River water
          if (vElevation < -0.2) {
            float wave = sin(vWorldPosition.x * 2.0 + uTime * 2.0) * cos(vWorldPosition.y * 2.0 + uTime * 1.5) * 0.1;
            baseColor = uRiverColor + wave;
            // Water glint
            float spec = pow(max(dot(vNormal, lightDir), 0.0), 32.0);
            baseColor += vec3(1.0) * spec * 0.8;
          } else if (vElevation < 0.6) {
            // River sand / shore
            baseColor = mix(uSandColor, uValleyGreen, smoothstep(-0.2, 0.6, vElevation));
          } else {
            // Grass & forest hills
            baseColor = mix(uValleyGreen, uHillGreen, smoothstep(0.6, 6.0, vElevation));
          }

          // Subtle painterly canopy texture
          float canopy = sin(vUv.x * 150.0) * sin(vUv.y * 150.0) * 0.04;
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

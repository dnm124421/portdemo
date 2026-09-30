import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

interface CameraRigProps {
  scrollProgress: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 3.5, 14));
  const targetLook = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((_, delta) => {
    // Clamp progress
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (p <= 0.18) {
      // --- PART A: HERO 3D MOUNTAIN DIVE ---
      const t = p / 0.18;
      // Start wide, dive forward, down, and bank into mountain rock face
      targetPos.current.set(
        0.6 * t,
        3.5 - t * 4.7, // 3.5 down to -1.2
        14 - t * 13.2  // 14 down to 0.8
      );
      targetLook.current.set(
        1.8 * t,
        0.5 - t * 3.0,
        -t * 4.0
      );
    } else if (p <= 0.28) {
      // --- PART B: SLIDE CARD 1 (ABOUT ME) ---
      // Transitioning smoothly to top-down view behind purple slide card
      const t = (p - 0.18) / 0.1;
      targetPos.current.set(
        0.6 * (1 - t),
        -1.2 + t * 23.2, // Move up to aerial height 22
        0.8 - t * 20.8   // Move to -20
      );
      targetLook.current.set(
        0,
        0,
        -25
      );
    } else if (p <= 0.45) {
      // --- PART C: AERIAL VALLEY SCENE 1 (PROJECTS) ---
      // Continuous slow drift across river valley
      const t = (p - 0.28) / 0.17;
      targetPos.current.set(
        t * 6.0,
        22.0 - t * 2.0,
        -20.0 - t * 18.0 // -20 to -38
      );
      targetLook.current.set(
        t * 6.0,
        0,
        -25.0 - t * 18.0
      );
    } else if (p <= 0.55) {
      // --- SLIDE CARD 2 (EXPERIENCE) ---
      const t = (p - 0.45) / 0.1;
      targetPos.current.set(
        6.0 + t * 6.0,
        20.0 - t * 1.0,
        -38.0 - t * 14.0 // -38 to -52
      );
      targetLook.current.set(
        6.0 + t * 6.0,
        0,
        -43.0 - t * 14.0
      );
    } else if (p <= 0.70) {
      // --- AERIAL VALLEY SCENE 2 (SKILLS) ---
      const t = (p - 0.55) / 0.15;
      targetPos.current.set(
        12.0 + t * 4.0,
        19.0 - t * 1.0,
        -52.0 - t * 16.0 // -52 to -68
      );
      targetLook.current.set(
        12.0 + t * 4.0,
        0,
        -57.0 - t * 16.0
      );
    } else if (p <= 0.80) {
      // --- SLIDE CARD 3 (EDUCATION) ---
      const t = (p - 0.70) / 0.1;
      targetPos.current.set(
        16.0 - t * 8.0,
        18.0,
        -68.0 - t * 14.0 // -68 to -82
      );
      targetLook.current.set(
        16.0 - t * 8.0,
        0,
        -73.0 - t * 14.0
      );
    } else if (p <= 0.90) {
      // --- AERIAL SCENE 3 (RESUME) ---
      const t = (p - 0.80) / 0.1;
      targetPos.current.set(
        8.0 - t * 6.0,
        18.0 - t * 1.0,
        -82.0 - t * 10.0 // -82 to -92
      );
      targetLook.current.set(
        8.0 - t * 6.0,
        0,
        -87.0 - t * 10.0
      );
    } else {
      // --- FINAL SCENE: CONTACT ---
      const t = (p - 0.90) / 0.1;
      targetPos.current.set(
        2.0 * (1 - t),
        17.0 - t * 15.0, // Drop down to dusk mountain viewing position Y=2.0
        -92.0 - t * 8.0  // Z=-100
      );
      targetLook.current.set(
        0,
        1.2,
        -110.0
      );
    }

    // Smoothly lerp camera position and lookAt target
    const lerpFactor = Math.min(delta * 4.5, 0.15);
    camera.position.lerp(targetPos.current, lerpFactor);
    
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    const desiredLook = targetLook.current.clone().sub(camera.position).normalize();
    currentLook.lerp(desiredLook, lerpFactor);

    camera.lookAt(camera.position.clone().add(currentLook));
  });

  return null;
};

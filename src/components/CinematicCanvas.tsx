import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './3d/CameraRig';
import { MountainTerrain } from './3d/MountainTerrain';
import { ThreeDTextTitle } from './3d/ThreeDTextTitle';
import { FlyingBird } from './3d/FlyingBird';
import { AerialValleyTerrain } from './3d/AerialValleyTerrain';
import { SunsetMountainTerrain } from './3d/SunsetMountainTerrain';

interface CinematicCanvasProps {
  scrollProgress: number;
  currentSceneIndex?: number;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#060b0e]">
      <Canvas
        camera={{ position: [0, 3.5, 14], fov: 55, near: 0.1, far: 200 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* R3F Scroll-Driven Perspective Camera Rig */}
          <CameraRig scrollProgress={scrollProgress} />

          {/* Ambient & Directional Sky Lighting */}
          <ambientLight intensity={0.9} color="#e0f2fe" />
          <directionalLight position={[12, 20, 15]} intensity={1.5} color="#ffffff" castShadow />

          {/* PART A: 3D Mountain Terrain (Hero Dive) */}
          <MountainTerrain scrollProgress={scrollProgress} />

          {/* 3D Title Text "DHRUV" with authentic 3D perspective rotation as camera dives */}
          <ThreeDTextTitle scrollProgress={scrollProgress} />

          {/* 3D Flying Bird sprite for scale & motion */}
          <FlyingBird scrollProgress={scrollProgress} />

          {/* PART C: Top-down Aerial River Valley Terrain (Projects, Skills, Resume) */}
          <AerialValleyTerrain />

          {/* FINAL SCENE: Sunset Dusk Mountain Peak (Contact) */}
          <SunsetMountainTerrain />
        </Suspense>
      </Canvas>

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b0e]/80 via-transparent to-[#060b0e]/40 pointer-events-none" />
    </div>
  );
};

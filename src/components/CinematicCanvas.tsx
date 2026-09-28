import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicCanvasProps {
  scrollProgress: number; // 0 to 1
  currentSceneIndex?: number;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    scrollTargetRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060b0e, 0.018);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // --- Ambient Floating Particles ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 35;
      particlePos[i + 1] = (Math.random() - 0.5) * 25;
      particlePos[i + 2] = (Math.random() - 0.5) * 60 - 10;
      particleScales[i / 3] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Particle Shader Material
    const particleMat = new THREE.PointsMaterial({
      color: 0x7be3b4,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Multi-Plane Scenery Planes ---
    const textureLoader = new THREE.TextureLoader();
    const planeMeshes: THREE.Mesh[] = [];
    const planeMaterials: THREE.MeshBasicMaterial[] = [];

    // Distinct unique textures
    const uniqueImages = [
      '/assets/hero-mountain.jpg',
      '/assets/river-valley.jpg',
      '/assets/forest-canopy.jpg',
      '/assets/alpine-lake.jpg',
      '/assets/sunset-ridge.jpg',
    ];

    const planeWidth = 24;
    const planeHeight = 13.5;
    const planeSpacing = 12;

    uniqueImages.forEach((imgUrl, idx) => {
      const texture = textureLoader.load(imgUrl);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: idx === 0 ? 1 : 0.2,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, -idx * planeSpacing);
      scene.add(mesh);

      planeMeshes.push(mesh);
      planeMaterials.push(material);
    });

    // --- Ambient Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x7be3b4, 0.6);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // --- Mouse Parallax Handler ---
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let currentScroll = 0;
    const totalDepth = (uniqueImages.length - 1) * planeSpacing;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth lerp for scroll and mouse
      currentScroll += (scrollTargetRef.current - currentScroll) * 0.08;
      
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera flies forward along Z based on scroll
      const cameraZ = 8 - currentScroll * totalDepth;
      camera.position.z = cameraZ;
      camera.position.x = mouseRef.current.x * 0.6;
      camera.position.y = mouseRef.current.y * 0.4;
      camera.lookAt(0, 0, cameraZ - 10);

      // Update plane visibility & subtle parallax scaling
      const numPlanes = planeMeshes.length;
      planeMeshes.forEach((mesh, idx) => {
        // Active focus calculation
        const planeIndexProgress = (idx / (numPlanes - 1));
        const diff = Math.abs(currentScroll - planeIndexProgress);
        
        // Smooth opacity cross-dissolve
        const opacity = Math.max(0.05, 1 - Math.pow(diff * (numPlanes - 0.5), 1.6));
        planeMaterials[idx].opacity = opacity;

        // Subtle scale pulse and breathing
        const scale = 1 + (1 - opacity) * 0.08;
        mesh.scale.set(scale, scale, 1);
      });

      // Drifting particles motion
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.005; // float upward
        if (positions[i] > 15) positions[i] = -15;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeMaterials.forEach(m => m.dispose());
      planeMeshes.forEach(m => m.geometry.dispose());
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#060b0e]"
    >
      {/* Cinematic Vignette & Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b0e]/90 via-transparent to-[#060b0e]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#060b0e]/20 to-[#060b0e]/80 pointer-events-none" />
    </div>
  );
};

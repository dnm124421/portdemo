import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { portfolioData } from './data/portfolioData';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { LeftDiamondNav } from './components/LeftDiamondNav';
import { ScrollIndicator } from './components/ScrollIndicator';
import { CinematicCanvas } from './components/CinematicCanvas';
import { ScrollStopOverlay } from './components/ScrollStopOverlay';
import { DetailModal } from './components/DetailModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [modalSection, setModalSection] = useState<string | null>(null);

  const lenisRef = useRef<Lenis | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stops = portfolioData.scrollStops;
  const numStops = stops.length;

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      
      setScrollProgress(progress);

      // Determine active stop index based on progress
      const segmentSize = 1 / (numStops - 1);
      const calculatedIndex = Math.min(
        Math.round(progress / segmentSize),
        numStops - 1
      );
      setActiveStopIndex(calculatedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading, numStops]);

  // Pause / Resume Lenis when modal opens/closes
  useEffect(() => {
    if (lenisRef.current) {
      if (modalSection) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [modalSection]);

  // Scroll to a specific stop index
  const scrollToStop = (index: number) => {
    if (!lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / (numStops - 1)) * maxScroll;
    lenisRef.current.scrollTo(targetScroll, { duration: 1.4 });
  };

  // Handlers
  const handleExplore = (sectionKey: string) => {
    setModalSection(sectionKey);
  };

  const handleContactClick = () => {
    setModalSection('contact');
  };

  const handleLogoClick = () => {
    scrollToStop(0);
  };

  const handleScrollDown = () => {
    scrollToStop(1);
  };

  return (
    <div className="relative min-h-screen bg-[#060b0e] text-[#f8f7f2] font-sans selection:bg-brand-accent/30 selection:text-white">
      {/* 1. Preloader Screen */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* 2. Top Scroll Indicator Line */}
      <ScrollIndicator progress={scrollProgress} />

      {/* 3. Fixed Header Bar */}
      <Header
        onContactClick={handleContactClick}
        onLogoClick={handleLogoClick}
      />

      {/* 4. Left Diamond Navigation Dots */}
      <LeftDiamondNav
        stops={stops}
        activeIndex={activeStopIndex}
        onSelectIndex={scrollToStop}
      />

      {/* 5. Three.js / WebGL Multi-Layer Parallax Cinematic Canvas */}
      <CinematicCanvas
        scrollProgress={scrollProgress}
        currentSceneIndex={stops[activeStopIndex]?.sceneIndex ?? 0}
      />

      {/* 6. Fixed Fullscreen Scroll Stop Text & Button Overlays */}
      <ScrollStopOverlay
        stops={stops}
        activeIndex={activeStopIndex}
        onExplore={handleExplore}
        onScrollDown={handleScrollDown}
      />

      {/* 7. Virtual Scroll Runway (creates standard scroll height for Lenis & ScrollTrigger) */}
      <div
        ref={scrollContainerRef}
        className="relative pointer-events-none"
        style={{ height: `${numStops * 110}vh` }}
      >
        {stops.map((stop, idx) => (
          <div
            key={stop.id}
            id={`stop-anchor-${idx}`}
            className="w-full"
            style={{ height: '110vh' }}
          />
        ))}
      </div>

      {/* 8. Detailed Glassmorphic Modal & Section Drawer */}
      <DetailModal
        isOpen={Boolean(modalSection)}
        activeSection={modalSection}
        onClose={() => setModalSection(null)}
        onSwitchSection={(key) => setModalSection(key)}
      />
    </div>
  );
};

export default App;

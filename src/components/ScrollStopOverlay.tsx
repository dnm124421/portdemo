import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollStop } from '../data/portfolioData';
import { LargeSectionDiamond } from './DiamondIcon';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface ScrollStopOverlayProps {
  stops: ScrollStop[];
  activeIndex: number;
  onExplore: (sectionKey: string) => void;
  onScrollDown: () => void;
}

// Flat solid colors for Part B Slide Cards (no gradient, calm & muted)
const slideCardColors: Record<number, { bg: string; textColor: string }> = {
  1: { bg: '#8f8ae0', textColor: '#ffffff' }, // Stop 1 (About Me) - Solid Periwinkle Purple
  3: { bg: '#5f8d76', textColor: '#ffffff' }, // Stop 3 (Experience) - Solid Muted Sage Green
  5: { bg: '#6c5b7b', textColor: '#ffffff' }, // Stop 5 (Education) - Solid Calm Dusk Rose
};

export const ScrollStopOverlay: React.FC<ScrollStopOverlayProps> = ({
  stops,
  activeIndex,
  onExplore,
  onScrollDown,
}) => {
  const currentStop = stops[activeIndex];
  if (!currentStop) return null;

  const isHero = currentStop.sectionKey === 'hero';
  const isSlideCard = activeIndex in slideCardColors;
  const slideStyle = slideCardColors[activeIndex];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
      {/* ------------------------------------------------------------- */}
      {/* PART B: FULL-SCREEN FLAT SOLID COLOR TRANSITION SLIDE CARD    */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence mode="wait">
        {isSlideCard && slideStyle && (
          <motion.div
            key={`slide-card-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-auto flex flex-col items-center justify-center text-center p-6 md:p-12 z-40"
            style={{ backgroundColor: slideStyle.bg }}
          >
            <div className="flex flex-col items-center max-w-2xl select-none">
              {/* Micro Eyebrow Label */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/80 mb-3"
              >
                {currentStop.kicker || 'WHERE INSIGHT —'}
              </motion.span>

              {/* Centered Serif Title with slight upward slide */}
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-6xl sm:text-7xl md:text-9xl text-white tracking-tight font-light mb-6"
              >
                {currentStop.title}
              </motion.h2>

              {/* 1-2 Line Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-sans text-base md:text-xl text-white/90 font-light leading-relaxed max-w-lg mb-8"
              >
                {currentStop.description}
              </motion.p>

              {/* Rotated Diamond Icon Marker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <div className="w-4 h-4 rotate-45 border-2 border-white/80 bg-white/20" />
              </motion.div>

              {/* Glass CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={() => onExplore(currentStop.sectionKey)}
                className="glass-pill group relative flex items-center gap-4 px-7 py-3 rounded-full text-white font-medium text-sm md:text-base cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105"
              >
                <span className="tracking-wider">{currentStop.buttonText || 'Know More →'}</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* PART A (Hero) & PART C (Aerial Valley Overlays)               */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence mode="wait">
        {!isSlideCard && (
          <motion.div
            key={`stop-overlay-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-20 pointer-events-auto"
          >
            {isHero ? (
              /* --- PART A: HERO OVERLAY --- */
              <div className="flex flex-col items-center max-w-4xl px-4 select-none">
                {/* Top Center Kicker */}
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-white/10 text-brand-accent font-mono text-xs md:text-sm tracking-[0.25em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  {currentStop.kicker}
                </div>

                {/* Subtitle / Location (Title "Dhruv" is rendered in 3D in R3F Canvas!) */}
                <div className="h-44 md:h-56" /> {/* Placeholder spacing for 3D text */}

                <p className="font-sans text-sm md:text-base text-white/70 tracking-widest uppercase mb-10">
                  {currentStop.subtitle}
                </p>

                {/* Scroll To Start Indicator */}
                <button
                  onClick={onScrollDown}
                  className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  aria-label="Scroll down to start"
                >
                  <span className="font-sans text-xs md:text-sm tracking-[0.2em] text-white/80 uppercase group-hover:text-brand-accent transition-colors duration-300 animate-pulse-subtle">
                    {currentStop.description}
                  </span>
                  <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center group-hover:border-brand-accent transition-colors duration-300">
                    <ChevronDown className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            ) : (
              /* --- PART C: AERIAL VALLEY OVERLAYS (Projects, Skills, Resume, Contact) --- */
              <div className="flex flex-col items-center max-w-3xl px-4 select-none">
                {/* Diamond Section Icon */}
                <div className="mb-4 transform transition-transform duration-500 hover:rotate-45">
                  <LargeSectionDiamond />
                </div>

                {/* Section Number / Kicker */}
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-brand-accent/90 mb-2">
                  {currentStop.kicker}
                </span>

                {/* Large Serif Title (Supports "Live | Projects" vertical divider style) */}
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-white tracking-tight font-light drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4 flex items-center gap-3">
                  {currentStop.sectionKey === 'projects' ? (
                    <>
                      <span className="text-white/60">Live</span>
                      <span className="w-[1px] h-10 md:h-16 bg-white/40 inline-block" />
                      <span>Projects</span>
                    </>
                  ) : (
                    currentStop.title
                  )}
                </h2>

                {/* Short Description */}
                <p className="font-sans text-base md:text-xl text-white/85 max-w-xl font-light leading-relaxed mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {currentStop.description}
                </p>

                {/* Transparent Glassmorphic CTA Button */}
                <button
                  onClick={() => onExplore(currentStop.sectionKey)}
                  className="glass-pill group relative flex items-center gap-4 px-7 py-3 rounded-full text-white font-medium text-sm md:text-base cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105"
                >
                  <span className="tracking-wider">{currentStop.buttonText || 'Explore →'}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

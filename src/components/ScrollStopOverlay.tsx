import React from 'react';
import { ScrollStop } from '../data/portfolioData';
import { LargeSectionDiamond } from './DiamondIcon';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface ScrollStopOverlayProps {
  stops: ScrollStop[];
  activeIndex: number;
  onExplore: (sectionKey: string) => void;
  onScrollDown: () => void;
}

export const ScrollStopOverlay: React.FC<ScrollStopOverlayProps> = ({
  stops,
  activeIndex,
  onExplore,
  onScrollDown,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center p-6 md:p-12">
      {stops.map((stop, index) => {
        const isActive = activeIndex === index;
        const isHero = stop.sectionKey === 'hero';

        return (
          <div
            key={stop.id}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out ${
              isActive
                ? 'opacity-100 scale-100 pointer-events-auto filter-none translate-y-0'
                : 'opacity-0 scale-95 pointer-events-none blur-sm translate-y-6'
            }`}
          >
            {isHero ? (
              /* --- Hero Screen (Scene 1) --- */
              <div className="flex flex-col items-center max-w-4xl px-4 select-none">
                {/* Top Center Kicker */}
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-white/10 text-brand-accent font-mono text-xs md:text-sm tracking-[0.25em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  {stop.kicker}
                </div>

                {/* Giant Serif Title */}
                <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none text-white tracking-tight font-light drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] my-2">
                  {stop.title}
                </h1>

                {/* Subtitle / Location */}
                <p className="font-sans text-sm md:text-base text-white/70 tracking-widest uppercase mb-10">
                  {stop.subtitle}
                </p>

                {/* Scroll To Start Indicator */}
                <button
                  onClick={onScrollDown}
                  className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  aria-label="Scroll down to start"
                >
                  <span className="font-sans text-xs md:text-sm tracking-[0.2em] text-white/80 uppercase group-hover:text-brand-accent transition-colors duration-300 animate-pulse-subtle">
                    {stop.description}
                  </span>
                  <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center group-hover:border-brand-accent transition-colors duration-300">
                    <ChevronDown className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            ) : (
              /* --- Stops 2 to 8 (Sections) --- */
              <div className="flex flex-col items-center max-w-3xl px-4 select-none">
                {/* Diamond Section Icon */}
                <div className="mb-6 transform transition-transform duration-500 hover:rotate-45">
                  <LargeSectionDiamond />
                </div>

                {/* Section Number / Kicker */}
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-brand-accent/90 mb-2">
                  {stop.kicker}
                </span>

                {/* Large Serif Section Title */}
                <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-white tracking-tight font-light drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4">
                  {stop.title}
                </h2>

                {/* Short Unblurring Description */}
                <p className="font-sans text-base md:text-xl text-white/85 max-w-xl font-light leading-relaxed mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {stop.description}
                </p>

                {/* Transparent Glassmorphic Clickable Button */}
                <button
                  onClick={() => onExplore(stop.sectionKey)}
                  className="glass-pill group relative flex items-center gap-4 px-7 py-3 rounded-full text-white font-medium text-sm md:text-base cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105"
                >
                  <span className="tracking-wider">{stop.buttonText || 'Explore →'}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

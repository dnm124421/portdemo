import React from 'react';
import { ScrollStop } from '../data/portfolioData';

interface LeftDiamondNavProps {
  stops: ScrollStop[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export const LeftDiamondNav: React.FC<LeftDiamondNavProps> = ({
  stops,
  activeIndex,
  onSelectIndex,
}) => {
  return (
    <nav 
      className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-6 pointer-events-auto"
      aria-label="Section Navigation"
    >
      {/* Connecting Vertical Track */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent -z-10" />

      {stops.map((stop, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={stop.id}
            onClick={() => onSelectIndex(index)}
            className="group relative p-2 focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label={`Scroll to ${stop.title}`}
          >
            {/* Diamond Dot */}
            <div
              className={`diamond-nav-dot ${
                isActive ? 'active scale-125' : 'opacity-60 group-hover:opacity-100'
              }`}
            />

            {/* Hover Tooltip on Right */}
            <div className="absolute left-8 px-3 py-1 rounded-md glass-panel text-xs font-serif tracking-wider text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
              <span className="text-brand-accent font-mono text-[10px] mr-1.5">{String(index + 1).padStart(2, '0')}</span>
              {stop.title}
            </div>
          </button>
        );
      })}
    </nav>
  );
};

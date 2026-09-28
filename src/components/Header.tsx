import React from 'react';
import { DiamondIcon } from './DiamondIcon';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, onLogoClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">
      {/* Brand / Logo */}
      <button
        onClick={onLogoClick}
        className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        aria-label="Scroll to top"
      >
        <DiamondIcon size={22} glow={true} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="font-serif text-2xl md:text-3xl text-white tracking-wider font-light group-hover:text-brand-accent transition-colors duration-300">
          Dhruv
        </span>
      </button>

      {/* Action / Contact Button (Matching EverSwap Launch App glassmorphic pill) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onContactClick}
          className="glass-pill group relative flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <span className="tracking-wide text-xs md:text-sm">Contact Me</span>
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </header>
  );
};

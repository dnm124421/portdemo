import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 300);
          setTimeout(() => onComplete(), 900);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060b0e] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Geometric Diamond Motif */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          {/* Outer Pulsing Aura */}
          <div className="absolute inset-0 border border-brand-accent/30 rotate-45 rounded-lg animate-ping opacity-25" />
          
          {/* Outer Diamond */}
          <div 
            className="absolute w-20 h-20 border border-white/40 rotate-45 transition-transform duration-700"
            style={{ transform: `rotate(${45 + progress * 0.9}deg) scale(${0.8 + progress * 0.002})` }}
          />

          {/* Inner Diamond */}
          <div 
            className="absolute w-10 h-10 bg-brand-accent/20 border border-brand-accent rotate-45 transition-transform duration-500"
            style={{ transform: `rotate(${45 - progress * 0.9}deg)` }}
          />

          {/* Center Luminous Dot */}
          <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#7be3b4]" />
        </div>

        {/* Wordmark */}
        <div className="font-serif text-3xl md:text-4xl text-white tracking-widest uppercase mb-2">
          Dhruv
        </div>
        <div className="text-xs font-mono text-white/50 tracking-[0.3em] uppercase mb-6">
          Data Analyst
        </div>

        {/* Loading Counter */}
        <div className="font-mono text-sm tracking-wider text-brand-accent/90">
          {progress}%
        </div>
      </div>
    </div>
  );
};

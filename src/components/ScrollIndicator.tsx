import React from 'react';

interface ScrollIndicatorProps {
  progress: number; // 0 to 1
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-brand-accent via-white to-brand-accent transition-all duration-150 ease-out shadow-[0_0_8px_rgba(123,227,180,0.8)]"
        style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
      />
    </div>
  );
};

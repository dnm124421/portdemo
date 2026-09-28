import React from 'react';

interface DiamondIconProps {
  className?: string;
  size?: number;
  filled?: boolean;
  glow?: boolean;
}

export const DiamondIcon: React.FC<DiamondIconProps> = ({
  className = "w-6 h-6",
  size = 24,
  filled = false,
  glow = true
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500"
      >
        <defs>
          <linearGradient id="diamondGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8f7f2" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#7be3b4" stopOpacity="0.8" />
            <stop offset="1" stopColor="#f8f7f2" stopOpacity="0.3" />
          </linearGradient>
          <filter id="diamondGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Diamond */}
        <rect
          x="12"
          y="2"
          width="14"
          height="14"
          rx="1"
          transform="rotate(45 12 2)"
          stroke="url(#diamondGrad)"
          strokeWidth="1.2"
          fill={filled ? "rgba(123, 227, 180, 0.2)" : "rgba(255, 255, 255, 0.04)"}
          filter={glow ? "url(#diamondGlow)" : undefined}
        />

        {/* Inner Diamond Accent */}
        <rect
          x="12"
          y="8"
          width="5.6"
          height="5.6"
          rx="0.5"
          transform="rotate(45 12 8)"
          fill="#f8f7f2"
          opacity={filled ? 1 : 0.75}
        />
      </svg>
    </div>
  );
};

export const LargeSectionDiamond: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse-subtle"
      >
        <defs>
          <linearGradient id="largeDiamondGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8f7f2" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#7be3b4" />
            <stop offset="1" stopColor="#a5c4d4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Outer Diamond Outline */}
        <rect
          x="32"
          y="6"
          width="36.7"
          height="36.7"
          rx="2"
          transform="rotate(45 32 6)"
          stroke="url(#largeDiamondGrad)"
          strokeWidth="1.2"
          fill="rgba(255, 255, 255, 0.05)"
        />

        {/* Inner Diamond */}
        <rect
          x="32"
          y="22"
          width="14"
          height="14"
          rx="1"
          transform="rotate(45 32 22)"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1"
          fill="rgba(123, 227, 180, 0.15)"
        />

        {/* Center Point */}
        <circle cx="32" cy="32" r="2" fill="#f8f7f2" />
      </svg>
    </div>
  );
};

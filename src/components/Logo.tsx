import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    className={`shrink-0 ${className}`}
  >
    <rect width="512" height="512" rx={96} fill="var(--app-accent, #FFC800)" style={{ borderRadius: 20, borderTopRightRadius: 20 }} />
    <text
      x="256" y="320"
      fontFamily="Arial, sans-serif"
      fontSize={320}
      fontWeight="900"
      textAnchor="middle"
      fill="var(--logo-text, #111111)"
    >
      T
    </text>
    <path
      d="M100 380 Q256 440 412 380"
      stroke="var(--logo-text, #111111)"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="160" cy="340" r="12" fill="var(--logo-text, #111111)" opacity="0.8" />
    <circle cx="352" cy="340" r="12" fill="var(--logo-text, #111111)" opacity="0.8" />
  </svg>
);

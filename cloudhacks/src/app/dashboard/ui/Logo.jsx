import React from 'react';

const Logo = ({ className = "w-24 h-24" }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Calendar Base */}
    <rect x="40" y="60" width="120" height="110" rx="8" fill="#232F3E" />

    {/* Calendar Top */}
    <rect x="40" y="60" width="120" height="24" rx="8" fill="#FF9900" />

    {/* Calendar Hangers */}
    <rect x="70" y="50" width="8" height="20" rx="4" fill="#232F3E" />
    <rect x="122" y="50" width="8" height="20" rx="4" fill="#232F3E" />

    {/* Calendar Grid Lines */}
    <rect x="50" y="94" width="100" height="2" fill="#FF9900" opacity="0.6" />
    <rect x="50" y="124" width="100" height="2" fill="#FF9900" opacity="0.6" />
    <rect x="50" y="154" width="100" height="2" fill="#FF9900" opacity="0.6" />
    <rect x="80" y="94" width="2" height="62" fill="#FF9900" opacity="0.6" />
    <rect x="110" y="94" width="2" height="62" fill="#FF9900" opacity="0.6" />
    <rect x="140" y="94" width="2" height="62" fill="#FF9900" opacity="0.6" />

    {/* AWS Cloud Symbol */}
    <path
      d="M100 30C87.85 30 78 39.85 78 52C78 64.15 87.85 74 100 74C112.15 74 122 64.15 122 52C122 39.85 112.15 30 100 30Z"
      fill="#FF9900"
    />
    <path
      d="M100 40C93.37 40 88 45.37 88 52C88 58.63 93.37 64 100 64C106.63 64 112 58.63 112 52C112 45.37 106.63 40 100 40Z"
      fill="#232F3E"
    />

    {/* Hackathon Symbol (Lightning Bolt) */}
    <path
      d="M95 110L85 130L95 130L90 150L110 125L95 125L105 110L95 110Z"
      fill="#FF9900"
    />
  </svg>
);

export default Logo;
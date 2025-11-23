import React from 'react';
import { HeroConfig, MaskType } from '../types';

interface HeroRendererProps {
  config: HeroConfig;
  name: string;
  size?: number;
  className?: string;
}

const HeroRenderer: React.FC<HeroRendererProps> = ({ config, name, size = 300, className }) => {
  const { suitColor, capeColor, maskColor, maskType, skinTone } = config;
  
  // Center emblem letter
  const initial = (name as any).length > 0 ? (name as any)[0].toUpperCase() : "H";

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 300" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Hero avatar for ${name}`}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Cape (Behind) */}
      <path 
        d="M50,80 L20,250 L100,280 L180,250 L150,80 Z" 
        fill={capeColor} 
        stroke="#000" 
        strokeWidth="2"
      />

      {/* Legs */}
      <rect x="70" y="180" width="25" height="100" fill={suitColor} stroke="#000" strokeWidth="2" />
      <rect x="105" y="180" width="25" height="100" fill={suitColor} stroke="#000" strokeWidth="2" />
      
      {/* Boots */}
      <path d="M65,250 L95,250 L95,280 L65,280 Z" fill={capeColor} stroke="#000" strokeWidth="2" />
      <path d="M105,250 L135,250 L135,280 L105,280 Z" fill={capeColor} stroke="#000" strokeWidth="2" />

      {/* Torso */}
      <path 
        d="M60,80 L140,80 L130,190 L70,190 Z" 
        fill={suitColor} 
        stroke="#000" 
        strokeWidth="2"
      />

      {/* Emblem Circle */}
      <circle cx="100" cy="120" r="20" fill="#FFF" stroke="#000" strokeWidth="2" />
      
      {/* Emblem Text */}
      <text 
        x="100" 
        y="128" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="bold" 
        fill="#000" 
        fontFamily="Verdana"
      >
        {initial}
      </text>

      {/* Belt */}
      <rect x="70" y="180" width="60" height="10" fill="#FFD700" stroke="#000" strokeWidth="2" />

      {/* Arms */}
      <path d="M60,85 L30,150 L45,160 L70,100" fill={suitColor} stroke="#000" strokeWidth="2" />
      <path d="M140,85 L170,150 L155,160 L130,100" fill={suitColor} stroke="#000" strokeWidth="2" />

      {/* Hands */}
      <circle cx="38" cy="155" r="10" fill={skinTone} stroke="#000" strokeWidth="2" />
      <circle cx="162" cy="155" r="10" fill={skinTone} stroke="#000" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="100" cy="50" rx="35" ry="40" fill={skinTone} stroke="#000" strokeWidth="2" />

      {/* Mouth */}
      <path d="M90,70 Q100,80 110,70" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />

      {/* Mask Logic */}
      {maskType === MaskType.BANDIT && (
        <path 
          d="M65,40 Q100,30 135,40 L135,60 Q100,50 65,60 Z" 
          fill={maskColor} 
          stroke="#000" 
          strokeWidth="2" 
        />
      )}
      
      {maskType === MaskType.COWL && (
        <path 
          d="M65,10 L135,10 L135,55 L115,55 L115,40 L85,40 L85,55 L65,55 Z" 
          fill={maskColor} 
          stroke="#000" 
          strokeWidth="2" 
        />
      )}

      {maskType === MaskType.VISOR && (
        <rect x="70" y="35" width="60" height="15" rx="5" fill={maskColor} stroke="#000" strokeWidth="2" />
      )}

      {/* Eyes (Draw on top of mask unless fully covered, simplified here for visual stacking) */}
      {(maskType === MaskType.NONE || maskType === MaskType.BANDIT || maskType === MaskType.COWL) && (
        <g>
          <circle cx="85" cy="45" r="3" fill="#000" />
          <circle cx="115" cy="45" r="3" fill="#000" />
        </g>
      )}

    </svg>
  );
};

export default HeroRenderer;
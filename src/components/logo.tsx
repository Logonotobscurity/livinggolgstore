// Contains three standalone React components that return different SVG variants of the LIVING GOLD logo.
// 1) LivingGoldLogo - two-line logo (desktop/footer) - default
// 2) LivingGoldWordmark - single-line wordmark for headers/navigation
// 3) LivingGoldLogoMobile - compact/mobile-optimized stacked mark
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export function LivingGoldLogo({ className, title = 'LIVING GOLD', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-labelledby="lgTitle lgDesc"
      {...props}
    >
      <title id="lgTitle">{title}</title>
      <desc id="lgDesc">LIVING GOLD two-line logo</desc>
      <defs>
        <linearGradient id="goldGrad1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f6d365" />
          <stop offset="35%" stopColor="#f3c241" />
          <stop offset="65%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>

        <linearGradient id="shineGrad1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <pattern id="stripes1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="3" height="6" fill="#ffffff" fillOpacity="0.03" />
        </pattern>
      </defs>

      <g transform="translate(0,12)">
        <rect x="40" y="18" rx="80" ry="80" width="1120" height="280" fill="currentColor" opacity="0.1" />
      </g>

      <g fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
        <text x="600" y="130" fontSize="118" fontWeight="700" letterSpacing="6" fill="url(#goldGrad1)" stroke="rgba(0,0,0,0.18)" strokeWidth="2">LIVING</text>
        <text x="600" y="250" fontSize="168" fontWeight="800" letterSpacing="10" fill="url(#goldGrad1)" stroke="rgba(0,0,0,0.2)" strokeWidth="3">GOLD</text>
        <rect x="0" y="0" width="1200" height="320" fill="url(#stripes1)" opacity="0.12" />
        <path d="M420 180 C520 110, 680 110, 780 180 L780 200 C680 130, 520 130, 420 200 Z" fill="url(#shineGrad1)" opacity="0.9" />
        <line x1="220" x2="980" y1="282" y2="282" stroke="#ffd57a" strokeWidth="4" opacity="0.7" />
      </g>
    </svg>
  );
}

export function LivingGoldWordmark({ className, title = 'LIVING GOLD', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 1000 140"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-labelledby="lgWordTitle lgWordDesc"
      {...props}
    >
      <title id="lgWordTitle">{title}</title>
      <desc id="lgWordDesc">LIVING GOLD single-line wordmark</desc>
      <defs>
        <linearGradient id="goldGrad2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f6d365" />
          <stop offset="35%" stopColor="#f3c241" />
          <stop offset="65%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="shineGrad2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
        <text x="500" y="90" fontSize="96" fontWeight="800" letterSpacing="6" fill="url(#goldGrad2)" stroke="rgba(0,0,0,0.22)" strokeWidth="3">LIVING GOLD</text>
        <path d="M220 95 C340 40, 660 40, 780 95" fill="url(#shineGrad2)" opacity="0.9" />
      </g>
    </svg>
  );
}

export function LivingGoldLogoMobile({ className, title = 'LIVING GOLD', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 420 220"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-labelledby="lgMobileTitle lgMobileDesc"
      {...props}
    >
      <title id="lgMobileTitle">{title}</title>
      <desc id="lgMobileDesc">LIVING GOLD mobile stacked logo</desc>
      <defs>
        <linearGradient id="goldGrad3" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f6d365" />
          <stop offset="35%" stopColor="#f3c241" />
          <stop offset="65%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <g fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
        <text x="210" y="70" fontSize="44" fontWeight="700" letterSpacing="3" fill="url(#goldGrad3)" stroke="rgba(0,0,0,0.16)" strokeWidth="1.5">LIVING</text>
        <text x="210" y="140" fontSize="68" fontWeight="800" letterSpacing="6" fill="url(#goldGrad3)" stroke="rgba(0,0,0,0.18)" strokeWidth="2">GOLD</text>
      </g>
    </svg>
  );
}

// Contains three standalone React components that return different SVG variants of the LIVING GOLD logo.
// 1) LivingGoldLogo - two-line logo (desktop/footer)
// 2) LivingGoldWordmark - single-line wordmark for headers/navigation
// 3) LivingGoldLogoMobile - compact/mobile-optimized stacked mark
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export function LivingGoldLogo({ className, title = "LIVING GOLD", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid meet" className={className} role="img" aria-labelledby="lgTitle lgDesc" {...props}>
      <title id="lgTitle">{title}</title>
      <desc id="lgDesc">LIVING GOLD single-line logo (no background)</desc>
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
      </defs>

      <g fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
        <text x="50%" y="50%" dy=".3em" fontSize="150" fontWeight="800" letterSpacing="8" fill="url(#goldGrad1)" stroke="rgba(0,0,0,0.22)" strokeWidth="3">LIVING GOLD</text>
        <path d="M150 140 C350 50, 850 50, 1050 140" fill="url(#shineGrad1)" opacity="0.9" />
      </g>
    </svg>
  );
}

export function LivingGoldWordmark({ className, title = "LIVING GOLD", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 1000 140" preserveAspectRatio="xMidYMid meet" className={className} role="img" aria-labelledby="lgWordTitle lgWordDesc" {...props}>
      <title id="lgWordTitle">{title}</title>
      <desc id="lgWordDesc">LIVING GOLD single-line wordmark (no background)</desc>
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
        <text x="500" y="90" fontSize="120" fontWeight="800" letterSpacing="6" fill="url(#goldGrad2)" stroke="rgba(0,0,0,0.22)" strokeWidth="3">LIVING GOLD</text>
        <path d="M220 95 C340 40, 660 40, 780 95" fill="url(#shineGrad2)" opacity="0.9" />
      </g>
    </svg>
  );
}

export function LivingGoldLogoMobile({ className, title = "LIVING GOLD", ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 420 220" preserveAspectRatio="xMidYMid meet" className={cn("mx-auto", className)} role="img" aria-labelledby="lgMobileTitle lgMobileDesc" {...props}>
      <title id="lgMobileTitle">{title}</title>
      <desc id="lgMobileDesc">LIVING GOLD mobile stacked logo (no background)</desc>
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

interface FooterLogoProps {
    className?: string;
    maxWidth?: string;
    style?: React.CSSProperties;
}

export function FooterLivingGold({ className = "", maxWidth = "1600px", style = {} }: FooterLogoProps) {
  return (
    <div
      className={cn("w-full flex justify-center items-end overflow-visible", className)}
      style={{ paddingTop: 24, paddingBottom: 32, ...style }}
    >
      <div style={{ width: "100%", maxWidth, overflow: "visible" }}>
        <LivingGoldLogo className="w-full h-auto" />
      </div>
    </div>
  );
}

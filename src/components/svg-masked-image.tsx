
import React from 'react';
import { cn } from '@/lib/utils';

type Shape = 'splash' | 'blob' | 'angle';

interface SvgMaskedImageProps {
  imageUrl: string;
  alt: string;
  shape?: Shape;
  className?: string;
}

const shapes = {
  splash: (
    <clipPath id="shape-splash">
      <path d="M72.5,2.4C102.3,10.2,118,46.1,120,79.1c2,33-10.8,63.1-34,79.5s-56.9,19.7-82.9,3.6C-2.9,146.1-9.3,106,1.4,73.9,12.1,41.8,42.7-5.4,72.5,2.4Z" />
    </clipPath>
  ),
  blob: (
    <clipPath id="shape-blob">
      <path d="M109,66.9c16.3,21.8,16.3,51,0,72.8s-43,21.8-59.3,0S7,117.8,23.3,96,66.3,23.3,82.6,45,92.7,45,109,66.9Z" />
    </clipPath>
  ),
  angle: (
     <clipPath id="shape-angle">
        <path d="M0,0 L120,0 L120,60 L60,120 L0,120 Z" />
    </clipPath>
  )
};

export function SvgMaskedImage({
  imageUrl,
  alt,
  shape = 'splash',
  className,
}: SvgMaskedImageProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={cn("w-full h-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>{shapes[shape]}</defs>
      <image
        href={imageUrl}
        x="0"
        y="0"
        width="128"
        height="128"
        clipPath={`url(#shape-${shape})`}
        preserveAspectRatio="xMidYMid slice"
      />
       <title>{alt}</title>
    </svg>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SunBanner } from '@/components/sun-banner';
import { useResponsive } from '@/hooks/use-responsive';

export default function Hero() {
  const { isMobile } = useResponsive();

  return (
    <section className={`relative w-full ${isMobile ? 'h-[550px]' : 'h-[650px]'} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0">
        <SunBanner />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
                FOR THOSE WHO SEEK
            </p>
            <h1 className={`font-headline ${isMobile ? 'text-5xl' : 'text-7xl'} font-bold leading-tight text-foreground mb-10 text-shadow-lg`}>
                RARE, UNUSUAL, AND EXQUISITE FINDS
            </h1>
            <Button asChild size="lg" showIcon>
              <Link href="/products/room-settings">
                Shop Living Gold Finds
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

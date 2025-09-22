
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SunBanner } from '@/components/sun-banner';
import { useResponsive } from '@/hooks/use-responsive';
import { Icons } from '@/components/icons';

export default function Hero() {
  const { isMobile } = useResponsive();

  return (
    <section className={`relative w-full ${isMobile ? 'h-svh' : 'h-[650px]'} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 ">
        <SunBanner />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto">
            <p className="text-lg font-bold tracking-widest uppercase text-primary mb-4 animate-fade-in-up">
                FOR THOSE WHO SEEK
            </p>
            <h1 className={`font-headline ${isMobile ? 'text-5xl' : 'text-7xl'} font-bold leading-tight text-foreground mb-10 text-shadow-lg`}>
                <span className="animated-word">RARE,</span>
                <span className="animated-word">UNUSUAL,</span>
                <span className="animated-word">AND EXQUISITE FINDS</span>
            </h1>
            <Button asChild size="lg" showIcon className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <Link href="/projects">
                Explore Our Projects
              </Link>
            </Button>
            {isMobile && (
              <div className="z-10 flex flex-col items-center gap-2 animate-bounce mt-16">
                  <span className="text-xs text-foreground font-light tracking-widest">SCROLL FOR MORE</span>
                  <Icons.chevronRight className="w-5 h-5 -rotate-90 transform text-foreground" />
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

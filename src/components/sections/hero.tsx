'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SunBanner } from '@/components/sun-banner';
import { useResponsive } from '@/hooks/use-responsive';
import { Icons } from '@/components/icons';

export default function Hero() {
  const { isMobile } = useResponsive();
  const aboutPageImage = "https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg";

  return (
    <section className={`relative w-full ${isMobile ? 'h-auto py-24' : 'h-[650px]'} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 ">
        <SunBanner />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="max-w-3xl text-center md:text-left">
                <p className="text-lg font-bold tracking-widest uppercase text-primary mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    FOR THOSE WHO SEEK
                </p>
                <h1 className={`font-headline ${isMobile ? 'text-5xl' : 'text-7xl'} font-bold leading-tight text-foreground mb-6 text-shadow-lg`}>
                    <span className="animated-word">RARE,</span>
                    <span className="animated-word">UNUSUAL,</span>
                    <span className="animated-word">& EXQUISITE FINDS</span>
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

            <div className={`relative ${isMobile ? 'hidden' : 'flex'} items-center justify-center`}>
                <div className="relative w-[450px] h-[450px] rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-4 shadow-2xl">
                     <Image
                        src={aboutPageImage}
                        alt="Dining room lit by a Living Gold chandelier"
                        fill
                        className="object-cover rounded-md"
                        priority
                        data-ai-hint="chandelier dining room"
                     />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/use-responsive';
import { AIConsultant } from '../ai-consultant';
import { Card, CardContent } from '../ui/card';

export default function TradesAndServices() {
  const { isMobile } = useResponsive();

  return (
    <section className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-12 md:gap-20 items-center`}>
          <div className={`${isMobile ? 'order-2 text-center' : 'order-1 text-left'}`}>
            <h2 className="text-base md:text-lg font-medium tracking-[0.2em] uppercase text-primary mb-6">
              FOR TRADE PROFESSIONALS
            </h2>
            <h3 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-6">
              Instant AI-Powered Recommendations
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground">
              Architects, designers, and developers—accelerate your creative process. Use our AI consultant to find the perfect lighting fixtures for your project based on style, room type, and lighting category.
            </p>
             <Card className="bg-background/70 backdrop-blur-sm">
                <CardContent className="p-0">
                    <AIConsultant />
                </CardContent>
            </Card>
            <div className="mt-8 text-center">
                 <Button asChild size="sm" variant="link">
                    <Link href="/design-studio">
                        Or, Explore Our Full Suite of Services
                    </Link>
                </Button>
            </div>
          </div>
          <div className={`relative w-full aspect-[4/5] rounded-lg overflow-hidden ${isMobile ? 'order-1' : 'order-2'}`}>
            <Image
              src="https://www.visualcomfort.com/media_1f08f2f154f0e09244ce92d51285bfa59a0838640.jpg"
              alt="An architect reviewing blueprints in a modern design office."
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="architect blueprints"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

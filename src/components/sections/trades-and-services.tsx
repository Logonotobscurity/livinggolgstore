
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/use-responsive';

export default function TradesAndServices() {
  const { isMobile } = useResponsive();

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-12 md:gap-20 items-center`}>
          <div className={`${isMobile ? 'order-2' : 'order-1'}`}>
            <h2 className="text-base md:text-lg font-medium tracking-[0.2em] uppercase text-primary mb-6">
              FOR TRADE PROFESSIONALS
            </h2>
            <h3 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-6">
              Partners in Craftsmanship
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground">
              We collaborate with architects, interior designers, and developers to bring ambitious visions to life. Our trade program offers exclusive access to our collections, dedicated support, and sourcing for technical materials like specialized wiring, conduit, and transformers.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-10 text-muted-foreground">
              Let us be your trusted partner in delivering exceptional quality and design for your next project.
            </p>
            <Button asChild size="lg" showIcon>
              <Link href="/inspiration-services">
                Explore Inspiration & Services
              </Link>
            </Button>
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

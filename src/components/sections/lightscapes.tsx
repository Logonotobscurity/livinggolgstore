
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
  CarouselProgress 
} from "@/components/ui/carousel";

export default function Lightscapes() {
  const lightscapeImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('lightscape-')
  );

  if (!lightscapeImages.length) return null;

  return (
    <section className="text-foreground py-20 md:py-0">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Static Text Content Column */}
          <div className="md:sticky md:top-0 md:h-screen md:flex md:items-center">
            <div className="max-w-md mx-auto text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Lightscapes
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-8 text-muted-foreground">
                The Outdoor collection is the result of a strong dialogue
                between environment and architecture. This new lighting concept
                conveys the harmony between elegant aesthetics and outdoor
                space, where the creations come to life in natural light.
              </p>
              <div className="flex justify-center md:justify-start">
                  <Button asChild size="lg" variant="outline" showIcon>
                    <Link href="/products/outdoor-lighting">
                      The Outdoor Collection
                    </Link>
                  </Button>
              </div>
            </div>
          </div>

          {/* Scrolling/Stacked Image Content Column */}
          <div>
            {/* Mobile View: Simple Vertical Stack */}
            <div className="md:hidden space-y-8 mt-12">
               {lightscapeImages.map((image) => (
                <div key={image.id} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    data-ai-hint={image.imageHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-white text-lg font-bold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Sticky Stacking Effect */}
            <div className="hidden md:block">
              {lightscapeImages.map((image, index) => (
                <div
                  key={image.id}
                  className="md:sticky w-full h-screen flex items-center justify-center"
                  style={{ top: `${index * 2}rem` }}
                >
                  <div
                    className="relative w-[85%] aspect-[4/3] rounded-lg overflow-hidden transition-transform duration-300 ease-in-out"
                    style={{ transform: `scale(${1 + index * 0.05})` }}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-white text-lg font-bold">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

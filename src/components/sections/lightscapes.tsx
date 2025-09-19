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
    <section className="bg-black text-white py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          <div className="max-w-md">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
              Lightscapes
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-300">
              The Outdoor collection is the result of a strong dialogue
              between environment and architecture. This new lighting concept
              conveys the harmony between elegant aesthetics and outdoor
              space, where the creations come to life in natural light.
            </p>
            <Button asChild size="lg" variant="outline" showIcon>
              <Link href="/products/outdoor-lighting">
                The Outdoor Collection
              </Link>
            </Button>
          </div>

          <div className="w-full">
            <Carousel
              opts={{
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {lightscapeImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xs mx-auto">
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselProgress />
              </div>
            </Carousel>
          </div>

        </div>
      </div>
    </section>
  );
}

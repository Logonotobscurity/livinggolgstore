
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function Lightscapes() {
  const lightscapeImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('lightscape-')
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const cards = Array.from(
        container.querySelectorAll('.lightscape-card')
      ) as HTMLElement[];

      let currentCard = 0;
      for (let i = 0; i < cards.length; i++) {
        if (scrollPosition >= cards[i].offsetTop) {
          currentCard = i;
        }
      }
      setActiveCard(currentCard);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!lightscapeImages.length) return null;

  return (
    <section className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div className="md:sticky top-32 h-fit">
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
          </div>

          <div ref={containerRef} className="grid grid-cols-1 gap-16">
            {lightscapeImages.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  'lightscape-card relative w-full aspect-[4/3] rounded-lg overflow-hidden transition-transform duration-500 ease-in-out',
                  {
                    'scale-100': activeCard === index,
                    'scale-90 opacity-70': activeCard !== index,
                  }
                )}
                style={{
                  transform:
                    activeCard > index
                      ? `translateY(-${(activeCard - index) * 2}rem) scale(${
                          1 - (activeCard - index) * 0.05
                        })`
                      : '',
                }}
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
                    <h3 className="text-white text-lg font-bold">{image.title}</h3>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

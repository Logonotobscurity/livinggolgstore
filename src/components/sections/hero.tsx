import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative w-full h-[75vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tight">
          Designing a Golden Age
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
          We craft bespoke interiors that blend timeless elegance with modern luxury, creating spaces that are not just lived in, but treasured.
        </p>
        <Button asChild size="lg" className="mt-8 transition-all duration-300 ease-in-out hover:brightness-110 active:scale-95">
          <Link href="#contact">
            Start Your Project <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

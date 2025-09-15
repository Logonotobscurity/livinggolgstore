import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative w-full h-[600px] flex items-center">
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
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl pl-28">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
                FOR THOSE WHO SEEK
            </p>
            <h1 className="font-headline text-7xl font-bold leading-tight text-white mb-10">
                RARE, UNUSUAL, AND EXQUISITE FINDS
            </h1>
            <Button asChild size="lg" className="h-auto bg-primary text-black font-semibold text-base py-3 px-8 rounded-full hover:bg-yellow-600 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-0.5">
              <Link href="#">
                Shop Living Gold Finds
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function Lightscapes() {
  const lightscapeImage = PlaceHolderImages.find(
    (img) => img.id === 'lightscape-outdoor'
  );

  if (!lightscapeImage) return null;

  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-0 sm:px-6">
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image
            src={lightscapeImage.imageUrl}
            alt={lightscapeImage.description}
            fill
            className="object-cover"
            sizes="100vw"
            data-ai-hint={lightscapeImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center md:justify-start">
            <div className="bg-black/50 backdrop-blur-sm text-white p-8 md:p-12 rounded-lg max-w-md md:ml-12 lg:ml-24 text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Lightscapes
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-8">
                The Outdoor collection is the result of a strong dialogue between
                environment and architecture. This new lighting concept conveys
                the harmony between elegant aesthetics and outdoor space, where
                the creations come to life in natural light.
              </p>
              <Button asChild size="lg" showIcon>
                <Link href="/products/outdoor-lighting">The Outdoor Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

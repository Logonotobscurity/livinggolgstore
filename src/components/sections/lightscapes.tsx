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
    <section className="bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-0 sm:px-6">
        <div className="grid md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 py-12 px-6 md:py-20 md:px-16 lg:px-24 text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
              Lightscapes
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The Outdoor collection is the result of a strong dialogue between
              environment and architecture. This new lighting concept conveys
              the harmony between elegant aesthetics and outdoor space, where
              the creations come to life in natural light.
            </p>
            <Button asChild size="lg" showIcon>
              <Link href="#">The Out Door Collection</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 relative w-full h-[400px] md:h-[600px]">
            <Image
              src={lightscapeImage.imageUrl}
              alt={lightscapeImage.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={lightscapeImage.imageHint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto max-w-none px-0">
        <div className="grid md:grid-cols-2 min-h-[600px]">
           <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 bg-secondary">
             <div className="max-w-md mx-auto">
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                    Lightscapes
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-300">
                    The Outdoor collection is the result of a strong dialogue between
                    environment and architecture. This new lighting concept conveys
                    the harmony between elegant aesthetics and outdoor space, where
                    the creations come to life in natural light.
                </p>
                <Button asChild size="lg" variant="outline" showIcon>
                    <Link href="/products/outdoor-lighting">The Outdoor Collection</Link>
                </Button>
             </div>
           </div>
           <div className="relative w-full min-h-[400px] md:min-h-0">
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

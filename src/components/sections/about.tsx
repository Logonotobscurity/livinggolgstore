import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-image');

  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto py-28 px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-headline text-4xl md:text-5xl tracking-tight">
              The Art of Living
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Living Gold, we believe that true luxury lies in the details. Our design philosophy is centered around creating harmonious spaces that reflect your personality and lifestyle. We source the finest materials and collaborate with skilled artisans to bring a vision of sophisticated comfort to life.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From initial concept to final installation, our dedicated team ensures a seamless and inspiring journey, transforming your house into a home with a golden touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function InstagramFeed() {
  const instaPosts = PlaceHolderImages.filter(img => img.id.startsWith('insta-'));

  return (
    <section id="portfolio" className="container mx-auto py-28 px-6">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl md:text-5xl tracking-tight">
          Our Inspirations
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Follow our journey and discover our latest work on Instagram <Link href="#" className="text-primary link-underline">@LIVINGGOLDINTERIORS</Link>.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instaPosts.map((post) => (
          <div key={post.id} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={post.imageUrl}
              alt={post.description}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={post.imageHint}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute inset-0 rounded-lg ring-4 ring-primary ring-inset opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function InstagramFeed() {
  const instaPosts = PlaceHolderImages.filter(img => img.id.startsWith('insta-'));

  return (
    <section id="portfolio" className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-primary mb-8">
            @LIVINGGOLDINTERIORS
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base leading-normal">
            Follow us on Instagram to be the first to see our latest finds, decorative accessories, design ideas and projects.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-7xl mx-auto">
          {instaPosts.slice(0, 8).map((post) => (
            <Link href="#" key={post.id} className="group relative aspect-square block rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.description}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={post.imageHint}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <Icons.instagramFeed className="text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

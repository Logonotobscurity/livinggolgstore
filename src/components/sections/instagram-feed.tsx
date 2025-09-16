import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

function InstagramIcon() {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="28"
      height="30"
      className="text-primary"
    >
      <g>
        <path
          id="instagram"
          d="M13.88 13.88c-1.04 1.04-2.72 1.04-3.76 0.01 0 0-.01-.01-.01-.01-1.04-1.04-1.04-2.72-0.01-3.76 0 0 .01-.01 .01-.01 1.04-1.04 2.72-1.04 3.76-0.01 0 0 .01.01 .01.01C14.83 11.13 14.74 12.78 13.88 13.88zM14.88 9.09c-.76-.77-1.8-1.2-2.88-1.19-2.26-.01-4.09 1.82-4.1 4.08 0 .01 0 .01 0 .02-.01 2.26 1.82 4.09 4.08 4.1.01 0 .01 0 .02 0c2.26.01 4.09-1.82 4.1-4.08 0-.01 0-.01 0-.02.01-1.09-.42-2.14-1.2-2.9L14.88 9.09zM16.88 7.09c-.38-.4-1.02-.41-1.41-.03s-.41 1.02-.03 1.41 1.02.41 1.41.03c.2-.19.31-.46.31-.73.04-.26-.04-.52-.21-.72L16.88 7.09zM12.8 5.44h1.1h1c.36.01.72.04 1.07.1.25.04.5.1.74.19.69.28 1.24.83 1.52 1.52.09.24.15.49.19.74.06.35.09.71.1 1.07 0 .42 0 .75 0 1s0 .61 0 1.1c0 .48 0 .75 0 .8 0 .08 0 .31 0 .8s0 .85 0 1.1s0 .58 0 1c-.01.36-.04.72-.1 1.07-.04.25-.1.5-.19.74-.28.69-.83 1.24-1.52 1.52-.24.09-.49.15-.74.19-.35.06-.71.09-1.07.1h-1h-3.79h-1c-1.47-.07-2.92-.61-4-1.72-1.08-1.1-1.62-2.55-1.52-4C5.48 9.31 5.51 8.37 5.57 8c.04-.25.1-.5.19-.74.28-.69.83-1.23 1.52-1.5C7.51 5.68 7.75 5.61 8 5.57c.35-.06.71-.09 1.07-.1h1h2.73V5.44zM19.94 8.7c.01-1.24-.45-2.44-1.29-3.35-.91-.84-2.11-1.3-3.35-1.29-0.61-.03-1.71-.05-3.3-.05s-2.69.02-3.3.05c-1.24-.01-2.44.46-3.35 1.3C4.51 6.26 4.05 7.46 4.06 8.7c-.04.61-.06 1.71-.06 3.3s.02 2.69.05 3.3c-.01 1.24.45 2.44 1.29 3.35.91.84 2.12 1.3 3.36 1.29.61.03 1.71.05 3.3.05s2.69-.02 3.3-.05c1.24.01 2.44-.45 3.35-1.29.84-.91 1.3-2.11 1.29-3.35C19.98 14.69 20 13.59 20 12S19.98 9.31 19.94 8.7z"
          style={{ fill: 'currentColor' }}
        ></path>
      </g>
    </svg>
  );
}

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
                <InstagramIcon />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  imageHint: string;
  alt: string;
  className?: string;
  animationDelay?: string;
}

export function CategoryCard({
  title,
  imageUrl,
  imageHint,
  alt,
  className,
  animationDelay,
}: CategoryCardProps) {
  return (
    <Link
      href="#"
      className={cn(
        'group product-card text-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] opacity-0 translate-y-10',
        className
      )}
      style={{ animation: `revealCard 0.8s cubic-bezier(0.4,0,0.2,1) forwards`, animationDelay }}
      tabIndex={0}
      role="button"
      aria-label={`Browse ${title} collection`}
    >
      <div className="product-frame w-full aspect-square border-3 border-gray-700/50 bg-transparent flex justify-center items-center mb-8 p-4 relative overflow-hidden backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-primary group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="inner-frame w-full h-full bg-gradient-to-br from-white to-neutral-100 flex justify-center items-center rounded-sm relative overflow-hidden shadow-inner">
          <Image
            src={imageUrl}
            alt={alt}
            width={150}
            height={150}
            className="product-image w-3/4 h-3/4 object-contain transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] filter drop-shadow-md group-hover:scale-105 group-hover:[transform:scale(1.05)_rotateY(5deg)] group-hover:drop-shadow-lg"
            data-ai-hint={imageHint}
          />
        </div>
      </div>
      <h3 className="category-label text-sm font-medium tracking-[0.15em] uppercase text-yellow-300 relative transition-all duration-300 ease-in-out group-hover:text-primary group-hover:-translate-y-0.5 group-hover:text-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
        {title}
        <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-10 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
      </h3>
    </Link>
  );
}

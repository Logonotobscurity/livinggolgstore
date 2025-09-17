import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface CategoryCardProps {
  category: ImagePlaceholder;
  className?: string;
  animationDelay?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function CategoryCard({
  category,
  className,
  animationDelay,
  imageClassName,
  priority,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        'product-card text-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]',
        className
      )}
      style={{
        animation: `revealCard 0.8s cubic-bezier(0.4,0,0.2,1) forwards`,
        animationDelay,
      }}
    >
      <Link
        href={`/products/${category.slug}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        tabIndex={0}
        role="button"
        aria-label={`Browse ${category.title} collection`}
      >
        <>
          <div className="product-frame w-full aspect-square border-3 border-gray-700/50 bg-transparent flex justify-center items-center mb-4 md:mb-8 p-2 md:p-4 relative overflow-hidden backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-primary group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] group-focus-visible:border-primary group-focus-visible:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="inner-frame w-full h-full bg-transparent flex justify-center items-center rounded-sm relative overflow-hidden">
              <Image
                src={category.imageUrl}
                alt={category.description}
                width={300}
                height={300}
                priority={priority}
                className={cn(
                  'product-image object-contain transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] filter drop-shadow-md group-hover:scale-105 group-hover:[transform:scale(1.05)_rotateY(5deg)] group-hover:drop-shadow-lg group-focus-visible:scale-105 group-focus-visible:[transform:scale(1.05)_rotateY(5deg)] group-focus-visible:drop-shadow-lg',
                  imageClassName ?? 'w-full h-full p-2 sm:p-6'
                )}
                data-ai-hint={category.imageHint}
              />
            </div>
          </div>
          <h3 className="font-headline text-base uppercase tracking-wider text-white h-10 flex items-center justify-center">
            {category.title}
          </h3>
        </>
      </Link>
    </div>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Icons } from './icons';
import { useWishlist } from '@/context/wishlist-context';
import ShareModal from './share-modal';
import { useToast } from '@/hooks/use-toast';
import { NewCtaButton } from './new-cta-button';

interface CategoryCardProps {
  product: ImagePlaceholder;
  className?: string;
  animationDelay?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function CategoryCard({
  product,
  className,
  animationDelay,
  imageClassName,
  priority,
}: CategoryCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const { toast } = useToast();

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wasInWishlist = isInWishlist(product.id);
    
    toggleWishlist({
      id: product.id,
      name: product.title || 'Product Name Not Available',
      sku: product.id.toUpperCase(),
      image: product.imageUrl,
      price: parseFloat(product.price || '0'),
      slug: product.slug,
    });

    toast({
      title: wasInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: product.title,
    });
  };
  
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareModalOpen(true);
  };
  
  const productUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/products/${product.slug}` 
    : '';

  return (
    <div
      className={cn(
        'product-card text-center transition-all duration-400 ease-in-out-quad [transform-style:preserve-3d]',
        className
      )}
      style={{
        animation: `revealCard 0.8s cubic-bezier(0.4,0,0.2,1) forwards`,
        animationDelay,
      }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        tabIndex={0}
        role="button"
        aria-label={`Browse ${product.title} collection`}
      >
        <>
          <div className="product-frame w-full aspect-square border-3 border-gray-700/50 bg-transparent flex justify-center items-center p-2 md:p-4 relative overflow-hidden backdrop-blur-sm transition-all duration-400 ease-in-out-quad group-hover:border-primary group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] group-focus-visible:border-primary group-focus-visible:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:-translate-y-2 group-hover:scale-105 group-focus-visible:-translate-y-2 group-focus-visible:scale-105">
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Add to wishlist" 
                  className="w-8 h-8 bg-black/50 hover:bg-black"
                  onClick={handleWishlistToggle}
                >
                    <Icons.heart className={cn("w-4 h-4", { "fill-current text-primary": isWishlisted })} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Share this product"
                  className="w-8 h-8 bg-black/50 hover:bg-black"
                  onClick={handleShareClick}
                >
                    <Icons.share className="w-4 h-4" />
                </Button>
            </div>
            <div className="inner-frame w-full h-full bg-transparent flex justify-center items-center rounded-sm relative overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.description}
                width={300}
                height={300}
                priority={priority}
                className={cn(
                  'product-image object-contain transition-all duration-400 ease-in-out-quad filter drop-shadow-md group-hover:[transform:scale(1.05)_rotateY(5deg)] group-hover:drop-shadow-lg group-focus-visible:scale-105 group-focus-visible:[transform:scale(1.05)_rotateY(5deg)] group-focus-visible:drop-shadow-lg',
                  imageClassName ?? 'w-full h-full p-2 sm:p-6'
                )}
                data-ai-hint={product.imageHint}
              />
            </div>
          </div>
          <h3 className="font-headline text-base uppercase tracking-wider text-foreground flex items-center justify-center">
            {product.title}
          </h3>
          <NewCtaButton>
              Shop now
          </NewCtaButton>
        </>
      </Link>
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        shareUrl={productUrl}
        shareTitle={product.title || 'Check out this product'} 
      />
    </div>
  );
}

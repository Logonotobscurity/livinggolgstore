
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { NewCtaButton } from './new-cta-button';

interface RelatedProductCardProps {
  product: ImagePlaceholder;
  className?: string;
}

export function RelatedProductCard({ product, className }: RelatedProductCardProps) {
  const formatPrice = (price?: string) => {
    if (!price) return null;
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) return price;
    return `Est. ₦${priceNumber.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  
  return (
    <div className={cn("text-left", className)}>
      <Link href={`/products/${product.slug}`} className="group block">
        <>
          <div className="w-full aspect-square bg-secondary p-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-muted rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={300}
              height={300}
              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-headline text-base uppercase tracking-wider text-foreground h-12 flex items-center justify-center">
              {product.title}
            </h3>
            {product.price && (
               <p className="text-sm text-muted-foreground mb-2">{formatPrice(product.price)}</p>
            )}
            <NewCtaButton>
              View Product
            </NewCtaButton>
          </div>
        </>
      </Link>
    </div>
  );
}

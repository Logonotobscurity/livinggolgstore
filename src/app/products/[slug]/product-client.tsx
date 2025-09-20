
'use client';

import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { RelatedProductCard } from '@/components/related-product-card';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import ShareModal from '@/components/share-modal';
import { useState } from 'react';
import { ProductSupport } from '@/components/product-support';
import { useToast } from '@/hooks/use-toast';

interface ProductClientProps {
    product: ImagePlaceholder;
    relatedProducts: ImagePlaceholder[];
}

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const { toast } = useToast();

  const formatPrice = (price?: string) => {
    if (!price) return 'Contact for price';
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) return 'Contact for price';
    return `Est. ₦${priceNumber.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title || 'Product Name Not Available',
      sku: product.id.toUpperCase(),
      image: product.imageUrl,
      price: parseFloat(product.price || '0'),
      slug: product.slug,
    });
    toast({
      title: 'Added to Cart',
      description: product.title,
    });
  };

  const handleWishlistToggle = () => {
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

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="w-full flex justify-center items-center p-4 sm:p-8 bg-secondary rounded-lg aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={500}
              height={500}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="md:py-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg md:text-xl mb-6 text-muted-foreground">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-primary">
                <Icons.star className="w-5 h-5 fill-current" />
                <Icons.star className="w-5 h-5 fill-current" />
                <Icons.star className="w-5 h-5 fill-current" />
                <Icons.star className="w-5 h-5 fill-current" />
                <Icons.star className="w-5 h-5 fill-muted-foreground/50" />
              </div>
              <span className="ml-3 text-sm text-muted-foreground">(12 Reviews)</span>
            </div>

            <p className="text-3xl md:text-4xl font-bold text-primary mb-8">{formatPrice(product.price)}</p>

            <div className="flex items-stretch gap-2 sm:gap-4 mb-8">
                <Button variant="destructive" size="lg" className="flex-grow" onClick={handleAddToCart} showIcon>Add to Cart</Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Add to wishlist" 
                  className="w-12 h-12"
                  onClick={handleWishlistToggle}
                >
                    <Icons.heart className={cn("w-6 h-6", { "fill-current text-primary": isWishlisted })} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Share this product"
                  className="w-12 h-12"
                  onClick={() => setShareModalOpen(true)}
                >
                    <Icons.share className="w-6 h-6" />
                </Button>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              An exquisite piece that combines timeless elegance with modern design. Perfect for creating a focal point in any room, this {product.title?.toLowerCase()} offers both functionality and unparalleled style. Crafted from the finest materials.
            </p>

             <div className="mt-8 text-sm text-muted-foreground space-y-1">
                <p><span className="font-semibold text-foreground">Category:</span> Lighting</p>
                <p><span className="font-semibold text-foreground">SKU:</span> {product.id.toUpperCase()}</p>
             </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-24" />

        <div className="mt-20 md:mt-24">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-left mb-12 uppercase">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((related) => (
                     <RelatedProductCard 
                       key={related.id} 
                       product={related}
                     />
                ))}
            </div>
        </div>

        <ProductSupport />

      </main>
      <div className="border-t border-primary/30" />
      <Footer />
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        shareUrl={typeof window !== 'undefined' ? window.location.href : ''} 
        shareTitle={product.title || 'Product Name Not Available'} 
      />
    </div>
  );
}

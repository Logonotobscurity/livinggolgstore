'use client';

import { useWishlist } from "@/context/wishlist-context";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useResponsive } from "@/hooks/use-responsive";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isMobile, isTablet } = useResponsive();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toggleWishlist(item); 
  };

  const formatPrice = (price: number) => {
    return `Est. ₦${price.toLocaleString('en-US')}`;
  }

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Your Wishlist' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-12 px-4">
          <h1 className={`mb-4 ${isMobile ? 'text-4xl' : 'text-5xl'}`}>Your Wishlist</h1>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl mb-8">Your wishlist is empty.</p>
                    <Button variant="outline" asChild>
                        <Link href="/">Discover Products</Link>
                    </Button>
                </div>
            ) : (
                <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} gap-8`}>
                    {wishlistItems.map(item => (
                        <div key={item.id} className="border border-gray-800 rounded-lg p-4 flex flex-col text-center group">
                            <div className="relative">
                                <Link href={`/products/${item.slug}`} className="w-full">
                                <div className="relative w-full aspect-square mb-4">
                                    <Image src={item.image} alt={item.name} fill className="object-contain rounded-md" />
                                </div>
                                <h3 className="font-headline text-base uppercase tracking-wider text-foreground h-12 flex items-center justify-center mb-2">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">SKU: {item.sku}</p>
                                <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
                                </Link>
                                <Button 
                                    variant="destructive" 
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => toggleWishlist(item)}
                                >
                                    <Icons.trash className="h-5 w-5" />
                                </Button>
                            </div>
                             <Button 
                                variant="outline" 
                                className="mt-4 w-full"
                                onClick={() => handleAddToCart(item)}
                              >
                                Add to Cart
                              </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </CmsLayout>
  );
}

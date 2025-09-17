
'use client';

import { useWishlist } from "@/context/wishlist-context";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  const formatPrice = (price: number) => {
    return `Est. ₦${price.toLocaleString('en-US')}`;
  }

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Your Wishlist' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16">
          <h1 className="mb-4 text-[50px]">Your Wishlist</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
            {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl mb-8">Your wishlist is empty.</p>
                    <Button variant="outline" asChild>
                        <Link href="/">Discover Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="border border-gray-800 rounded-lg p-4 flex flex-col items-center text-center relative group">
                            <Link href={`/products/${item.sku.toLowerCase()}`} className="w-full">
                              <div className="relative w-full aspect-square mb-4">
                                  <Image src={item.image} alt={item.name} fill className="object-contain rounded-md" />
                              </div>
                              <h3 className="font-bold h-12">{item.name}</h3>
                              <p className="text-sm text-gray-400 mb-2">SKU: {item.sku}</p>
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
                    ))}
                </div>
            )}
        </div>
      </div>
    </CmsLayout>
  );
}

    
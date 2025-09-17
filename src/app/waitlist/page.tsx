
'use client';

import { useWaitlist } from "@/context/waitlist-context";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function WaitlistPage() {
  const { waitlistItems, toggleWaitlist } = useWaitlist();

  const formatPrice = (price: number) => {
    if (isNaN(price)) return 'Contact for price';
    return `Est. ₦${price.toLocaleString('en-US')}`;
  }

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Your Waitlist' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16">
          <h1 className="mb-4 text-[50px]">Your Waitlist</h1>
          <p className="text-[16px] max-w-2xl mx-auto">
            You'll be notified when these items are back in stock.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
            {waitlistItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl mb-8">You are not on any waitlists.</p>
                    <Button variant="outline" asChild>
                        <Link href="/">Discover Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {waitlistItems.map(item => (
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
                                onClick={() => toggleWaitlist(item)}
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


'use client';

import { useCart } from "@/context/cart-context";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";
import { useResponsive } from "@/hooks/use-responsive";

type CartItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
};

export default function CartPage() {
  const { cartItems, updateItemQuantity, removeFromCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const { isMobile } = useResponsive();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleMoveToWishlist = (item: CartItem) => {
    toggleWishlist({
      id: item.id,
      name: item.name,
      sku: item.sku,
      image: item.image,
      price: item.price,
      slug: item.slug
    });
    removeFromCart(item.id);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Your Cart' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-12 px-4">
          <h1 className={`mb-4 ${isMobile ? 'text-4xl' : 'text-5xl'}`}>Your Quote Request</h1>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl mb-8">Your cart is empty.</p>
                    <Button variant="outline" asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            ) : (
                <>
                    <div className="space-y-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 items-start gap-4 sm:gap-6 border-b border-gray-700 pb-8">
                                <div className="sm:col-span-2">
                                    <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md bg-secondary p-2 w-full max-w-[120px] sm:max-w-full aspect-square object-contain" />
                                </div>
                                <div className="sm:col-span-6 flex flex-col justify-center h-full">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">SKU: {item.sku}</p>
                                    <div className="flex items-center mt-4 text-xs sm:text-sm">
                                      <button onClick={() => handleMoveToWishlist(item)} className="text-primary hover:underline">
                                        Move to Wishlist
                                      </button>
                                      <span className="mx-2 text-muted-foreground">|</span>
                                      <button onClick={() => removeFromCart(item.id)} className="text-destructive hover:underline">
                                          Remove
                                      </button>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-2 pt-4 mt-4 border-t border-gray-800 sm:border-none sm:pt-0 sm:mt-0 w-full">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                          <Icons.minus className="h-4 w-4" />
                                      </Button>
                                      <Input type="text" readOnly value={item.quantity} className="w-12 text-center bg-transparent" />
                                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                          <Icons.plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-right">
                        <div className="max-w-sm ml-auto space-y-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Items:</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Shipping</span>
                                <span>Contact us for details</span>
                            </div>
                        </div>

                        <div className={`mt-8 flex ${isMobile ? 'flex-col' : 'flex-row'} justify-end gap-4`}>
                            <Button variant="outline" asChild>
                                <Link href="/">Continue Shopping</Link>
                            </Button>
                            <Button variant="default" size="lg" asChild showIcon>
                               <Link href="/quote">Request Quote</Link>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    </CmsLayout>
  );
}

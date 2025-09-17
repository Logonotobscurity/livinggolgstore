
'use client';

import { useState } from "react";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
};

const initialCartItems: CartItem[] = [
  {
    id: "item-1",
    name: "Roll & Hill Modo 3 Sided Chandelier",
    sku: "CHANDELIERS-PENDANTS-1",
    image: "https://img.ydesigngroup.com/9JWOMRAM/at/nqmq8crfg7m5pgth8x42f/RollAndHill_Modo3SidedChandelier_BlackSmoke-188x188-site.png",
    price: 750000,
    quantity: 1,
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return `Est. ₦${price.toLocaleString('en-US')}`;
  }

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Your Cart' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16">
          <h1 className="mb-4 text-[50px]">Your Shopping Cart</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl mb-8">Your cart is empty.</p>
                    <Button variant="outline" asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="space-y-8">
                        {cartItems.map(item => (
                            <div key={item.id} className="grid grid-cols-12 items-center gap-4 border-b border-gray-700 pb-8">
                                <div className="col-span-2">
                                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md bg-secondary p-2" />
                                </div>
                                <div className="col-span-5">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input type="text" readOnly value={item.quantity} className="w-12 text-center bg-transparent" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="col-span-1 text-right">
                                    <p>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                                <div className="col-span-1 text-right">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => handleRemoveItem(item.id)}>
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coupon and Subtotal */}
                    <div className="mt-12 text-right">
                        <div className="max-w-sm ml-auto space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Shipping & Taxes</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="flex items-center gap-2 pt-4">
                                <Input placeholder="Coupon Code" className="bg-transparent" />
                                <Button variant="outline">Apply</Button>
                            </div>
                            <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/">Continue Shopping</Link>
                            </Button>
                            <Button variant="default" size="lg" showIcon>
                                Proceed to Checkout
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

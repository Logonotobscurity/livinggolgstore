
'use client';

import { useCart } from "@/context/cart-context";
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";
import { Separator } from "@/components/ui/separator";

export default function QuotePage() {
  const { cartItems, totalItemsCount } = useCart();

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Cart', href: '/cart' },
    { text: 'Request a Quote' }
  ];

  if (cartItems.length === 0) {
    return (
        <CmsLayout breadcrumb={breadcrumb}>
             <div className="text-center py-16 text-white">
                <h1 className="text-4xl font-headline mb-4">Your Cart is Empty</h1>
                <p className="text-xl mb-8">Add items to your cart to request a quote.</p>
                <Button variant="outline" asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        </CmsLayout>
    )
  }

  return (
    <CmsLayout breadcrumb={breadcrumb}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start max-w-6xl mx-auto px-4 text-white">
            <div className="order-2 md:order-1">
                <CheckoutForm />
            </div>
            <div className="order-1 md:order-2 space-y-8">
                 <h2 className="font-headline text-2xl font-bold text-white mb-6">
                    Order Summary ({totalItemsCount} items)
                </h2>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                     {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative">
                                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md bg-secondary p-2" />
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-base">{item.name}</h3>
                                <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Separator />
                 <div className="text-sm text-gray-400">
                    <p>Submitting this request will generate a pre-filled WhatsApp message. You will have a chance to review the message before sending.</p>
                    <p className="mt-4">A sales representative will contact you shortly after you send the message to provide a full quote including shipping and availability.</p>
                </div>
            </div>
        </div>
    </CmsLayout>
  );
}

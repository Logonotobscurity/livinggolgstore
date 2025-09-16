
import CmsLayout from "@/components/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
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
            {/* Cart Items */}
            <div className="space-y-8">
                 {/* Single Cart Item */}
                <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-700 pb-8">
                    <div className="col-span-2">
                        <Image src="https://img.ydesigngroup.com/9JWOMRAM/at/nqmq8crfg7m5pgth8x42f/RollAndHill_Modo3SidedChandelier_BlackSmoke-188x188-site.png" alt="Product Image" width={80} height={80} className="rounded-md bg-secondary p-2" />
                    </div>
                    <div className="col-span-5">
                        <h3 className="font-bold">Roll & Hill Modo 3 Sided Chandelier</h3>
                        <p className="text-sm text-gray-400">SKU: CHANDELIERS-PENDANTS-1</p>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input type="text" readOnly value="1" className="w-12 text-center bg-transparent" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="col-span-1 text-right">
                        <p>Est. ₦750,000</p>
                    </div>
                     <div className="col-span-1 text-right">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                 {/* End Single Cart Item */}
            </div>

            {/* Coupon and Subtotal */}
            <div className="mt-12 text-right">
                <div className="max-w-sm ml-auto space-y-4">
                     <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Est. ₦750,000</span>
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
                        <span>Est. ₦750,000</span>
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
        </div>
      </div>
    </CmsLayout>
  );
}

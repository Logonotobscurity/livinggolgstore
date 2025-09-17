
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LivingGoldLogo, LivingGoldLogoMobile } from "../logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const paymentIcons = PlaceHolderImages.filter(img => img.id.startsWith('payment-'));

  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-8">
      <div className="container mx-auto px-6">
        {/* Mobile Logo */}
        <div className="md:hidden mb-12">
            <LivingGoldLogoMobile className="h-24 w-auto mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16">
          
          {/* Desktop Logo */}
          <div className="hidden md:block md:col-span-4">
            <LivingGoldLogo className="h-auto w-full max-w-xs" />
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            <div className="sm:col-span-2 lg:col-span-1 max-w-sm">
              <h3 className="text-lg font-bold mb-6">
                Join our community and enjoy 10% off your first Living Gold order
              </h3>
              <form className="flex mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-secondary border-muted-foreground border-r-0 rounded-r-none flex-1 placeholder:text-gray-400"
                />
                <Button type="submit" size="icon" className="rounded-l-none bg-primary hover:bg-yellow-600">
                  <Icons.arrowRight className="h-5 w-5 text-black" />
                </Button>
              </form>
              <p className="text-xs text-gray-400">
                By subscribing, you confirm you have read and understood our{" "}
                <Link href="/privacy-policy" className="text-primary underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6">Customer Services</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-primary">Help Center & FAQs</Link></li>
                <li><Link href="#" className="hover:text-primary">Delivery & Returns</Link></li>
                <li><Link href="#" className="hover:text-primary">Store Locator</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-primary">GB | EN</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">About Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                 <li><Link href="/about" className="hover:text-primary">Our Story</Link></li>
                <li><Link href="#" className="hover:text-primary">Press Contact</Link></li>
                <li><Link href="#" className="hover:text-primary">Trade Program</Link></li>
                <li><Link href="#" className="hover:text-primary">Legal</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <p className="text-xs text-gray-400 order-2 md:order-1">
            &copy; {currentYear} Living Gold. All rights reserved.
          </p>
          <div className="flex items-center gap-4 order-1 md:order-2">
            {paymentIcons.map(icon => (
              <Image 
                key={icon.id}
                src={icon.imageUrl} 
                alt={icon.description} 
                width={32} 
                height={20}
                className="opacity-70 hover:opacity-100" 
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

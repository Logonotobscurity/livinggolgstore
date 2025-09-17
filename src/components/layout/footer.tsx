
import Link from "next/link";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LivingGoldLogo } from "../logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const paymentIcons = PlaceHolderImages.filter(img => img.id.startsWith('payment-'));

  return (
    <footer className="text-white pt-16 md:pt-24 pb-8">
      <div className="container mx-auto px-6">
        
        <div className="flex justify-center mb-16 md:mb-24">
            <LivingGoldLogo className="h-auto w-full max-w-lg" />
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


import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FooterLivingGold } from "../logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const paymentIcons = PlaceHolderImages.filter(img => img.id.startsWith('payment-'));

  return (
    <footer className="text-white pt-24 md:pt-24 pb-8">
      <div className="container mx-auto px-6">
        
        <FooterLivingGold className="w-full max-w-[1600px] mx-auto" />

        <div className="border-t border-primary/30 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 mt-16 md:mt-24">
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

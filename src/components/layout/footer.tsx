
'use client';

import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FooterLivingGold } from "../logo";
import { useResponsive } from "@/hooks/use-responsive";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const paymentIcons = PlaceHolderImages.filter(img => img.id.startsWith('payment-'));
  const { isMobile } = useResponsive();

  return (
    <footer className="text-white pt-24 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <FooterLivingGold className="w-full max-w-4xl mx-auto" />

        <p className="text-center max-w-xl mx-auto mt-8 text-gray-300 text-sm">
          Curators of exquisite lighting and decor from global artisans, bringing timeless elegance to Nigerian homes.
        </p>

        <div className={`border-t border-primary/30 pt-8 flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center ${isMobile ? 'text-center' : 'text-left'} gap-6 mt-16`}>
          <p className={`text-xs text-gray-400 ${isMobile ? 'order-2' : 'order-1'}`}>
            &copy; {currentYear} Living Gold. All rights reserved.
          </p>
          <div className={`flex items-center gap-4 ${isMobile ? 'order-1' : 'order-2'}`}>
            {paymentIcons.map(icon => (
              <Image 
                key={icon.id}
                src={icon.imageUrl} 
                alt={icon.description} 
                width={32} 
                height={20}
                className="opacity-70 hover:opacity-100 transition-opacity" 
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


'use client';

import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FooterLivingGold } from "../logo";
import { useResponsive } from "@/hooks/use-responsive";
import { sitemap } from "@/lib/sitemap";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const paymentIcons = PlaceHolderImages.filter(img => img.id.startsWith('payment-'));
  const { isMobile } = useResponsive();

  const shopLinks = sitemap.slice(0, 3);
  const companyLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Design Studio', href: '/design-studio' },
    { title: 'Contact Us', href: '/contact' },
  ];
  const customerServiceLinks = [
    { title: 'FAQs', href: '/contact' },
    { title: 'Shipping & Returns', href: '/contact' },
    { title: 'My Account', href: '/signup' },
  ];

  return (
    <footer className="text-white pt-24 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <FooterLivingGold className="w-full max-w-4xl mx-auto" />

        <p className="text-center max-w-xl mx-auto mt-8 text-gray-300 text-sm">
          Curators of exquisite lighting and decor from global artisans, bringing timeless elegance to Nigerian homes.
        </p>

        <div className="border-t border-primary/30 mt-16 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* Shop Links */}
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-bold text-primary mb-4">SHOP</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        {shopLinks.map(item => (
                            <li key={item.title}><Link href={item.href} className="hover:text-white">{item.title}</Link></li>
                        ))}
                         <li><Link href="/products/accessories" className="hover:text-white">Accessories</Link></li>
                         <li><Link href="/products/outdoor-lighting" className="hover:text-white">Outdoor</Link></li>
                         <li><Link href="/products/room-settings" className="hover:text-white">Room Settings</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="font-bold text-primary mb-4">OUR COMPANY</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                         {companyLinks.map(item => (
                            <li key={item.title}><Link href={item.href} className="hover:text-white">{item.title}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="font-bold text-primary mb-4">CUSTOMER SERVICE</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        {customerServiceLinks.map(item => (
                            <li key={item.title}><Link href={item.href} className="hover:text-white">{item.title}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <h3 className="font-bold text-primary mb-4">CONTACT US</h3>
                     <div className="text-sm text-gray-300 space-y-3">
                        <p>Living Gold Lighting,<br />Okpanam Road, Asaba,<br />Delta State, Nigeria</p>
                        <p>
                            <a href="tel:+2347011131333" className="hover:text-white">+234 701 113 1333</a><br/>
                            <a href="mailto:hello@livinggold.com" className="hover:text-white">hello@livinggold.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

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

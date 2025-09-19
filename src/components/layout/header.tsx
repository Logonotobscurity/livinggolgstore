'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileNavMenu from './mobile-nav-menu';
import { Icons } from '@/components/icons';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import NavMenu from './nav-menu';
import SearchModal from '../search-modal';
import { LivingGoldLogoMobile, LivingGoldWordmark } from '../logo';
import { useResponsive } from '@/hooks/use-responsive';

export default function Header() {
  const { totalItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistItemCount = wishlistItems.length;
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const { isMobile, isDesktop } = useResponsive();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black text-white">
        <div className="bg-secondary text-xs">
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center max-w-7xl ${isMobile ? 'justify-center' : 'justify-between'}`}>
            {!isMobile && (
              <p className="font-light">
                Explore one-of-a-kind items from around the world
              </p>
            )}
            <nav className="flex items-center space-x-4">
              <Link href="/about" className="link-underline transition-colors">
                About
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/inspiration-services" className="link-underline transition-colors">
                Inspiration & Services
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-b border-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center max-w-7xl">
            {isMobile && (
              <div className="flex items-center justify-start">
                <Sheet>
                  <SheetTrigger asChild>
                    <button aria-label="Open menu" className="p-2 -ml-2">
                      <Icons.menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-black w-3/4 p-0">
                    <MobileNavMenu />
                  </SheetContent>
                </Sheet>
              </div>
            )}

            <div className={`flex-1 ${isMobile ? 'text-center' : 'text-left'}`}>
              <Link href="/">
                {!isMobile ? (
                  <LivingGoldWordmark className="h-12 w-auto text-white" />
                ) : (
                  <LivingGoldLogoMobile className="h-16 w-auto mx-auto text-white" />
                )}
                <span className="sr-only">LIVING GOLD</span>
              </Link>
            </div>

            <div className={`flex items-center justify-end ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
              <button
                aria-label="Search"
                className="p-2 rounded-full hover:bg-accent"
                onClick={() => setSearchModalOpen(true)}
              >
                <Icons.search className="h-5 w-5" />
              </button>
              {!isMobile && (
                <>
                  <Link href="/contact" aria-label="Contact" className="p-2 rounded-full hover:bg-accent">
                    <Icons.mail className="h-5 w-5" />
                  </Link>
                  <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-accent relative">
                    <Icons.heart className="h-5 w-5" />
                    {wishlistItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        {wishlistItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              <Link href="/cart" aria-label="Shopping Cart" className="p-2 rounded-full hover:bg-accent block relative">
                <Icons.shoppingCart className="h-5 w-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </Link>
              {!isMobile && (
                <Link href="/signup" aria-label="Account" className="p-2 rounded-full hover:bg-accent">
                  <Icons.user className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="border-b border-primary/30">
            <div className="container mx-auto px-6 flex justify-center items-center h-14 relative max-w-7xl">
              <div className="flex-grow flex justify-center">
                <NavMenu />
              </div>
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}

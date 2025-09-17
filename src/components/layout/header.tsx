
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

export default function Header() {
  const { totalItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistItemCount = wishlistItems.length;
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black text-white">
        <div className="bg-secondary text-xs">
          <div className="container mx-auto px-6 h-10 flex justify-center md:justify-between items-center max-w-7xl">
            <p className="font-light hidden md:block">
              Explore one-of-a-kind items from around the world
            </p>
            <nav className="flex items-center space-x-4">
              <Link
                href="/about"
                className="link-underline transition-colors"
              >
                About
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href="/design-studio"
                className="link-underline transition-colors"
              >
                Design Studio
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-b border-primary/30">
          <div className="container mx-auto px-6 h-20 flex justify-between items-center max-w-7xl">
            <div className="flex items-center justify-start w-1/3 md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <button aria-label="Open menu" className="md:hidden p-2 -ml-2">
                    <Icons.menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black w-3/4 p-0">
                  <MobileNavMenu />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex-1 text-center md:text-left">
              <Link
                href="/"
                className="font-headline text-xl md:text-2xl font-bold tracking-[0.2em] uppercase"
              >
                LIVING GOLD
              </Link>
            </div>

            <div className="flex items-center justify-end space-x-1 md:space-x-2 w-1/3 md:w-auto">
              <button 
                aria-label="Search" 
                className="p-2 rounded-full hover:bg-accent"
                onClick={() => setSearchModalOpen(true)}
              >
                <Icons.search className="h-5 w-5" />
              </button>
              <Link
                  href="/contact"
                  aria-label="Contact"
                  className="p-2 rounded-full hover:bg-accent hidden md:block"
                >
                  <Icons.mail className="h-5 w-5" />
              </Link>
              <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="p-2 rounded-full hover:bg-accent hidden md:block relative"
                >
                  <Icons.heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
              </Link>
              <Link
                  href="/cart"
                  aria-label="Shopping Cart"
                  className="p-2 rounded-full hover:bg-accent block relative"
                >
                  <Icons.shoppingCart className="h-5 w-5" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItemsCount}
                    </span>
                  )}
              </Link>
              <Link href="/signup" aria-label="Account" className="p-2 rounded-full hover:bg-accent hidden md:block">
                <Icons.user className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block border-b border-primary/30">
          <div className="container mx-auto px-6 flex justify-center items-center h-14 relative max-w-7xl">
            <div className="flex-grow flex justify-center">
              <NavMenu />
            </div>
          </div>
        </div>
      </header>
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}


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
import { LivingGoldWordmark } from '../logo';
import { useResponsive } from '@/hooks/use-responsive';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  const { totalItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const wishlistItemCount = wishlistItems.length;
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 text-foreground backdrop-blur-sm">
        <div className="bg-secondary/50 text-sm">
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center max-w-7xl justify-center md:justify-between`}>
            {!isMobile && (
              <p className="font-light">
                Explore one-of-a-kind items from around the world
              </p>
            )}
            <div className="flex items-center gap-4">
              <nav className="flex items-center space-x-4">
                <Link href="/about" className="link-underline transition-colors">
                  About
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link href="/design-studio" className="link-underline transition-colors">
                  Design Studio
                </Link>
              </nav>
              {!isMobile && <ThemeToggle />}
            </div>
          </div>
        </div>
        <div className="border-b border-primary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center max-w-7xl">
            <div className="flex-1 flex justify-start items-center">
                {isMobile && (
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <button aria-label="Open menu" className="p-2 -ml-2 rounded-full focus-visible:ring-2 focus-visible:ring-ring">
                        <Icons.menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-transparent w-3/4 p-0">
                        <div className="relative h-full bg-background/95 backdrop-blur-sm">
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(201,169,97,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(201,169,97,0.08)_0%,_transparent_50%)]"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_rgba(201,169,97,0.02)_50%,_transparent_100%),linear-gradient(0deg,_rgba(0,0,0,0.1)_0%,_transparent_30%)] pointer-events-none"></div>
                            <div className="relative h-full">
                                <MobileNavMenu 
                                    onSearchClick={() => {
                                        setMobileMenuOpen(false);
                                        setSearchModalOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                )}
            </div>

            <div className={`flex-1 flex justify-center`}>
              <Link href="/" aria-label="LIVING GOLD Home">
                <LivingGoldWordmark className="h-9 w-auto" />
                <span className="sr-only">LIVING GOLD</span>
              </Link>
            </div>

            <div className={`flex-1 flex items-center justify-end ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
              {!isMobile && (
                <>
                  <button
                    aria-label="Search"
                    className="p-2 rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setSearchModalOpen(true)}
                  >
                    <Icons.search className="h-5 w-5" />
                  </button>
                  <Link href="/contact" aria-label="Contact" className="p-2 rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                    <Icons.mail className="h-5 w-5" />
                  </Link>
                  <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-full hover:bg-accent relative focus-visible:ring-2 focus-visible:ring-ring">
                    <Icons.heart className="h-5 w-5" />
                    {wishlistItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center" aria-label={`${wishlistItemCount} items in wishlist`}>
                        {wishlistItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              <Link href="/cart" aria-label="Quote Cart" className="p-2 rounded-full hover:bg-accent block relative focus-visible:ring-2 focus-visible:ring-ring">
                <Icons.shoppingCart className="h-5 w-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center" aria-label={`${totalItemsCount} items in cart`}>
                    {totalItemsCount}
                  </span>
                )}
              </Link>
              {!isMobile && (
                <Link href="/signup" aria-label="Account" className="p-2 rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                  <Icons.user className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="border-b border-primary/30">
            <div className="container mx-auto px-6 flex justify-center items-center relative max-w-7xl">
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

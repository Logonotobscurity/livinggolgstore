import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavMenu from './nav-menu';
import MobileNavMenu from './mobile-nav-menu';
import { Icons } from '@/components/icons';
import { NewMenuIcon } from '../new-menu-icon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="bg-secondary text-xs">
        <div className="container mx-auto px-6 h-10 flex justify-center md:justify-between items-center max-w-7xl">
          <p className="font-light hidden md:block">
            Explore one-of-a-kind items from around the world
          </p>
          <nav className="flex items-center space-x-4">
            <Link
              href="/about"
              className="link-underline hover:text-primary transition-colors"
            >
              About
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/design-studio"
              className="link-underline hover:text-primary transition-colors"
            >
              Design Studio
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/contact"
              className="link-underline hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-b border-primary/30">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center max-w-7xl">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open menu" className="menu-icon-wrapper">
                  <NewMenuIcon />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black w-3/4 p-0">
                <MobileNavMenu />
              </SheetContent>
            </Sheet>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto">
            <Link
              href="/"
              className="font-headline text-xl md:text-2xl font-bold tracking-[0.2em]"
            >
              LIVING GOLD
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button aria-label="Search" className="hidden sm:inline-flex p-2 rounded-full hover:bg-accent transition-colors">
              <Icons.search className="h-6 w-6" />
            </button>
            <div className="relative">
              <button aria-label="Cart" className="p-2 rounded-full hover:bg-accent transition-colors">
                <Icons.shoppingCart className="h-6 w-6" />
              </button>
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-b border-primary/30">
        <div className="container mx-auto px-6 flex justify-center items-center h-14 relative max-w-7xl">
          <div className="flex-grow flex justify-center">
            <NavMenu />
          </div>
          <div className="absolute right-6">
             <button aria-label="Account" className="p-2 rounded-full hover:bg-accent transition-colors">
              <Icons.user className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

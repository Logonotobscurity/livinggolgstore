import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavMenu from './nav-menu';
import MobileNavMenu from './mobile-nav-menu';
import { Icons } from '@/components/icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="bg-secondary text-xs">
        <div className="container mx-auto px-6 h-10 flex justify-center md:justify-between items-center max-w-7xl">
          <p className="font-light hidden md:block">
            Explore one-of-a-kind items from around the world
          </p>
          <nav className="flex items-center space-x-2">
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/design-studio"
              className="hover:text-primary transition-colors"
            >
              Design Studio
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-b border-secondary">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center max-w-7xl">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Icons.menu className="h-6 w-6" />
                </Button>
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
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:inline-flex">
              <Icons.search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <Icons.user className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <Icons.shoppingCart className="h-6 w-6" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex justify-center items-center h-14">
        <NavMenu />
      </nav>
    </header>
  );
}

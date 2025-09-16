import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const navLinks = [
    { href: '/products/chandeliers-pendants', label: 'Chandeliers & Pendants' },
    { href: '/products/table-lamps-portable-lights', label: 'Table Lamps & Portable Lights' },
    { href: '/products/wall-sconces-vanity-lights', label: 'Wall Sconces & Vanity Lights' },
    { href: '/products/outdoor-lighting', label: 'Outdoor Lighting' },
    { href: '/products/ceiling-fans-with-lights', label: 'Ceiling Fans with Lights' },
    { href: '/products/floor-lamps', label: 'Floor Lamps' },
    { href: '/products/linear-suspension', label: 'Linear Suspension' },
    { href: '/products/recessed-track-lighting', label: 'Recessed/Track Lighting' },
    { href: '/products/specialty-lighting', label: 'Specialty Lighting' },
    { href: '/products/room-settings', label: 'Room Settings', className: 'text-primary' },
  ];

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
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black w-3/4 p-6">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 pt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors ${
                        link.className || ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
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
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex justify-center items-center h-14">
        <ul className="flex flex-wrap justify-center space-x-4 lg:space-x-6">
          {navLinks.map((link) => (
             <li key={link.label}>
                <Link 
                    href={link.href} 
                    className={`text-xs lg:text-[11px] font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${link.className || ''}`}
                >
                    {link.label}
                </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

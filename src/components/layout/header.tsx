import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, User, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="bg-secondary text-xs">
        <div className="container mx-auto px-6 h-10 flex justify-between items-center max-w-7xl">
          <p className="font-light">Explore one-of-a-kind items from around the world</p>
          <nav className="flex items-center space-x-2">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span className="text-gray-500">|</span>
            <Link href="/design-studio" className="hover:text-primary transition-colors">Design Studio</Link>
            <span className="text-gray-500">|</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </div>

      <div className="border-b border-secondary">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center max-w-7xl">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="font-headline text-2xl font-bold tracking-[0.2em]">
              LIVING GOLD
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="h-auto px-4 py-2 text-sm rounded-full border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300">
              Join Our Trade Program
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex justify-center items-center h-14">
        <ul className="flex space-x-10">
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">LIVING GOLD FINDS</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">FURNISHINGS</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">LIGHTING</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">TABLETOP</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">WALL DECOR</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">ACCESSORIES</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">CANDLELIGHT & APOTHECARY</Link></li>
          <li><Link href="#" className="text-sm font-medium tracking-widest uppercase text-red-500 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">SALE</Link></li>
        </ul>
      </nav>
    </header>
  );
}

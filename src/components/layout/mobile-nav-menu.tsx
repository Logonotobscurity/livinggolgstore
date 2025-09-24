
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { sitemap } from '@/lib/sitemap';
import type { NavItem } from '@/lib/sitemap';
import { Icons } from '../icons';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';

interface MobileNavMenuProps {
    onSearchClick: () => void;
}

function renderNavItem(item: NavItem) {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title.toLowerCase()} className="border-primary/30">
                <AccordionTrigger className="text-lg font-medium tracking-wider uppercase">{item.title}</AccordionTrigger>
                <AccordionContent className="pl-4">
                    <ul className="space-y-4 mt-2">
                        {item.items.map((subItem) => (
                            <li key={subItem.title}>
                                <Link
                                    href={subItem.href}
                                    className="flex items-center text-base hover:text-primary rounded-md focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {subItem.icon && <subItem.icon className="h-4 w-4 mr-3" />}
                                    {subItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        );
    }
    
    return (
        <Link 
            key={item.title} 
            href={item.href} 
            className="block text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors py-4 border-b border-primary/30 rounded-md focus-visible:ring-2 focus-visible:ring-ring"
        >
            {item.title}
        </Link>
    );
}


export default function MobileNavMenu({ onSearchClick }: MobileNavMenuProps) {
    return (
        <>
            <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
                <div className="flex-grow space-y-2 p-6 pt-10 overflow-y-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {sitemap.filter(item => !!item.items).map(renderNavItem)}
                    </Accordion>
                    {sitemap.filter(item => !item.items).map(renderNavItem)}
                </div>
                <Separator className="my-4 bg-primary/30" />
                 <div className="p-6 pt-0 space-y-4">
                    <Button variant="ghost" onClick={onSearchClick} className="flex items-center justify-start text-lg p-0 h-auto hover:text-primary rounded-md focus-visible:ring-2 focus-visible:ring-ring" aria-label="Search">
                        <Icons.search className="h-5 w-5 mr-4" />
                        <span>Search</span>
                    </Button>
                    <Link href="/wishlist" className="flex items-center text-lg hover:text-primary rounded-md focus-visible:ring-2 focus-visible:ring-ring" aria-label="Wishlist">
                        <Icons.heart className="h-5 w-5 mr-4" />
                        <span>Wishlist</span>
                    </Link>
                    <Link href="/contact" className="flex items-center text-lg hover:text-primary rounded-md focus-visible:ring-2 focus-visible:ring-ring" aria-label="Contact">
                        <Icons.mail className="h-5 w-5 mr-4" />
                        <span>Contact</span>
                    </Link>
                    <Link href="/signup" className="flex items-center text-lg hover:text-primary rounded-md focus-visible:ring-2 focus-visible:ring-ring" aria-label="Sign Up">
                        <Icons.user className="h-5 w-5 mr-4" />
                        <span>Sign Up</span>
                    </Link>
                    <div className="flex items-center justify-between text-lg">
                        <div className="flex items-center">
                            <Icons.sun className="h-5 w-5 mr-4" />
                            <span>Theme</span>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </>
    );
}

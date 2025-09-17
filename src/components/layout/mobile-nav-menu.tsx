
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

function renderNavItem(item: NavItem) {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title.toLowerCase()}>
                <AccordionTrigger className="text-lg font-medium tracking-wider uppercase">{item.title}</AccordionTrigger>
                <AccordionContent className="pl-4">
                    <ul className="space-y-4 mt-2">
                        {item.items.map((subItem) => (
                            <li key={subItem.title}>
                                <Link
                                    href={subItem.href}
                                    className="flex items-center text-base hover:text-primary"
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
            className="block text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors py-4 border-b border-gray-800"
        >
            {item.title}
        </Link>
    );
}


export default function MobileNavMenu() {
    return (
        <>
            <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 p-6 pt-10">
                <Accordion type="single" collapsible className="w-full">
                    {sitemap.filter(item => !!item.items).map(renderNavItem)}
                </Accordion>
                {sitemap.filter(item => !item.items).map(renderNavItem)}
            </div>
        </>
    );
}

    
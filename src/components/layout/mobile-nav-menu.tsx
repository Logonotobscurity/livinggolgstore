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
import { Icons } from '@/components/icons';

const ceilingLights = [
    { title: 'Chandeliers', href: '/products/chandeliers-pendants', icon: Icons.lightbulb },
    { title: 'Pendant Lights', href: '/products/chandeliers-pendants', icon: Icons.lightbulb },
    { title: 'Flush & Semi-Flushmounts', href: '/products/ceiling-lights', icon: Icons.lampCeiling },
    { title: 'Linear Suspension', href: '/products/linear-suspension', icon: Icons.lightbulb },
    { title: 'Recessed Lighting', href: '/products/recessed-track-lighting', icon: Icons.lightbulb },
    { title: 'Track & Monorail', href: '/products/recessed-track-lighting', icon: Icons.lightbulb },
];
  
const wallLights = [
    { title: 'Wall Sconces', href: '/products/wall-sconces-vanity-lights', icon: Icons.lampWallUp },
    { title: 'Bath & Vanity Lights', href: '/products/wall-sconces-vanity-lights', icon: Icons.lampWallUp },
    { title: 'Picture Lights', href: '/products/specialty-lighting', icon: Icons.lampWallUp },
    { title: 'Undercabinet Lights', href: '/products/specialty-lighting', icon: Icons.lampWallUp },
    { title: 'Lighted Mirrors', href: '/products/specialty-lighting', icon: Icons.lampWallUp },
];

const lamps = [
    { title: 'Floor Lamps', href: '/products/floor-lamps', icon: Icons.lamp },
    { title: 'Table Lamps', href: '/products/table-lamps-portable-lights', icon: Icons.lamp },
    { title: 'Desk Lamps', href: '/products/table-lamps-portable-lights', icon: Icons.lamp },
    { title: 'Cordless Lamps', href: '/products/table-lamps-portable-lights', icon: Icons.lamp },
];

export default function MobileNavMenu() {
    return (
        <>
        <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-2 p-6 pt-10">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ceiling">
                    <AccordionTrigger className="text-lg font-medium tracking-wider uppercase">Ceiling Lights</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <ul className="space-y-4 mt-2">
                            {ceilingLights.map((item) => (
                                <li key={item.title}><Link href={item.href} className="flex items-center text-base hover:text-primary"><item.icon className="h-4 w-4 mr-3" />{item.title}</Link></li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="wall">
                    <AccordionTrigger className="text-lg font-medium tracking-wider uppercase">Wall Lights</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <ul className="space-y-4 mt-2">
                            {wallLights.map((item) => (
                                <li key={item.title}><Link href={item.href} className="flex items-center text-base hover:text-primary"><item.icon className="h-4 w-4 mr-3" />{item.title}</Link></li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="lamps">
                    <AccordionTrigger className="text-lg font-medium tracking-wider uppercase">Lamps</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <ul className="space-y-4 mt-2">
                            {lamps.map((item) => (
                                <li key={item.title}><Link href={item.href} className="flex items-center text-base hover:text-primary"><item.icon className="h-4 w-4 mr-3" />{item.title}</Link></li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
             <Link href="/products/accessories" className="text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors py-4">
                Accessories
            </Link>
             <Link href="/products/outdoor-lighting" className="text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors py-4">
                Outdoor
            </Link>
             <Link href="/products/room-settings" className="text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors py-4">
                Room
            </Link>
        </div>
        </>
    )
}

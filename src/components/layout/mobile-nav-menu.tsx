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
import {
    Lightbulb,
    Lamp,
    LampCeiling,
    LampWallUp,
  } from 'lucide-react';

const ceilingLights = [
    { title: 'Chandeliers', href: '/products/chandeliers-pendants', icon: Lightbulb },
    { title: 'Pendant Lights', href: '/products/chandeliers-pendants', icon: Lightbulb },
    { title: 'Flush & Semi-Flushmounts', href: '/products/ceiling-lights', icon: LampCeiling },
    { title: 'Linear Suspension', href: '/products/linear-suspension', icon: Lightbulb },
    { title: 'Recessed Lighting', href: '/products/recessed-track-lighting', icon: Lightbulb },
    { title: 'Track & Monorail', href: '/products/recessed-track-lighting', icon: Lightbulb },
];
  
const wallLights = [
    { title: 'Wall Sconces', href: '/products/wall-sconces-vanity-lights', icon: LampWallUp },
    { title: 'Bath & Vanity Lights', href: '/products/wall-sconces-vanity-lights', icon: LampWallUp },
    { title: 'Picture Lights', href: '/products/specialty-lighting', icon: LampWallUp },
    { title: 'Undercabinet Lights', href: '/products/specialty-lighting', icon: LampWallUp },
    { title: 'Lighted Mirrors', href: '/products/specialty-lighting', icon: LampWallUp },
];

const lamps = [
    { title: 'Floor Lamps', href: '/products/floor-lamps', icon: Lamp },
    { title: 'Table Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
    { title: 'Desk Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
    { title: 'Cordless Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
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

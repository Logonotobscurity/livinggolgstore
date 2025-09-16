'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Lightbulb,
  Lamp,
  LampCeiling,
  LampWallUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ceilingLights: { title: string; href: string; icon: React.ElementType }[] =
  [
    {
      title: 'Chandeliers',
      href: '/products/chandeliers-pendants',
      icon: Lightbulb,
    },
    {
      title: 'Pendant Lights',
      href: '/products/chandeliers-pendants',
      icon: Lightbulb,
    },
    {
      title: 'Flush & Semi-Flushmounts',
      href: '/products/ceiling-lights',
      icon: LampCeiling,
    },
    {
      title: 'Linear Suspension',
      href: '/products/linear-suspension',
      icon: Lightbulb,
    },
    {
      title: 'Recessed Lighting',
      href: '/products/recessed-track-lighting',
      icon: Lightbulb,
    },
    {
      title: 'Track & Monorail',
      href: '/products/recessed-track-lighting',
      icon: Lightbulb,
    },
  ];

const wallLights: { title: string; href: string; icon: React.ElementType }[] = [
  {
    title: 'Wall Sconces',
    href: '/products/wall-sconces-vanity-lights',
    icon: LampWallUp,
  },
  {
    title: 'Bath & Vanity Lights',
    href: '/products/wall-sconces-vanity-lights',
    icon: LampWallUp,
  },
  { title: 'Picture Lights', href: '/products/specialty-lighting', icon: LampWallUp },
  {
    title: 'Undercabinet Lights',
    href: '/products/specialty-lighting',
    icon: LampWallUp,
  },
  { title: 'Lighted Mirrors', href: '/products/specialty-lighting', icon: LampWallUp },
];

const lamps: { title: string; href: string; icon: React.ElementType }[] = [
  { title: 'Floor Lamps', href: '/products/floor-lamps', icon: Lamp },
  { title: 'Table Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
  { title: 'Desk Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
  { title: 'Cordless Lamps', href: '/products/table-lamps-portable-lights', icon: Lamp },
];

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Ceiling Lights</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {ceilingLights.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  <component.icon className="h-4 w-4 mr-2" />
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Wall Lights</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {wallLights.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  <component.icon className="h-4 w-4 mr-2" />
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Lamps</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {lamps.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  <component.icon className="h-4 w-4 mr-2" />
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products/accessories" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Accessories
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <Link href="/products/outdoor-lighting" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Outdoor
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <Link href="/products/room-settings" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Room
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {children} {title}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

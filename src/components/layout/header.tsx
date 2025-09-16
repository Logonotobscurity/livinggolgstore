import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, User, ShoppingCart, Menu, ChevronDown, Lightbulb, Lamp, WallLamp, CeilingLight, Component } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  {
    title: "Ceiling Lights",
    href: "/products/lighting",
    icon: CeilingLight,
    sublinks: [
      { title: "Chandeliers", href: "/products/chandeliers-pendants", description: "Statement pieces for any room.", icon: Lightbulb },
      { title: "Pendant Lights", href: "/products/chandeliers-pendants", description: "Focused light, elegant form.", icon: Lightbulb },
      { title: "Flush & Semi-Flushmounts", href: "/products/ceiling-fans-with-lights", description: "For rooms with lower ceilings.", icon: Lightbulb },
      { title: "Linear Suspension", href: "/products/linear-suspension", description: "Modern, sleek, and stylish.", icon: Lightbulb },
      { title: "Recessed Lighting", href: "/products/recessed-track-lighting", description: "Clean, built-in illumination.", icon: Lightbulb },
      { title: "Track & Monorail", href: "/products/recessed-track-lighting", description: "Flexible and adjustable lighting.", icon: Lightbulb },
    ]
  },
  {
    title: "Wall Lights",
    href: "/products/wall-sconces-vanity-lights",
    icon: WallLamp,
    sublinks: [
      { title: "Wall Sconces", href: "/products/wall-sconces-vanity-lights", description: "Accent and ambient lighting.", icon: Lightbulb },
      { title: "Bath & Vanity Lights", href: "/products/wall-sconces-vanity-lights", description: "Perfect for grooming and makeup.", icon: Lightbulb },
      { title: "Picture Lights", href: "/products/specialty-lighting", description: "Highlight your favorite artwork.", icon: Lightbulb },
      { title: "Undercabinet Lights", href: "/products/specialty-lighting", description: "Task lighting for your kitchen.", icon: Lightbulb },
      { title: "Lighted Mirrors", href: "/products/specialty-lighting", description: "Combine form and function.", icon: Lightbulb },
    ]
  },
  {
    title: "Lamps",
    href: "/products/table-lamps-portable-lights",
    icon: Lamp,
    sublinks: [
      { title: "Floor Lamps", href: "/products/floor-lamps", description: "Versatile and stylish.", icon: Lightbulb },
      { title: "Table Lamps", href: "/products/table-lamps-portable-lights", description: "For work and reading.", icon: Lightbulb },
      { title: "Desk Lamps", href: "/products/table-lamps-portable-lights", description: "Focused light for your workspace.", icon: Lightbulb },
      { title: "Cordless Lamps", href: "/products/table-lamps-portable-lights", description: "Portable and convenient.", icon: Lightbulb },
    ]
  },
  { title: "Accessories", href: "/products/accessories" },
  { title: "Outdoor", href: "/products/outdoor-lighting" },
  { title: "Room", href: "/products/room-settings" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-2">
            <Icon className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-6">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


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
                      key={link.title}
                      href={link.href ?? '#'}
                      className={`text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors`}
                    >
                      {link.title}
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
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(link => (
              <NavigationMenuItem key={link.title}>
                {link.sublinks ? (
                  <>
                    <NavigationMenuTrigger>
                      {link.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href={link.href}
                            >
                              <link.icon className="h-6 w-6 text-primary" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {link.title}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Explore all {link.title.toLowerCase()}.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        {link.sublinks.map(sublink => (
                          <ListItem key={sublink.title} href={sublink.href} title={sublink.title} icon={sublink.icon}>
                            {sublink.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={link.href!} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}

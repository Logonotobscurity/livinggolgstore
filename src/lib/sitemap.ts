
import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: NavItem[];
}

export const sitemap: NavItem[] = [
  {
    title: "Chandeliers & Pendants",
    href: "/products/chandeliers-pendants",
  },
  {
    title: "Lighting",
    href: "/products/ceiling-lights",
    items: [
      {
        title: "Ceiling Fittings",
        href: "/products/ceiling-lights",
        icon: Icons.lampCeiling,
      },
      {
        title: "Linear Suspension",
        href: "/products/linear-suspension",
        icon: Icons.lampCeiling,
      },
    ],
  },
  {
    title: "Lamps",
    href: "/products/lamps",
    items: [
      { 
        title: "Table & Portable Lights", 
        href: "/products/lamps", 
        icon: Icons.lamp,
        description: "Versatile lamps for any surface." 
      },
      { 
        title: "Floor Lamps", 
        href: "/products/lamps", 
        icon: Icons.lamp,
        description: "Elegant floor-standing lights." 
      },
    ]
  },
  {
    title: "Accessories",
    href: "/products/accessories",
    items: [
      {
        title: "Conduit material",
        href: "/products/accessories",
        icon: Icons.lightbulb,
        description: "Piping, Gum",
      },
      {
        title: "Casting wiring",
        href: "/products/accessories",
        icon: Icons.lightbulb,
        description: "Conduit & surface wire",
      },
    ],
  },
  {
    title: "Outdoor Lighting",
    href: "/products/outdoor-lighting",
  },
  {
    title: "Architectural Lighting",
    href: "/products/architectural-lighting",
  },
  {
    title: "Rooms",
    href: "/products/room-settings",
  },
  {
    title: "Design Studio",
    href: "/design-studio",
  },
];

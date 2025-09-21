
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
    title: "Lighting",
    href: "/products/ceiling-lights",
    items: [
       {
        title: "Chandeliers & Pendants",
        href: "/products/chandeliers-pendants",
        icon: Icons.lampCeiling,
      },
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
      {
        title: "Wall Lights",
        href: "/products/wall-sconces-vanity-lights",
        icon: Icons.lampWallUp,
      },
       {
        title: "Outdoor Lighting",
        href: "/products/outdoor-lighting",
        icon: Icons.lightbulb,
      },
      {
        title: "Architectural Lighting",
        href: "/products/architectural-lighting",
        icon: Icons.lightbulb,
      },
    ],
  },
  {
    title: "Lamps",
    href: "/products/lamps",
    icon: Icons.lamp,
    items: [
      { 
        title: "Table & Portable Lights", 
        href: "/products/lamps", 
        description: "Versatile lamps for any surface." 
      },
      { 
        title: "Floor Lamps", 
        href: "/products/lamps", 
        description: "Elegant floor-standing lights." 
      },
    ]
  },
  {
    title: "Accessories",
    href: "/products/accessories",
    icon: Icons.lightbulb,
    items: [
      {
        title: "Conduit material",
        href: "/products/accessories",
        description: "Piping, Gum",
      },
      {
        title: "Casting wiring",
        href: "/products/accessories",
        description: "Conduit & surface wire",
      },
    ],
  },
  {
    title: "Design Studio",
    href: "/design-studio",
  },
  {
    title: "Projects",
    href: "/projects",
  },
];

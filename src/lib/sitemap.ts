
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
        title: "Downrods",
        href: "/products/accessories",
        description: "Extend your ceiling fans.",
      },
      {
        title: "Remotes & Controls",
        href: "/products/accessories",
        description: "Control your lighting with ease.",
      },
      {
        title: "LED Bulbs",
        href: "/products/architectural-lighting",
        description: "Energy-efficient and stylish bulbs.",
      },
      {
        title: "Dimmers & Outlets",
        href: "/products/architectural-lighting",
        description: "Complete your electrical setup.",
      },
      {
        title: "Exhaust Fans",
        href: "/products/accessories",
        description: "For bathrooms and utility rooms.",
      },
      {
        title: "See All Accessories",
        href: "/products/accessories",
        description: "Browse our full range.",
      },
    ],
  },
  {
    title: "Design Studio",
    href: "/inspiration-services",
  },
  {
    title: "Projects",
    href: "/projects",
  },
];

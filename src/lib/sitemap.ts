
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
    href: "/products/lighting",
    items: [
       {
        title: "Chandeliers & Pendants",
        href: "/products/chandeliers-pendants",
        icon: Icons.lampCeiling,
      },
      {
        title: "Ceiling Fittings",
        href: "/products/lighting",
        icon: Icons.lampCeiling,
      },
      {
        title: "Linear Suspension",
        href: "/products/linear-suspension",
        icon: Icons.lampCeiling,
      },
      {
        title: "Wall Lights",
        href: "/products/wall-lights",
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
    icon: Icons.lightbulb,
    items: [
      {
        title: "Downrods",
        href: "/products/fanimation-downrod",
        icon: Icons.plus,
        description: "Extend your ceiling fans.",
      },
      {
        title: "Remotes & Controls",
        href: "/products/casablanca-remote",
        icon: Icons.radio,
        description: "Control your lighting with ease.",
      },
      {
        title: "LED Bulbs",
        href: "/products/buster-punch-led-bulb",
        icon: Icons.lightbulb,
        description: "Energy-efficient and stylish bulbs.",
      },
      {
        title: "Dimmers & Outlets",
        href: "/products/buster-punch-dimmer",
        icon: Icons.toggleRight,
        description: "Complete your electrical setup.",
      },
      {
        title: "Exhaust Fans",
        href: "/products/aero-pure-exhaust-fan",
        icon: Icons.fan,
        description: "For bathrooms and utility rooms.",
      },
      {
        title: "See All Accessories",
        href: "/products/accessories",
        icon: Icons.arrowRight,
        description: "Browse our full range.",
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

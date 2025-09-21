
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
        href: "/products/wall",
        icon: Icons.lampWallUp,
      },
       {
        title: "Outdoor Lighting",
        href: "/products/outdoor",
        icon: Icons.lightbulb,
      },
      {
        title: "Architectural Lighting",
        href: "/products/architectural",
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
        title: "Ceiling Fans",
        href: "/products/fans",
        icon: Icons.fan,
        description: "Stylish and functional ceiling fans.",
      },
      {
        title: "Architectural Lighting",
        href: "/products/architectural",
        icon: Icons.lightbulb,
        description: "Recessed, track, and specialty lights.",
      },
      {
        title: "Remotes & Controls",
        href: "/products/accessories",
        icon: Icons.radio,
        description: "Control your lighting with ease.",
      },
      {
        title: "Specialty Bulbs & Dimmers",
        href: "/products/accessories",
        icon: Icons.toggleRight,
        description: "Complete your electrical setup.",
      },
      {
        title: "Exhaust Fans",
        href: "/products/accessories",
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

    
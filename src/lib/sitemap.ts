
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
    href: "/products?category=lighting",
    items: [
       {
        title: "Chandeliers & Pendants",
        href: "/products?category=chandeliers-pendants",
        icon: Icons.lampCeiling,
      },
      {
        title: "Ceiling Fittings",
        href: "/products?category=lighting",
        icon: Icons.lampCeiling,
      },
      {
        title: "Linear Suspension",
        href: "/products?category=linear-suspension",
        icon: Icons.lampCeiling,
      },
      {
        title: "Wall Lights",
        href: "/products?category=wall",
        icon: Icons.lampWallUp,
      },
       {
        title: "Table & Floor Lamps", 
        href: "/products?category=lamps",
        icon: Icons.lamp,
      },
       {
        title: "Outdoor Lighting",
        href: "/products?category=outdoor",
        icon: Icons.lightbulb,
      },
    ],
  },
  {
    title: "Accessories",
    href: "/products?category=accessories",
    icon: Icons.lightbulb,
    items: [
      {
        title: "Ceiling Fans",
        href: "/products?category=fans",
        icon: Icons.fan,
        description: "Stylish and functional ceiling fans.",
      },
      {
        title: "Architectural Lighting",
        href: "/products?category=architectural",
        icon: Icons.lightbulb,
        description: "Recessed, track, and specialty lights.",
      },
      {
        title: "Specialty Bulbs & Dimmers",
        href: "/products?category=specialty-lighting",
        icon: Icons.toggleRight,
        description: "Complete your electrical setup.",
      },
      {
        title: "See All Accessories",
        href: "/products?category=accessories",
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

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
        title: "Ceiling Lights",
        href: "/products/ceiling-lights",
        icon: Icons.lampCeiling,
        description: "Chandeliers, Pendants, Flushmounts",
      },
      {
        title: "Wall Lights",
        href: "/products/wall-sconces-vanity-lights",
        icon: Icons.lampWallUp,
        description: "Sconces, Vanity Lights, Picture Lights",
      },
      { 
        title: "Lamps", 
        href: "/products/lamps", 
        icon: Icons.lamp,
        description: "Table, Floor, and Desk Lamps" 
      },
      {
        title: "Outdoor Lighting",
        href: "/products/outdoor-lighting",
        icon: Icons.lightbulb,
        description: "Weather-resistant lighting for any exterior space.",
      },
       {
        title: "Architectural Lighting",
        href: "/products/architectural-lighting",
        icon: Icons.lightbulb,
        description: "Recessed, Track, and Specialty Lighting",
      },
       {
        title: "Ceiling Fans with Lights",
        href: "/products/ceiling-fans-with-lights",
        icon: Icons.lightbulb,
        description: "Stylish fans with integrated lighting.",
      },
    ],
  },
  {
    title: "Accessories",
    href: "/products/accessories",
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

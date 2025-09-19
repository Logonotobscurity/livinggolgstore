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
    href: "/products/ceiling-lights", // Default to a major category
    items: [
      {
        title: "Ceiling Lights",
        href: "/products/ceiling-lights",
        icon: Icons.lampCeiling,
      },
      {
        title: "Chandeliers & Pendants",
        href: "/products/chandeliers-pendants",
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
        title: "Lamps", 
        href: "/products/table-lamps-portable-lights", 
        icon: Icons.lamp 
      },
      {
        title: "Floor Lamps",
        href: "/products/floor-lamps",
        icon: Icons.lamp,
      },
       {
        title: "Ceiling Fans with Lights",
        href: "/products/ceiling-fans-with-lights",
        icon: Icons.lightbulb,
      },
      {
        title: "Outdoor",
        href: "/products/outdoor-lighting",
        icon: Icons.lightbulb,
      },
       {
        title: "Recessed & Accent",
        href: "/products/recessed-track-lighting",
        icon: Icons.lightbulb,
      },
      {
        title: "Specialty",
        href: "/products/specialty-lighting",
        icon: Icons.lightbulb,
      },
    ],
  },
  {
    title: "Accessories",
    href: "/products/accessories",
  },
  {
    title: "Room",
    href: "/products/room-settings",
  },
];

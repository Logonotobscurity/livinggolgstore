
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
    title: "Ceiling",
    href: "/products/ceiling-lights",
    items: [
      {
        title: "Chandeliers & Pendants",
        href: "/products/chandeliers-pendants",
        icon: Icons.lightbulb,
      },
      {
        title: "Flush & Semi-Flushmounts",
        href: "/products/ceiling-lights",
        icon: Icons.lampCeiling,
      },
      {
        title: "Linear Suspension",
        href: "/products/linear-suspension",
        icon: Icons.lightbulb,
      },
       {
        title: "Ceiling Fans with Lights",
        href: "/products/ceiling-fans-with-lights",
        icon: Icons.lightbulb,
      },
      {
        title: "Recessed & Accent Lighting",
        href: "/products/recessed-track-lighting",
        icon: Icons.lightbulb,
      },
    ],
  },
  {
    title: "Wall",
    href: "/products/wall-sconces-vanity-lights",
    items: [
      {
        title: "Wall Sconces",
        href: "/products/wall-sconces-vanity-lights",
        icon: Icons.lampWallUp,
      },
      {
        title: "Bath & Vanity Lights",
        href: "/products/wall-sconces-vanity-lights",
        icon: Icons.lampWallUp,
      },
      {
        title: "Specialty Lighting",
        href: "/products/specialty-lighting",
        icon: Icons.lampWallUp,
      },
    ],
  },
  {
    title: "Lamps",
    href: "/products/table-lamps-portable-lights",
    items: [
      { title: "Floor Lamps", href: "/products/floor-lamps", icon: Icons.lamp },
      {
        title: "Table & Desk Lamps",
        href: "/products/table-lamps-portable-lights",
        icon: Icons.lamp,
      },
    ],
  },
  {
    title: "Accessories",
    href: "/products/accessories",
  },
  {
    title: "Outdoor",
    href: "/products/outdoor-lighting",
  },
  {
    title: "Room",
    href: "/products/room-settings",
  },
];

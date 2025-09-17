
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
    title: "Ceiling Lights",
    href: "/products/ceiling-lights",
    items: [
      {
        title: "Chandeliers",
        href: "/products/chandeliers-pendants",
        icon: Icons.lightbulb,
      },
      {
        title: "Pendant Lights",
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
        title: "Recessed Lighting",
        href: "/products/recessed-track-lighting",
        icon: Icons.lightbulb,
      },
      {
        title: "Track & Monorail",
        href: "/products/recessed-track-lighting",
        icon: Icons.lightbulb,
      },
    ],
  },
  {
    title: "Wall Lights",
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
        title: "Picture Lights",
        href: "/products/specialty-lighting",
        icon: Icons.lampWallUp,
      },
      {
        title: "Undercabinet Lights",
        href: "/products/specialty-lighting",
        icon: Icons.lampWallUp,
      },
      {
        title: "Lighted Mirrors",
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
        title: "Table Lamps",
        href: "/products/table-lamps-portable-lights",
        icon: Icons.lamp,
      },
      {
        title: "Desk Lamps",
        href: "/products/table-lamps-portable-lights",
        icon: Icons.lamp,
      },
      {
        title: "Cordless Lamps",
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

    
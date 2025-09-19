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
        title: "Ceiling Fittings",
        href: "/products/ceiling-lights",
        icon: Icons.lampCeiling,
        description: "Flushmounts and other ceiling fixtures.",
      },
      {
        title: "Chandeliers & Pendants",
        href: "/products/chandeliers-pendants",
        icon: Icons.lampCeiling,
        description: "Statement pieces for any room.",
      },
      {
        title: "Linear Suspension",
        href: "/products/linear-suspension",
        icon: Icons.lampCeiling,
        description: "Modern, linear lighting solutions.",
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
    title: "Outdoor Lighting",
    href: "/products/outdoor-lighting",
  },
  {
    title: "Architectural Lighting",
    href: "/products/architectural-lighting",
  },
  {
    title: "Accessories",
    href: "/products/accessories",
    items: [
      {
        title: "Conduit Material (Piping, Gum)",
        href: "/products/accessories",
        description: "Essential materials for electrical installation.",
      },
      {
        title: "Casting Wiring (Conduit & Surface)",
        href: "/products/accessories",
        description: "Wiring for all types of installations.",
      },
    ],
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

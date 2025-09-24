
import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Us | Living Gold Nigeria',
  description: 'Learn the story of Living Gold, curators and importers of fine lighting and chandeliers, bringing global craftsmanship to Nigerian homes and projects in Asaba, Lagos, and nationwide since 2013.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Living Gold | Luxury Lighting Curators in Nigeria',
    description: 'Discover the philosophy and story behind Living Gold, Nigeria\'s premier source for luxury, imported lighting and chandeliers since 2013.',
    url: 'https://livinggold.com/about',
    images: [
      {
        url: 'https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg',
        width: 1200,
        height: 800,
        alt: 'Elegant dining room with a luxury Living Gold chandelier.',
      },
    ],
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

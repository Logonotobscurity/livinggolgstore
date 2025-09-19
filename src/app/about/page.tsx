import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'About Us | Living Gold Nigeria',
  description: 'Learn the story of Living Gold, curators and importers of fine lighting and chandeliers, bringing global craftsmanship to Nigerian homes and projects in Asaba, Lagos, and nationwide since 2013.',
};

export default function AboutPage() {
  return <AboutClient />;
}

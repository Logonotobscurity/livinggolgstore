
import type { Metadata } from 'next';
import DesignStudioClient from './design-studio-client';

export const metadata: Metadata = {
  title: 'Expert Lighting Design & Consultation | Living Gold Nigeria',
  description: 'Partner with our expert lighting designers in Nigeria. We offer bespoke consultations, technical specifications for architects, and a trade program for any project.',
  openGraph: {
    title: 'Expert Lighting Design & Consultation | Living Gold Nigeria',
    description: 'Partner with our expert lighting designers in Nigeria for bespoke solutions and professional trade services.',
    url: 'https://livinggolgstore.netlify.app/design-studio',
    images: [
      {
        url: 'https://www.visualcomfort.com/media_1f08f2f154f0e09244ce92d51285bfa59a0838640.jpg',
        width: 1200,
        height: 630,
        alt: 'An architect reviewing blueprints in a modern design office.',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/design-studio',
  },
};

export default function DesignStudioPage() {
  return <DesignStudioClient />;
}

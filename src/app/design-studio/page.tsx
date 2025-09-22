import type { Metadata } from 'next';
import DesignStudioClient from './design-studio-client';

export const metadata: Metadata = {
  title: 'Design Studio | Living Gold Nigeria',
  description: 'Collaborate with Living Gold\'s design experts. We offer lighting design consultations, technical specifications for architects, and a trade program for professionals in Lagos, Asaba, and across Nigeria.',
};

export default function DesignStudioPage() {
  return <DesignStudioClient />;
}

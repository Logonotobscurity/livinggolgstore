
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Design Studio | Living Gold Nigeria',
  description: 'Collaborate with Living Gold\'s design experts. We offer personalized lighting design services for residential and commercial projects across Nigeria, from Asaba to Lagos.',
};

export default function DesignStudioPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Design Studio' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Design Studio</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            From a single room to a full-scale development, our design experts are here to help you craft the perfect lighting environment. We offer tailored consultation services for homeowners, architects, and designers.
          </p>
        </div>

        <div className="default-content-wrapper">
          <Image 
            src="https://picsum.photos/seed/design-studio-hero/1200/600"
            alt="A designer sketching a lighting plan in a modern studio."
            width={1200}
            height={600}
            data-ai-hint="designer sketching"
          />
        </div>

        <div className="text-wrapper align-left">
          <div className="left-border">
            <h2>Our Services</h2>
            <p>
              Light is more than just illumination; it's a critical architectural element that defines a space. Our Design Studio offers a collaborative approach to lighting design, ensuring that every fixture not only looks beautiful but also serves its purpose flawlessly within the Nigerian context.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 mb-16">
            <div className="border border-primary/20 p-8 rounded-lg bg-secondary/50">
                <h3 className="font-headline text-2xl text-primary mb-4">For Homeowners</h3>
                <p className="text-gray-300 mb-4">Whether you're building a new home or renovating a single room, our team can help you select the perfect fixtures. We provide personalized recommendations based on your style, budget, and functional needs.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                    <li>Personal shopping & fixture selection</li>
                    <li>Room-by-room lighting plans</li>
                    <li>Energy-efficient & smart home integration</li>
                </ul>
            </div>
             <div className="border border-primary/20 p-8 rounded-lg bg-secondary/50">
                <h3 className="font-headline text-2xl text-primary mb-4">For Trade Professionals</h3>
                <p className="text-gray-300 mb-4">We partner with architects, interior designers, and contractors to provide comprehensive lighting solutions for residential and commercial projects. Access our trade program for exclusive pricing and support.</p>
                 <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                    <li>Project-based lighting specification</li>
                    <li>Bespoke & custom fixture sourcing</li>
                    <li>Technical support & local compliance</li>
                </ul>
            </div>
        </div>

        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>

        <div className="max-w-md mx-auto px-4">
             <ContactForm />
        </div>

      </div>
    </CmsLayout>
  );
}

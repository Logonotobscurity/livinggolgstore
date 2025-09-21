
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Design Studio | Living Gold Nigeria',
  description: 'Collaborate with Living Gold\'s design experts. We offer personalized lighting design services for residential and commercial projects across Nigeria.',
};

export default function DesignStudioPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Design Studio' }
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'room-settings-hero');

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Design Studio</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            From a single room to a full-scale development, we partner with you to craft perfect lighting environments. Our design services merge your vision with our expertise.
          </p>
        </div>

        {heroImage && (
          <div className="default-content-wrapper">
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="object-cover w-full h-auto"
                data-ai-hint={heroImage.imageHint}
                priority
              />
          </div>
        )}

        <div className="border-t border-primary/30 my-16" />

        {/* Design Studio Services */}
        <div className="text-wrapper align-left">
          <div className="left-border">
            <h2>Our Design Services</h2>
            <p>
              Light is more than just illumination; it's a critical architectural element that defines a space. Our Design Studio offers a collaborative approach to lighting design, ensuring that every fixture not only looks beautiful but also serves its purpose flawlessly within the Nigerian context.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 mb-16">
            <div className="border border-primary/20 p-8 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-4 mb-4">
                    <Icons.user className="h-8 w-8 text-primary" />
                    <h3 className="font-headline text-2xl text-primary">For Homeowners</h3>
                </div>
                <p className="text-muted-foreground mb-4">Whether you're building a new home or renovating a single room, our team can help you select the perfect fixtures. We provide personalized recommendations based on your style, budget, and functional needs.</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Personal shopping & fixture selection</li>
                    <li>Room-by-room lighting plans</li>
                    <li>Energy-efficient & smart home integration</li>
                </ul>
            </div>
             <div className="border border-primary/20 p-8 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-4 mb-4">
                    <Icons.lightbulb className="h-8 w-8 text-primary" />
                    <h3 className="font-headline text-2xl text-primary">For Trade Professionals</h3>
                </div>
                <p className="text-muted-foreground mb-4">We partner with architects, interior designers, and contractors to provide comprehensive lighting solutions for residential and commercial projects. Access our trade program for exclusive pricing and support.</p>
                 <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Project-based lighting specification</li>
                    <li>Bespoke & custom fixture sourcing</li>
                    <li>Technical support & local compliance</li>
                </ul>
            </div>
        </div>
        
        <div className="text-center my-16">
            <Button asChild size="lg" showIcon>
                <Link href="/projects">View Our Projects</Link>
            </Button>
        </div>


        <div className="border-t border-primary/30 my-16" />

        {/* Contact Form */}
        <div className="max-w-md mx-auto px-4">
             <h2 className="font-headline text-2xl font-bold text-foreground text-center mb-12">
                Book a Consultation
             </h2>
             <ContactForm />
        </div>

      </div>
    </CmsLayout>
  );
}

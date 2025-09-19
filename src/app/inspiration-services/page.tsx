
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Inspiration & Design Services | Living Gold Nigeria',
  description: 'Explore inspirational room settings and collaborate with Living Gold\'s design experts. We offer personalized lighting design services for projects across Nigeria.',
};

export default function InspirationServicesPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Inspiration & Services' }
  ];

  const products = PlaceHolderImages.filter(p => p.id.startsWith('room-settings-'));
  const heroImage = PlaceHolderImages.find(p => p.id === 'room-settings-hero');

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Inspiration & Services</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            Discover curated spaces that inspire, then partner with our design experts to bring your vision to life. From a single room to a full-scale development, we craft perfect lighting environments.
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

        {/* Room Settings Grid */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Room Inspiration</h2>
                    <p className="text-lg text-gray-300 mt-2">See how our lighting transforms spaces.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {products.map((product, index) => (
                    <div
                    key={product.id}
                    className="group relative aspect-[4/3] block rounded-lg overflow-hidden"
                    >
                    <Image
                        src={product.imageUrl}
                        alt={product.description}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        data-ai-hint={product.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <h3 className="text-white text-lg font-bold">{product.title}</h3>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </section>

        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>

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

        {/* Contact Form */}
        <div className="max-w-md mx-auto px-4">
             <h2 className="font-headline text-2xl font-bold text-white text-center mb-12">
                Book a Consultation
             </h2>
             <ContactForm />
        </div>

      </div>
    </CmsLayout>
  );
}

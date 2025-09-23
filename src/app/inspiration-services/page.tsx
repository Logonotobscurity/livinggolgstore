
import type { Metadata } from 'next';
import CmsLayout from '@/components/layout/cms-layout';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Inspiration & Services | Living Gold Nigeria',
  description: 'Find inspiration for your next project and learn about the design services offered by Living Gold. From consultation to bespoke commissions.',
};

const services = [
  {
    icon: <Icons.lightbulb className="h-8 w-8 text-primary" />,
    title: "Lighting Design Consultation",
    description: "Our experts work with you to create a comprehensive lighting plan that enhances your space's architecture and sets the perfect mood."
  },
  {
    icon: <Icons.lamp className="h-8 w-8 text-primary" />,
    title: "Technical Specification & Sourcing",
    description: "For architects and contractors, we provide detailed technical specifications, ensuring every fixture meets local standards and project requirements."
  },
  {
    icon: <Icons.star className="h-8 w-8 text-primary" />,
    title: "Bespoke & Custom Commissions",
    description: "We work with our network of global artisans to commission custom-made lighting fixtures tailored to your exact specifications."
  },
  {
    icon: <Icons.user className="h-8 w-8 text-primary" />,
    title: "Trade Program for Professionals",
    description: "Exclusive benefits for architects, interior designers, and developers, including trade pricing and dedicated project support."
  }
];

export default function InspirationServicesPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Inspiration & Services' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white -mt-16 md:-mt-24">
            <Image
              src="https://www.visualcomfort.com/media_1f08f2f154f0e09244ce92d51285bfa59a0838640.jpg"
              alt="A designer sketching a lighting plan in a modern studio"
              fill
              className="object-cover"
              data-ai-hint="designer sketch"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-headline text-5xl md:text-7xl font-bold">
                Inspiration & Services
              </h1>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-200">From concept to completion, we partner with you to bring your vision to light.</p>
            </div>
        </div>

        {/* Our Services Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                {services.map(service => (
                    <div key={service.title} className="flex flex-col sm:flex-row items-start text-center sm:text-left gap-6">
                        <div className="mx-auto sm:mx-0 p-3 rounded-full bg-primary/10">{service.icon}</div>
                        <div>
                            <h3 className="font-bold text-xl text-foreground mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary/50 py-20 md:py-24 mt-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary">Let's Create Something Beautiful</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Whether you're starting a new build, renovating a single room, or searching for that perfect statement piece, our team is ready to assist.
                </p>
                <Button asChild size="lg" showIcon>
                    <Link href="/contact">Book a Consultation</Link>
                </Button>
            </div>
        </section>

      </div>
    </CmsLayout>
  );
}

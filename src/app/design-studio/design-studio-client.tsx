
'use client';

import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useResponsive } from "@/hooks/use-responsive";
import { Icons } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

const processSteps = [
    { number: "01", title: "Consultation", description: "We start by understanding your vision, requirements, and the architectural nuances of your space." },
    { number: "02", title: "Curation & Selection", description: "Our team curates a selection of fixtures from our global collection that align with your aesthetic and functional needs." },
    { number: "03", title: "Specification & Logistics", description: "We handle all technical specifications, procurement, and international logistics, ensuring a seamless process." },
    { number: "04", title: "Delivery & Support", description: "Your curated lighting is delivered to your site, and we provide ongoing support to ensure a perfect installation." },
];

export default function DesignStudioClient() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Design Studio' }
  ];
  const { isMobile } = useResponsive();
  const inspirationImages = PlaceHolderImages.filter(p => p.id.startsWith('room-settings-')).slice(0, 6);

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">

        {/* Hero Section */}
        <section className="bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 items-center gap-8 md:gap-16 min-h-[70vh] py-16 md:py-0">
              <div className="relative w-full h-[60vh] md:h-[calc(70vh-4rem)] rounded-lg overflow-hidden order-last md:order-first">
                 <Image 
                    src="https://www.visualcomfort.com/media_1f08f2f154f0e09244ce92d51285bfa59a0838640.jpg"
                    alt="An architect reviewing blueprints in a modern design office."
                    fill
                    className="object-cover"
                    data-ai-hint="architect blueprints"
                    priority
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6">Take your design to new heights.</h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                    Welcome to the Living Gold Design Studio, where we partner with you to bring your vision to light, from concept to completion.
                </p>
                <Button asChild size="lg" showIcon>
                    <Link href="/contact">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Services Section */}
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

        {/* Process Section */}
        <section className="bg-secondary/30 py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-center text-primary">Our Process</h2>
                    <p className="mt-4 text-muted-foreground">From a single statement piece to a full-scale commercial project, our process is collaborative, transparent, and tailored to you.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 md:gap-4 text-center">
                    {processSteps.map((step, index) => (
                        <div key={step.number} className="relative flex flex-col items-center">
                             {index < processSteps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 left-[calc(50%+2rem)] w-full h-px bg-border -translate-y-1/2" />
                            )}
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold text-xl mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Inspiration Gallery */}
        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Inspiration Gallery</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Explore how our curated lighting has transformed residential and commercial spaces.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {inspirationImages.map((image, index) => {
                        const isTall = index % 3 === 1;
                        return (
                            <div key={image.id} className={`group relative rounded-lg overflow-hidden ${isTall ? 'row-span-2' : ''}`}>
                                <Image 
                                    src={image.imageUrl} 
                                    alt={image.description} 
                                    width={isTall ? 500 : 500}
                                    height={isTall ? 1000 : 500}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-sm font-semibold">{image.title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline" showIcon>
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>
             </div>
        </section>
        
      </div>
    </CmsLayout>
  );
}

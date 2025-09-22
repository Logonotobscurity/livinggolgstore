
'use client';

import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useResponsive } from "@/hooks/use-responsive";

const services = [
  {
    icon: <Icons.lightbulb className="h-8 w-8 text-primary" />,
    title: "Lighting Design Consultation",
    description: "Our experts work with you to create a comprehensive lighting plan that enhances your space's architecture and sets the perfect mood. We consider everything from ambient layers to task lighting and decorative statements."
  },
  {
    icon: <Icons.lamp className="h-8 w-8 text-primary" />,
    title: "Technical Specification & Sourcing",
    description: "For architects and contractors, we provide detailed technical specifications, ensuring every fixture meets local standards (230V, 50Hz) and is perfectly suited for your project's requirements. We handle the global sourcing, so you don't have to."
  },
  {
    icon: <Icons.star className="h-8 w-8 text-primary" />,
    title: "Bespoke & Custom Commissions",
    description: "Have a unique vision? We work with our network of global artisans to commission custom-made lighting fixtures, from monumental chandeliers to unique sculptural pieces, tailored to your exact specifications."
  },
  {
    icon: <Icons.user className="h-8 w-8 text-primary" />,
    title: "Trade Program for Professionals",
    description: "We offer exclusive benefits for architects, interior designers, and developers, including trade pricing, early access to new collections, and dedicated support for all your project needs."
  }
];

const processSteps = [
    {
        step: "01",
        title: "Initial Consultation",
        description: "We start by understanding your vision, requirements, and the architectural context of your space through an in-depth consultation."
    },
    {
        step: "02",
        title: "Concept & Curation",
        description: "Our team develops a lighting concept and curates a selection of fixtures from our global collection that aligns with your aesthetic and functional goals."
    },
    {
        step: "03",
        title: "Specification & Review",
        description: "We present a detailed plan with technical specifications, layout, and pricing. We'll work with you to refine every detail until it's perfect."
    },
    {
        step: "04",
        title: "Sourcing & Delivery",
        description: "Once approved, we manage the entire procurement and importation process, ensuring your fixtures are delivered safely and on schedule."
    }
];

export default function DesignStudioClient() {
  const { isMobile } = useResponsive();
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Design Studio' }
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
                Design Studio
              </h1>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-200">From concept to completion, we partner with you to bring your vision to light.</p>
            </div>
        </div>

        {/* Introduction Split Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 md:my-32">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="max-w-md">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">A Partnership in Design</h2>
                <p className="text-lg text-muted-foreground">
                  Living Gold is more than a store; we are a partner in design. Our Design Studio offers a suite of bespoke services for homeowners, architects, and interior designers, providing unparalleled access to global craftsmanship and technical expertise.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mt-8 md:mt-12">
                      <Image 
                          src="https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg" 
                          alt="Elegant dining room with chandelier"
                          fill
                          className="object-cover"
                          data-ai-hint="elegant dining room"
                          sizes="(max-width: 768px) 50vw, 25vw"
                      />
                  </div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-8 md:mb-12">
                      <Image 
                          src="https://www.visualcomfort.com/media_19cb8a76069a338b66ef4bed91feea669edc52b20.jpg"
                          alt="Artisan glass blower"
                          fill
                          className="object-cover"
                          data-ai-hint="artisan glass"
                           sizes="(max-width: 768px) 50vw, 25vw"
                      />
                  </div>
              </div>
          </div>
        </div>
        
        <div className="border-t border-primary/30 my-16" />

        {/* Our Services Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

        <div className="border-t border-primary/30 my-16" />

        {/* Our Process Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-20 text-primary">Our Process</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-16 md:gap-8">
                 <div className="absolute top-8 left-0 md:left-1/2 md:top-1/2 w-px md:w-full h-full md:h-px bg-primary/20" />
                 {processSteps.map(step => (
                    <div key={step.step} className="relative flex flex-col items-center text-center">
                        <div className="bg-background z-10 flex items-center justify-center h-16 w-16 rounded-full border-2 border-primary mb-6">
                           <span className="font-headline text-xl font-bold text-primary">{step.step}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
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
        
        {/* Gallery */}
        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Project Showcase</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">A glimpse into the spaces we've transformed.</p>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden group col-span-2 row-span-2">
                        <Image src="https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg" alt="Luxury dining room" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="luxury dining room" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image src="https://www.visualcomfort.com/media_19cb8a76069a338b66ef4bed91feea669edc52b20.jpg" alt="Artisan crafting light" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="artisan glass blowing" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image src="https://www.visualcomfort.com/media_1575cd4e8cf1f1cda95217ef51dd52e31c9c6ee33.jpg" alt="Modern living room" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="modern living room" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                     <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image src="https://www.visualcomfort.com/media_1637d2498d4d4b5abe80581c2afa5e572ddd78c7c.jpg" alt="Minimalist hallway" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="minimalist hallway" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                        <Image src="https://www.visualcomfort.com/media_1b8d06fcda06ca737ca6c8b50c4ea44dd4c242cdd.png" alt="Bedroom vanity light" fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint="vanity light" />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                 </div>
            </div>
        </section>


      </div>
    </CmsLayout>
  );
}

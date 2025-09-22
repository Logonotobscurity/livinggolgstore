
'use client';

import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";
import { useResponsive } from "@/hooks/use-responsive";

export default function AboutClient() {
  const { isMobile } = useResponsive();
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'About' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">
        <div className="text-wrapper text-center mb-16 px-4">
          <h1 className={`mb-4 ${isMobile ? 'text-4xl' : 'text-5xl'}`}>About Living Gold</h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto text-muted-foreground`}>Since 2013, Living Gold has imported and curated exquisite lighting from around the world, transforming interiors across Nigeria through exceptional design and considered service.</p>
        </div>

        <div className="default-content-wrapper">
          <Image 
            src="https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg"
            alt="Dining room lit by a Living Gold chandelier — warm layered light."
            width={1200}
            height={800}
            className="rounded-lg"
            data-ai-hint="chandelier dining room"
          />
        </div>

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Our Story</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Living Gold began with a simple conviction: the right light changes everything. From humble beginnings, the company has grown into a trusted curator and importer of fine lighting and chandeliers — connecting Nigerian interiors with the best ateliers and workshops globally.
              </p>
              <p>
                We organize collections that reflect rare craft, elegant engineering, and enduring beauty, bringing them to homes and projects across the country. Living Gold is a bridge between cultures: we source from artisans and studios in Europe, North Africa, and Asia, then translate those pieces into contextualised solutions for Nigerian architecture and lifestyles.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/30 my-16" />

        <div className="text-wrapper align-left">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-primary">Our Philosophy</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                We believe light is architecture’s quiet companion — it reveals material, sets mood, and shapes daily ritual. Luxury is not a label but a measure of authenticity: provenance, craft, and the confidence of sound engineering.
              </p>
              <p>
                At Living Gold, every fixture must do more than look beautiful — it must speak of origin and maker, and perform reliably for years. We travel widely to source pieces with story and soul, celebrating the human hand, considered materiality, and design that endures.
              </p>
            </div>
          </div>
        </div>

        <div className="default-content-wrapper my-16">
          <Image 
            src="https://www.visualcomfort.com/media_19cb8a76069a338b66ef4bed91feea669edc52b20.jpg"
            alt="Artisan shaping a blown-glass light by hand."
            width={1200}
            height={600}
            className="rounded-lg"
            data-ai-hint="artisan glass blowing"
          />
        </div>

        <div className="text-wrapper">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Guides Us</h2>
            <p className="text-muted-foreground mt-2">The pillars of our commitment to you.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                  <h4 className="font-bold text-lg text-primary">Customer First</h4>
                  <p className="text-sm text-muted-foreground mt-1">We design around people. From specifications for an architect to a homeowner’s single chandelier purchase, our process is consultative, transparent, and service-led.</p>
              </div>
              <div>
                  <h4 className="font-bold text-lg text-primary">Innovation</h4>
                  <p className="text-sm text-muted-foreground mt-1">We marry tradition with technology, offering energy-efficient options, intelligent controls, and modern finishes that respect the original craft.</p>
              </div>
              <div>
                  <h4 className="font-bold text-lg text-primary">Quality</h4>
                  <p className="text-sm text-muted-foreground mt-1">We import only from vetted makers whose work meets strict quality and safety standards. Each shipment is inspected for material integrity and fit-for-purpose engineering.</p>
              </div>
              <div>
                  <h4 className="font-bold text-lg text-primary">Growth</h4>
                  <p className="text-sm text-muted-foreground mt-1">We expand thoughtfully — new partners, refined logistics, and better service models — always improving how we deliver light to projects in Nigeria and the region.</p>
              </div>
          </div>
        </div>

        <div className="border-t border-primary/30 my-16" />

        <div className="grid md:grid-cols-2 gap-12 items-center default-content-wrapper">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Sourcing & Craftsmanship</h3>
            <p className="text-muted-foreground">
              Our sourcing is intentional. We work with blown-glass masters, heritage metalworkers, and boutique studios that value time-honoured techniques. Each supplier is vetted for provenance and material stewardship.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Documented provenance and make details for every fixture</li>
                <li>Clear technical specs adapted to local installations</li>
                <li>Optional bespoke finishes and limited-edition runs</li>
            </ul>
          </div>
          <div className="relative aspect-video">
             <Image 
              src="https://www.visualcomfort.com/media_1575cd4e8cf1f1cda95217ef51dd52e31c9c6ee33.jpg"
              alt="Living Gold studio vignette with layered lighting."
              fill
              className="object-cover rounded-lg"
              data-ai-hint="luxury showroom"
            />
          </div>
        </div>

      </div>
    </CmsLayout>
  );
}

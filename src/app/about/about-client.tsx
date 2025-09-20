
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
          <h1 className={`mb-4 ${isMobile ? 'text-4xl' : 'text-5xl'}`}>About Us</h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-2xl mx-auto`}>Since 2013, Living Gold has imported and curated exquisite lighting from around the world, transforming interiors across Nigeria through exceptional design and considered service.</p>
        </div>

        <div className="default-content-wrapper">
          <Image 
            src="https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg"
            alt="Dining room lit by a Living Gold chandelier — warm layered light."
            width={1200}
            height={800}
            data-ai-hint="chandelier dining room"
          />
        </div>

        <div className="text-wrapper align-left">
          <div className="left-border">
            <h2>Our Story</h2>
            <p>
              Living Gold began with a simple conviction: the right light changes everything. From humble beginnings, the company has grown into a trusted curator and importer of fine lighting and chandeliers — connecting Nigerian interiors with the best ateliers and workshops globally. We organize collections that reflect rare craft, elegant engineering, and enduring beauty, bringing them to homes and projects across the country.
            </p>
            <p>
              Living Gold is a bridge between cultures: we source from artisans and studios in Europe, North Africa, and Asia, then translate those pieces into contextualised solutions for Nigerian architecture and lifestyles.
            </p>
          </div>
        </div>

        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>

        <div className="text-wrapper align-left">
          <h3>Our Philosophy</h3>
          <p>
            We believe light is architecture’s quiet companion — it reveals material, sets mood, and shapes daily ritual. Luxury is not a label but a measure of authenticity: provenance, craft, and the confidence of sound engineering. At Living Gold, every fixture must do more than look beautiful — it must speak of origin and maker, and perform reliably for years.
          </p>
           <p>
            We travel widely — to ateliers and markets, to private workshops and design studios — to source pieces with story and soul. Our selections celebrate the human hand, considered materiality, and design that endures.
          </p>
        </div>

        <div className="text-wrapper">
          <hr className="section-divider" />
        </div>

        <div className="text-wrapper align-left">
            <h3>What Guides Us — Our Pillars</h3>
            <div className="space-y-6 mt-8">
                <div>
                    <h4 className="font-bold text-lg text-primary">Customer First</h4>
                    <p>We design around people. From specifications for an architect to a homeowner’s single chandelier purchase, our process is consultative, transparent, and service-led.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-primary">Innovation</h4>
                    <p>We marry tradition with technology, offering energy-efficient options, intelligent controls, and modern finishes that respect the original craft.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-primary">Quality</h4>
                    <p>We import only from vetted makers whose work meets strict quality and safety standards. Each shipment is inspected for material integrity and fit-for-purpose engineering.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-primary">Growth</h4>
                    <p>We expand thoughtfully — new partners, refined logistics, and better service models — always improving how we deliver light to projects in Nigeria and the region.</p>
                </div>
            </div>
        </div>

        <div className="default-content-wrapper">
          <Image 
            src="https://www.visualcomfort.com/media_19cb8a76069a338b66ef4bed91feea669edc52b20.jpg"
            alt="Artisan shaping a blown-glass light by hand."
            width={1200}
            height={600}
            data-ai-hint="artisan glass blowing"
          />
        </div>

        <div className="text-wrapper align-left">
          <h3>Sourcing & Craftsmanship</h3>
          <p>
            Our sourcing is intentional. We work with blown-glass masters, heritage metalworkers, and boutique studios that value time-honoured techniques. Each supplier is vetted for provenance, material stewardship, and the ability to meet bespoke requests.
          </p>
          <p className="font-bold mt-6">For clients, this means:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
                <li>Documented provenance and make details for every fixture</li>
                <li>Clear technical specs (voltages, IP ratings, mounting requirements) adapted to local installations</li>
                <li>Optional bespoke finishes and limited-edition runs when available</li>
            </ul>
           <p className="mt-4">
            Every imported piece passes through a rigorous quality-control process and is accompanied by care and installation guidance to ensure longevity and safety in local contexts.
          </p>
        </div>
        
        <div className="default-content-wrapper">
          <Image 
            src="https://www.visualcomfort.com/media_1575cd4e8cf1f1cda95217ef51dd52e31c9c6ee33.jpg"
            alt="Living Gold studio vignette with layered lighting."
            width={1200}
            height={800}
            data-ai-hint="luxury showroom"
          />
        </div>

        <div className="text-wrapper align-left">
          <h3>The Living Gold Experience</h3>
          <p>
            Visiting our studio or working with our team is a curated experience. We present lighting in real contexts — dining vignettes, sitting rooms, and stair wells — so you see scale, warmth, and proportion.
          </p>
          <p className="font-bold mt-6">Services we provide:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-muted-foreground">
                <li>In-studio consultations and material-led presentations</li>
                <li>On-site surveys and technical specifications for architects and contractors</li>
                <li>Trade support and priority sourcing for designers and hospitality projects</li>
                <li>Bespoke commissions, finish options, and local support for installation</li>
            </ul>
           <p className="mt-4">
            We prioritize clarity: lead times, duties, and installation requirements are explicitly communicated so projects stay on schedule.
          </p>
        </div>

      </div>
    </CmsLayout>
  );
}

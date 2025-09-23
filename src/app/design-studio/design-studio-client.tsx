
'use client';

import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useResponsive } from "@/hooks/use-responsive";
import { AIConsultant } from "@/components/ai-consultant";

export default function DesignStudioClient() {
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

        {/* AI Consultant Section */}
        <section className="bg-secondary/30 py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <AIConsultant />
          </div>
        </section>

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
        
      </div>
    </CmsLayout>
  );
}

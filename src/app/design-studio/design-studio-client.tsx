
'use client';

import CmsLayout from "@/components/layout/cms-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useResponsive } from "@/hooks/use-responsive";
import { AIConsultant } from "@/components/ai-consultant";

export default function DesignStudioClient() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Design Studio' }
  ];
  const { isMobile } = useResponsive();

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-foreground">

        {/* Hero Section */}
        <section className={`relative flex items-center justify-center text-center bg-secondary/20 ${isMobile ? 'min-h-[60vh] py-16' : 'min-h-[70vh]'}`}>
            <div className="absolute inset-0">
                <Image 
                    src="https://www.visualcomfort.com/media_15301f7f1a1767bae048266bf4ea27bd8169b7990.jpg"
                    alt="A beautifully lit, modern living room showcasing luxury lighting design."
                    fill
                    className="object-cover opacity-30"
                    data-ai-hint="luxury living room"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
            </div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6">Take your design to new heights.</h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                    Welcome to the Living Gold Design Studio, where we partner with you to bring your vision to light, from concept to completion.
                </p>
                <Button asChild size="lg" showIcon>
                    <Link href="/contact">Book a Consultation</Link>
                </Button>
            </div>
        </section>

        {/* AI Consultant Section */}
        <section className="bg-secondary/30 py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <AIConsultant />
          </div>
        </section>
        
      </div>
    </CmsLayout>
  );
}


'use client';

import { useState, useTransition } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { Button } from './ui/button';
import { Icons } from './icons';
import {
  generateInstallationGuide,
  type GenerateInstallationGuideOutput,
} from '@/ai/flows/generate-installation-guide';
import { useToast } from '@/hooks/use-toast';

interface ProductSupportProps {
  productName: string;
}

function InstallationGuide({
  guide,
}: {
  guide: GenerateInstallationGuideOutput;
}) {
  return (
    <div className="space-y-8 mt-8 text-sm">
      <div>
        <h4 className="font-bold text-base text-primary mb-3">Tools Required</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {guide.toolsRequired.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base text-destructive mb-3">
          Safety Precautions
        </h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {guide.safetyPrecautions.map((precaution) => (
            <li key={precaution}>{precaution}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-base text-primary mb-4">
          Installation Steps
        </h4>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          {guide.steps
            .sort((a, b) => a.step - b.step)
            .map((step) => (
              <li key={step.step}>
                <strong className="text-foreground">{step.title}</strong>
                <p className="pl-2 mt-1">{step.description}</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export function ProductSupport({ productName }: ProductSupportProps) {
  const [isGenerating, startGenerating] = useTransition();
  const [guide, setGuide] =
    useState<GenerateInstallationGuideOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateGuide = () => {
    startGenerating(async () => {
      setGuide(null);

      const result = await generateInstallationGuide({ productName });
      if (result) {
        setGuide(result);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Generating Guide',
          description:
            'The AI could not generate an installation guide at this time. Please try again.',
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">
                Support & Information
            </h2>
             <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Find answers to common questions or generate a virtual installation guide for this product.
            </p>
        </div>

        <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="guide">
              <AccordionTrigger className="text-lg">
                Virtual Installation Guide
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="text-sm text-muted-foreground mb-6">
                  <p>
                    Need help with installation? Our AI can generate a
                    customized, step-by-step guide for this product.
                  </p>
                </div>
                <Button onClick={handleGenerateGuide} disabled={isGenerating}>
                  {isGenerating ? (
                    <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Icons.wrench className="w-4 h-4 mr-2" />
                  )}
                  {guide ? 'Regenerate Guide' : 'Generate Guide'}
                </Button>

                {isGenerating && !guide && (
                  <div className="mt-8 text-center text-muted-foreground">
                    <p>Generating your guide...</p>
                  </div>
                )}

                {guide && <InstallationGuide guide={guide} />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Do you deliver outside of Asaba and Lagos?
              </AccordionTrigger>
              <AccordionContent>
                Yes. While our showroom is in Asaba, we have a robust logistics
                network to deliver our curated luxury lighting and decor across
                all states in Nigeria and to major hubs across Africa. Please{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact our sales team
                </Link>{' '}
                to discuss shipping options for your project.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What is your process for returns or exchanges?
              </AccordionTrigger>
              <AccordionContent>
                We accept returns on most items within 14 days of delivery,
                provided they are in original, unused condition with all
                packaging intact. Given the nature of our imported goods,
                custom-sourced or bespoke orders are non-refundable. Please see
                our full{' '}
                <Link
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  Delivery &amp; Returns section
                </Link>{' '}
                for details on how to initiate a return.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I get help with lighting design for my project?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. Our design experts are available for consultations.
                We can help you with everything from selecting a single fixture
                to creating a complete lighting plan for your home or
                commercial project. Visit our{' '}
                <Link
                  href="/design-studio"
                  className="text-primary hover:underline"
                >
                  Design Studio page
                </Link>{' '}
                or{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>{' '}
                to schedule a consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="text-center mt-8">
            <Link href="/contact" className="text-primary hover:underline">
              See more FAQs or Contact Us
            </Link>
          </div>
    </div>
  );
}

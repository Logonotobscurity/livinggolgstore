
import { ContactForm } from '@/components/contact-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

export function ProductSupport() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="w-full">
                <div className="max-w-md mx-auto">
                    <h2 className="font-headline text-2xl font-bold text-foreground text-center mb-4">
                        HAVE A QUESTION?
                    </h2>
                     <p className="text-center text-muted-foreground mb-8">
                        Our experts are here to help. From product details to design advice, we're ready to assist you.
                     </p>
                     <ContactForm />
                </div>
            </div>
            <div>
                <h2 className="font-headline text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Do you deliver outside of Asaba and Lagos?</AccordionTrigger>
                    <AccordionContent>
                      Yes. While our showroom is in Asaba, we have a robust logistics network to deliver our curated luxury lighting and decor across all states in Nigeria and to major hubs across Africa. Please <Link href="/contact" className="text-primary hover:underline">contact our sales team</Link> to discuss shipping options for your project.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is your process for returns or exchanges?</AccordionTrigger>
                    <AccordionContent>
                      We accept returns on most items within 14 days of delivery, provided they are in original, unused condition with all packaging intact. Given the nature of our imported goods, custom-sourced or bespoke orders are non-refundable. Please see our full <Link href="/contact" className="text-primary hover:underline">Delivery &amp; Returns section</Link> for details on how to initiate a return.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I get help with lighting design for my project?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely. Our design experts are available for consultations. We can help you with everything from selecting a single fixture to creating a complete lighting plan for your home or commercial project. Visit our <Link href="/design-studio" className="text-primary hover:underline">Design Studio page</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> to schedule a consultation.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are your imported lights compatible with Nigerian electrical standards?</AccordionTrigger>
                    <AccordionContent>
                      Yes, this is a critical part of our service. All our internationally sourced lighting fixtures are professionally inspected and adapted to meet local electrical and safety standards for Nigeria (230V, 50Hz). We ensure all mounting hardware and technical specifications are suitable for local installation, guaranteeing safety and performance.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="text-center mt-8">
                <Link href="/contact" className="text-primary hover:underline">See more FAQs</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

import { ContactForm } from '@/components/contact-form';
import { Socials } from '../socials';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="w-full">
            <ContactForm />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-base font-bold mb-6">FOLLOW US</h2>
            <div className="flex justify-center md:justify-start">
              <Socials />
            </div>
            <div className="text-sm text-gray-400 space-y-4 mt-8">
              <div>
                <h3 className="font-bold text-white mb-2">Address</h3>
                <p>Living Gold Lighting, Okpanam Road, Asaba, Delta State, Nigeria</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Phone</h3>
                <p><a href="tel:+2347011131333" className="text-primary hover:underline">+234 701 113 1333</a></p>
                <p><a href="tel:+2348064441141" className="text-primary hover:underline">+234 806 444 1141</a></p>
                <p><a href="tel:+2348034291995" className="text-primary hover:underline">+234 803 429 1995</a> (Store)</p>
              </div>
               <div>
                <h3 className="font-bold text-white mb-2">Email</h3>
                <p><a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-wrapper mt-24">
            <hr className="section-divider" />
        </div>

        <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please proceed to checkout to see the options available for your country.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns on most items within 14 days of delivery. Items must be in original, unused condition with all packaging intact. Please see our full <Link href="/contact" className="text-primary hover:underline">Delivery & Returns section</Link> for more details on how to initiate a return.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I get help with lighting design for my project?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Our design experts are available for consultations. We can help you with everything from selecting a single fixture to creating a complete lighting plan for your home or commercial project. Visit our Design Studio page or <Link href="/contact" className="text-primary hover:underline">contact us</Link> to schedule a consultation.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>Are the electrical components compatible with local standards?</AccordionTrigger>
                <AccordionContent>
                  Yes, all our imported lighting fixtures are professionally inspected and adapted to meet local electrical and safety standards for Nigeria (230V, 50Hz). We ensure all mounting hardware and technical specifications are suitable for local installation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="text-center mt-8">
              <Link href="/contact" className="text-primary hover:underline">See more FAQs</Link>
            </div>
        </div>
      </div>
    </section>
  );
}

import CmsLayout from "@/components/layout/cms-layout";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Contact' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-center mb-16 px-4">
          <h1 className="mb-4 text-4xl md:text-5xl">Contact Us</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            We're here to help. Whether you have a question about our products, need design advice, or want to discuss a project, our team is ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start max-w-5xl mx-auto px-4">
            <div>
                 <ContactForm />
            </div>
            <div className="space-y-12 text-gray-300">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Visit Our Showroom</h3>
                        <p className="leading-relaxed">
                            Living Gold Lighting,<br />
                            Okpanam Road, Asaba,<br />
                            Delta State, Nigeria
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Call Us</h3>
                        <p><a href="tel:+2347011131333" className="hover:text-white">+234 701 113 1333</a></p>
                        <p><a href="tel:+2348064441141" className="hover:text-white">+234 806 444 1141</a></p>
                        <p><a href="tel:+2348034291995" className="hover:text-white">+234 803 429 1995</a> (Store)</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Email Us</h3>
                        <p><a href="mailto:hello@livinggold.com" className="hover:text-white">hello@livinggold.com</a></p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-wrapper mt-24">
            <hr className="section-divider" />
        </div>

        <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Customer Service Hub</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="font-bold text-xl text-primary mb-6">Frequently Asked Questions</h3>
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
                      We accept returns on most items within 14 days of delivery. Items must be in original, unused condition with all packaging intact. Please see our full Delivery & Returns section for more details on how to initiate a return.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I get help with lighting design for my project?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely. Our design experts are available for consultations. We can help you with everything from selecting a single fixture to creating a complete lighting plan for your home or commercial project. Visit our Design Studio page or contact us to schedule a consultation.
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4">
                    <AccordionTrigger>Are the electrical components compatible with local standards?</AccordionTrigger>
                    <AccordionContent>
                      Yes, all our imported lighting fixtures are professionally inspected and adapted to meet local electrical and safety standards for Nigeria (230V, 50Hz). We ensure all mounting hardware and technical specifications are suitable for local installation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                  <h3 className="font-bold text-xl text-primary mb-6">Delivery & Returns</h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>
                      <strong>Delivery:</strong> Standard delivery within Nigeria takes 3-7 business days. For international orders, please allow 7-21 business days. All orders are fully insured and trackable.
                    </p>
                    <p>
                      <strong>Returns:</strong> To initiate a return, please contact our customer service team at <a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a> with your order number. Returned items must be in their original packaging and condition. Custom or bespoke orders are non-refundable.
                    </p>
                    <p>
                      For more detailed information, please review our full <Link href="/policies/shipping-returns" className="text-primary hover:underline">Shipping & Returns Policy</Link>.
                    </p>
                  </div>
              </div>
            </div>
        </div>

      </div>
    </CmsLayout>
  );
}

import { ContactForm } from '@/components/contact-form';
import { Socials } from '../socials';

export default function Contact() {
  return (
    <section id="contact" className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="w-full">
            <ContactForm />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-base font-bold mb-6">FOLLOW US</h3>
            <div className="flex justify-center md:justify-start">
              <Socials />
            </div>
            <div className="text-sm text-gray-400 space-y-2 mt-8">
              <p><strong>Phone:</strong> <a href="tel:+17045551234" className="text-primary hover:underline">(704) 555-1234</a></p>
              <p><strong>Email:</strong> <a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

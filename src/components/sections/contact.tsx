import { ContactForm } from '@/components/contact-form';

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-800 text-white py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <div className="w-full">
            <ContactForm />
          </div>
          <div>
            <h3 className="text-base font-bold mb-6">MAILING ADDRESS</h3>
            <address className="not-italic text-sm text-gray-400 leading-normal mb-6">
              Living Gold Interiors<br />
              123 Design District Lane<br />
              Charlotte, NC 28202<br />
              United States
            </address>
            <div className="text-sm text-gray-400 space-y-2">
              <p><strong>Phone:</strong> <a href="tel:+17045551234" className="text-primary hover:underline">(704) 555-1234</a></p>
              <p><strong>Email:</strong> <a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

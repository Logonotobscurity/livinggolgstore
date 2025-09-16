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
            <div className="text-sm text-gray-400 space-y-4 mt-8">
              <div>
                <h4 className="font-bold text-white mb-2">Address</h4>
                <p>Living Gold Lighting, Okpanam Road, Asaba, Delta State, Nigeria</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Phone</h4>
                <p><a href="tel:+2347011131333" className="text-primary hover:underline">+234 701 113 1333</a></p>
                <p><a href="tel:+2348064441141" className="text-primary hover:underline">+234 806 444 1141</a></p>
                <p><a href="tel:+2348034291995" className="text-primary hover:underline">+234 803 429 1995</a> (Store)</p>
              </div>
               <div>
                <h4 className="font-bold text-white mb-2">Email</h4>
                <p><a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

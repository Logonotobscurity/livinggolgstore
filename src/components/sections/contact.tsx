
import { Socials } from '../socials';

export default function Contact() {
  return (
    <section id="contact" className="text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="w-full">
             <div className="text-center md:text-left">
                <h2 className="text-base font-bold mb-6">CONNECT WITH US</h2>
                 <p className="text-muted-foreground mb-8">
                  Follow our journey and get inspired on social media, or reach out to us directly. We're here to help you bring your vision to light.
                 </p>
                <div className="flex justify-center md:justify-start">
                    <Socials />
                </div>
             </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm text-muted-foreground space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">Address</h3>
                <p>Living Gold Lighting, Okpanam Road, Asaba, Delta State, Nigeria</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Phone</h3>
                <p><a href="tel:+2347011131333" className="text-primary hover:underline">+234 701 113 1333</a></p>
                <p><a href="tel:+2348064441141" className="text-primary hover:underline">+234 806 444 1141</a></p>
                <p><a href="tel:+2348034291995" className="text-primary hover:underline">+234 803 429 1995</a> (Store)</p>
              </div>
               <div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <p><a href="mailto:hello@livinggold.com" className="text-primary hover:underline">hello@livinggold.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

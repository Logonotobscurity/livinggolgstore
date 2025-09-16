import CmsLayout from "@/components/layout/cms-layout";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Contact' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="cms-page text-white">
        <div className="text-wrapper text-center mb-16">
          <h1 className="mb-4 text-[50px]">Contact Us</h1>
          <p className="text-[16px] max-w-2xl mx-auto">
            We're here to help. Whether you have a question about our products, need design advice, or want to discuss a project, our team is ready to assist you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start max-w-5xl mx-auto px-4">
            <div>
                 <ContactForm />
            </div>
            <div className="space-y-8 text-gray-300">
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
    </CmsLayout>
  );
}

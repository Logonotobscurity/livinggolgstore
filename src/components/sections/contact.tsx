import { ContactForm } from '@/components/contact-form';

export default function Contact() {
  return (
    <section id="contact" className="bg-secondary py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl tracking-tight">
              Begin Your Transformation
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Have a project in mind? We would love to hear from you. Fill out the form, and a member of our design team will get in touch to discuss how we can turn your vision into a reality.
            </p>
             <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Let's create something extraordinary together.
            </p>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

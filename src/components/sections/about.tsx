import Marquee from '@/components/ui/marquee';
import { getReviews } from '@/lib/reviews';

const TestimonialCard = ({ body, author }: { body: string, author: string }) => {
  return (
    <blockquote className="bg-background/50 border border-primary rounded-lg p-6 md:p-8 w-[90vw] max-w-[450px] shrink-0">
      <p className="text-base italic leading-relaxed mb-4">"{body}"</p>
      <footer className="text-sm font-medium text-primary/80">— {author}</footer>
    </blockquote>
  );
};

export default async function About() {
  const testimonials = await getReviews();
  
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="text-foreground py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center md:text-left mb-16 md:mb-24">
          <h2 className="text-base md:text-lg font-medium tracking-[0.2em] uppercase text-primary mb-6">
            CURATORS OF THE EXCEPTIONAL
          </h2>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto md:mx-0 leading-loose">
            Since 2013, Living Gold has been a bridge to the world's finest lighting artisans. We import and curate exquisite chandeliers, fixtures, and bespoke pieces for discerning clients across Nigeria, transforming spaces with the power of exceptional design.
          </p>
        </div>

        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
            IN THE WORDS OF OUR CLIENTS
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
            EVERY PROJECT TELLS A STORY
          </h2>
        </div>
      </div>
      <div className="relative flex h-[450px] w-full flex-row items-center justify-center overflow-hidden">
        {/* Mobile View: Single Column Marquee */}
        <div className="md:hidden">
          <Marquee pauseOnHover vertical className="[--duration:60s] [--gap:1rem]">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} body={testimonial.body} author={testimonial.author} />
            ))}
          </Marquee>
        </div>

        {/* Desktop View: Multi-Column Marquee */}
        <div className="hidden md:flex flex-row justify-center gap-4">
          <Marquee pauseOnHover vertical reverse className="[--duration:40s] [--gap:1rem]">
            {firstColumn.map((testimonial, i) => (
              <TestimonialCard key={`col1-${i}`} body={testimonial.body} author={testimonial.author} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:50s] [--gap:1rem]">
            {secondColumn.map((testimonial, i) => (
              <TestimonialCard key={`col2-${i}`} body={testimonial.body} author={testimonial.author} />
            ))}
          </Marquee>
        </div>
        
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-transparent to-transparent"></div>
      </div>
    </section>
  );
}

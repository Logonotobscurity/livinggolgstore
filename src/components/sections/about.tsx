import Marquee from '@/components/ui/marquee';

const testimonials = [
  {
    body: "Living Gold's collection is a treasure trove of unique finds. I always discover something extraordinary that elevates my design projects to the next level. Truly a designer's dream.",
    author: 'A. Adewusi, Interior Designer',
  },
  {
    body: 'The quality and craftsmanship of the pieces from Living Gold are unparalleled. Each item tells a story and brings a sense of history and soul into the home.',
    author: 'K. Bello, Homeowner',
  },
  {
    body: "From grand chandeliers to the smallest decorative objects, Living Gold's curation is impeccable. It's my first stop for sourcing items that make a statement.",
    author: 'F. Okoro, Architect',
  },
  {
    body: 'Working with the Living Gold team was a seamless experience. Their expertise in lighting design and commitment to service made all the difference on our project.',
    author: 'L. Adeyemi, Property Developer',
  },
  {
    body: 'The bespoke chandelier we commissioned is the centerpiece of our hotel lobby. Living Gold delivered a work of art that is both timeless and breathtaking.',
    author: 'General Manager, The Lagos Continental',
  },
  {
    body: 'I appreciate the attention to detail and the clear communication throughout the import process. Living Gold makes sourcing luxury international lighting effortless.',
    author: 'T. Ibrahim, Procurement Manager',
  },
];

const TestimonialCard = ({ body, author }: { body: string, author: string }) => {
  return (
    <blockquote className="bg-background/50 border border-primary rounded-lg p-6 md:p-8 w-[90vw] max-w-[450px] shrink-0">
      <p className="text-sm italic leading-normal mb-4">"{body}"</p>
      <footer className="text-xs font-medium text-primary/80">— {author}</footer>
    </blockquote>
  );
};

export default function About() {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);

  return (
    <section className="bg-secondary text-foreground py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center md:text-left mb-16 md:mb-24">
          <h2 className="text-base md:text-lg font-medium tracking-[0.2em] uppercase text-primary mb-6">
            CURATORS OF THE EXCEPTIONAL
          </h2>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto md:mx-0 leading-loose">
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
        
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-secondary to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-secondary to-transparent"></div>
      </div>
    </section>
  );
}

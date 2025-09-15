import Marquee from '@/components/ui/marquee';

const testimonials = [
  {
    body: "Heather Smith of Charlotte's own Living Gold combines stylish and mature expertise with Modern and Bohemian elements. Living Gold remains my decades-long go-to for finds and inspiration.",
  },
  {
    body: 'I have had the privilege of working with Heather Smith of Living Gold for many years. A legacy of exceptional client service, community support, and great taste in an ever-changing world of interior design.',
  },
  {
    body: "Anytime I'm looking for magic, I know to look to Living Gold. Heather Smith and her team consistently source the globe and return with only the finest luxury pieces.",
  },
  {
    body: "Living Gold's collection is a treasure trove of unique finds. I always discover something extraordinary that elevates my design projects to the next level. Truly a designer's dream.",
  },
  {
    body: 'The quality and craftsmanship of the pieces from Living Gold are unparalleled. Each item tells a story and brings a sense of history and soul into the home.',
  },
  {
    body: "From grand chandeliers to the smallest decorative objects, Living Gold's curation is impeccable. It's my first stop for sourcing items that make a statement.",
  },
];

const TestimonialCard = ({ body }: { body: string }) => {
  return (
    <blockquote className="bg-black/50 border border-primary rounded-lg p-6 md:p-8 w-[90vw] max-w-[450px] shrink-0">
      <p className="text-sm italic leading-normal">"{body}"</p>
    </blockquote>
  );
};

export default function About() {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);

  return (
    <section className="bg-secondary text-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center md:text-left mb-16 md:mb-24">
          <p className="text-base md:text-lg font-medium tracking-[0.2em] uppercase text-primary mb-6">
            CURATORS OF THE UNEXPECTED
          </p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto md:mx-0 leading-loose">
            An invaluable resource for customers in Charlotte, NC and across the
            country. Living Gold is a retail showroom, interior design firm and
            e-commerce site focused on offering a selection of curated antiques,
            accessories and exclusive lines.
          </p>
        </div>

        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
            WHAT OTHERS SAY
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
            EVERY HOME TELLS A STORY
          </h2>
        </div>
      </div>
      <div className="relative flex h-[450px] w-full flex-row items-center justify-center overflow-hidden">
        {/* Mobile View: Single Column Marquee */}
        <div className="md:hidden">
          <Marquee pauseOnHover vertical className="[--duration:60s] [--gap:1rem]">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} body={testimonial.body} />
            ))}
          </Marquee>
        </div>

        {/* Desktop View: Multi-Column Marquee */}
        <div className="hidden md:flex flex-row justify-center gap-4">
          <Marquee pauseOnHover vertical reverse className="[--duration:40s] [--gap:1rem]">
            {firstColumn.map((testimonial, i) => (
              <TestimonialCard key={`col1-${i}`} body={testimonial.body} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:50s] [--gap:1rem]">
            {secondColumn.map((testimonial, i) => (
              <TestimonialCard key={`col2-${i}`} body={testimonial.body} />
            ))}
          </Marquee>
        </div>
        
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-secondary to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-secondary to-transparent"></div>
      </div>
    </section>
  );
}

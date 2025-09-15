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
];

const TestimonialCard = ({ body }: { body: string }) => {
  return (
    <blockquote className="bg-black/50 border border-primary rounded-lg p-8 md:p-12 w-[350px] md:w-[450px] shrink-0">
      <p className="text-sm italic leading-normal">"{body}"</p>
    </blockquote>
  );
};

export default function About() {
  return (
    <section className="bg-secondary text-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-6">
            CURATORS OF THE UNEXPECTED
          </p>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-loose">
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
      <div className="relative">
        <Marquee pauseOnHover className="[--gap:2rem]">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} body={testimonial.body} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-secondary to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary to-transparent"></div>
      </div>
    </section>
  );
}

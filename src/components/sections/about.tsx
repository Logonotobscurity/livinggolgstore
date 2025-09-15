import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About() {
  return (
    <section className="bg-secondary text-white py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-6">
                CURATORS OF THE UNEXPECTED
            </p>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-loose">
                An invaluable resource for customers in Charlotte, NC and across the country. Living Gold is a retail showroom, interior design firm and e-commerce site focused on offering a selection of curated antiques, accessories and exclusive lines.
            </p>
        </div>

        <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">WHAT OTHERS SAY</p>
            <h2 className="font-headline text-4xl md:text-5xl font-bold">EVERY HOME TELLS A STORY</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <blockquote className="bg-black/50 border border-primary rounded-lg p-8 md:p-12">
            <p className="text-sm italic leading-normal">"Heather Smith of Charlotte's own Living Gold combines stylish and mature expertise with Modern and Bohemian elements. Living Gold remains my decades-long go-to for finds and inspiration."</p>
          </blockquote>
          <blockquote className="bg-black/50 border border-primary rounded-lg p-8 md:p-12">
            <p className="text-sm italic leading-normal">"I have had the privilege of working with Heather Smith of Living Gold for many years. A legacy of exceptional client service, community support, and great taste in an ever-changing world of interior design."</p>
          </blockquote>
          <blockquote className="bg-black/50 border border-primary rounded-lg p-8 md:p-12">
            <p className="text-sm italic leading-normal">"Anytime I'm looking for magic, I know to look to Living Gold. Heather Smith and her team consistently source the globe and return with only the finest luxury pieces."</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

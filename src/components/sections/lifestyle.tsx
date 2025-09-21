
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CategoryCard } from '@/components/category-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from '@/components/ui/carousel';

export default function Lifestyle() {
  const lifestyleCategories = [
    'lifestyle-decorative-objects',
    'lifestyle-vases-pots',
    'lifestyle-bowls-trays',
    'lifestyle-candles-matches',
    'lifestyle-gifts',
    'lifestyle-barware',
  ];

  const categories = PlaceHolderImages.filter(img => lifestyleCategories.includes(img.id));

  return (
      <section className="text-foreground py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-10">
              SHOP BY CATEGORY
            </h2>
            <h3 className="font-headline text-3xl md:text-5xl lg:text-7xl font-light uppercase text-foreground relative pb-6">
              ONE PIECE CAN INFORM AN ENTIRE HOME
               <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
            </h3>
          </div>
          <Carousel
              opts={{
              align: 'start',
              loop: true,
              }}
              className="w-full"
          >
              <CarouselContent className="-ml-4">
              {categories.map((product, index) => (
                  <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
                      <CategoryCard
                        product={product}
                        animationDelay={`${index * 0.1}s`}
                        className="w-full"
                        imageClassName="w-full h-full p-2 sm:p-6"
                      />
                  </CarouselItem>
              ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
              <CarouselProgress />
          </Carousel>
        </div>
      </section>
  );
}

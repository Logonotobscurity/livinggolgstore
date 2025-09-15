import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CategoryCard } from '@/components/category-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(201,169,97,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(201,169,97,0.08)_0%,_transparent_50%)]"></div>
       <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_rgba(201,169,97,0.02)_50%,_transparent_100%),linear-gradient(0deg,_rgba(0,0,0,0.1)_0%,_transparent_30%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-10">
            SHOP BY CATEGORY
          </p>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-7xl font-light uppercase text-white relative pb-6">
            ONE PIECE CAN INFORM AN ENTIRE HOME
             <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              animationDelay={`${index * 0.1}s`}
              className="w-full max-w-[300px] mx-auto"
            />
          ))}
        </div>
        <div className="md:hidden -mx-6">
            <Carousel
                opts={{
                align: 'start',
                loop: true,
                dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                {categories.map((category, index) => (
                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 pl-4">
                        <CategoryCard
                          category={category}
                          animationDelay={`${index * 0.1}s`}
                          className="w-full"
                        />
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
      </div>
    </section>
  );
}

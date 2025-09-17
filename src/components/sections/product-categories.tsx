import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CategoryCard } from '@/components/category-card';

export default function ProductCategories() {
  const productCategories = [
    'lighting-ceiling',
    'lighting-wall',
    'lighting-table',
    'lighting-floor',
  ];

  const categories = PlaceHolderImages.filter(img => productCategories.includes(img.id));

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-left mb-12 md:mb-20">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
            Explore Our Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get Inspired - Living Gold Selections for you
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              animationDelay={`${index * 0.05}s`}
              className="w-full"
              imageClassName="w-full h-full p-2 sm:p-6"
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

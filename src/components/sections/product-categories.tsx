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
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            Explore Our Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              title={category.title!}
              imageUrl={category.imageUrl}
              imageHint={category.imageHint}
              alt={category.description}
              animationDelay={`${index * 0.1}s`}
              className="w-full max-w-[400px] mx-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}


import { generateFeaturedFinds } from "@/ai/flows/generate-featured-finds";
import { CategoryCard } from "@/components/category-card";

export default async function FeaturedFinds() {
    const { heading, products } = await generateFeaturedFinds();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="py-20 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
                        {heading}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        AI-powered selections, just for you.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
                    {products.map((product, index) => (
                        <div key={product.id} className="flex flex-col">
                            <CategoryCard
                                product={product}
                                animationDelay={`${index * 0.1}s`}
                                imageClassName="w-full h-full p-2 sm:p-6"
                            />
                             <div className="mt-4 text-center p-3 bg-background/50 rounded-b-lg flex-grow flex items-center justify-center">
                                <p className="text-sm text-muted-foreground italic">"{product.reason}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </section>
    );
}

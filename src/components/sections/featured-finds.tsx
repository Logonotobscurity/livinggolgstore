
'use client';

import { useState, useTransition } from 'react';
import { generateFeaturedFinds, type GenerateFeaturedFindsOutput } from "@/ai/flows/generate-featured-finds";
import { CategoryCard } from "@/components/category-card";
import { Icons } from "@/components/icons";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FeaturedFinds() {
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<GenerateFeaturedFindsOutput | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        if (isRevealed) return;
        startTransition(async () => {
            const result = await generateFeaturedFinds();
            setData(result);
            setIsRevealed(true);
        });
    };

    if (!isRevealed) {
        return (
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
                            Let Our AI Be Your Guide
                        </h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                           Our AI assistant analyzes our collection for top-rated items, trending styles, and hidden gems. Click the button to reveal today's most recommended products, curated just for you.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="aspect-square flex items-center justify-center bg-background/50 border-dashed border-2">
                                <CardContent className="p-0">
                                    <Icons.helpCircle className="w-16 h-16 text-muted-foreground/30" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Button size="lg" onClick={handleReveal} disabled={isPending} showIcon>
                            {isPending ? (
                                <>
                                    <Icons.loader className="h-5 w-5 animate-spin mr-2" />
                                    Analyzing...
                                </>
                            ) : (
                                "Reveal Today's Finds"
                            )}
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
    
    if (isPending && !data) {
         return (
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col justify-center items-center text-center py-8 text-muted-foreground">
                        <Icons.loader className="h-8 w-8 animate-spin mb-4" />
                        <p>Our AI curator is analyzing the collection...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!data || !data.products || data.products.length === 0) {
        return null;
    }

    return (
        <section className="py-20 md:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">
                        {data.heading}
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16">
                    {data.products.map((product, index) => (
                        <div key={product.id} className="flex flex-col">
                            <CategoryCard
                                product={product}
                                animationDelay={`${index * 0.1}s`}
                                imageClassName="w-full h-full p-2 sm:p-6"
                            />
                            {product.reason && (
                                <div className="mt-4 text-center p-3 bg-background/50 rounded-b-lg flex-grow flex items-center justify-center">
                                    <p className="text-sm text-muted-foreground italic">"{product.reason}"</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
      </section>
    );
}


'use client';

import { useState, useEffect, useTransition } from 'react';
import { generateFeaturedFinds, type GenerateFeaturedFindsOutput } from "@/ai/flows/generate-featured-finds";
import { CategoryCard } from "@/components/category-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import _ from 'lodash';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getStaticFeaturedProducts() {
    const shuffledProducts = _.shuffle(PlaceHolderImages);
    const selectedProducts = [];
    const usedCategories = new Set<string>();

    for (const product of shuffledProducts) {
        if (selectedProducts.length >= 4) break;
        if (product.category && !usedCategories.has(product.category)) {
            selectedProducts.push({
                ...product,
                reason: "A standout choice for your home."
            });
            usedCategories.add(product.category);
        }
    }

    if (selectedProducts.length < 4) {
        const fallback = shuffledProducts.slice(0, 4 - selectedProducts.length).map(p => ({...p, reason: "An elegant and sophisticated choice."}));
        selectedProducts.push(...fallback);
    }
    
    return {
        heading: "Curator's Featured Finds",
        products: selectedProducts
    }
}


export default function FeaturedFinds() {
    const [isAiEnabled, setIsAiEnabled] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<GenerateFeaturedFindsOutput | null>(null);

    useEffect(() => {
        if (isAiEnabled) {
            startTransition(async () => {
                const result = await generateFeaturedFinds();
                setData(result);
            });
        } else {
            setData(getStaticFeaturedProducts());
        }
    }, [isAiEnabled]);

    const handleAiToggle = (enabled: boolean) => {
        setIsAiEnabled(enabled);
    }

    if (isPending && !data) {
        return (
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col justify-center items-center text-center py-8 text-muted-foreground">
                        <Icons.loader className="h-8 w-8 animate-spin mb-4" />
                        <p>AI is curating featured finds...</p>
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
                     <div className="flex items-center justify-center gap-2 mt-4">
                        <Label htmlFor="ai-featured-toggle" className="text-sm text-muted-foreground">✨ AI-Enhanced</Label>
                        <Switch id="ai-featured-toggle" checked={isAiEnabled} onCheckedChange={handleAiToggle} />
                    </div>
                </div>
                {isPending ? (
                    <div className="flex flex-col justify-center items-center text-center py-8 text-muted-foreground">
                        <Icons.loader className="h-8 w-8 animate-spin mb-4" />
                        <p>AI is curating featured finds...</p>
                    </div>
                ) : (
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
                )}
            </div>
      </section>
    );
}

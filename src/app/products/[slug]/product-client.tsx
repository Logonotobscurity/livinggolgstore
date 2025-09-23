
'use client';

import Image from 'next/image';
import { type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { CategoryCard } from '@/components/category-card';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import ShareModal from '@/components/share-modal';
import { useState, useEffect, useTransition } from 'react';
import { ProductSupport } from '@/components/product-support';
import { useToast } from '@/hooks/use-toast';
import { ProductReviewForm } from '@/components/product-review-form';
import { getAverageRating } from '@/lib/reviews';
import CmsLayout from '@/components/layout/cms-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VirtualStaging } from '@/components/virtual-staging';
import { generateRecommendations, type GenerateRecommendationsOutput } from '@/ai/flows/generate-recommendations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ProductClientProps {
    product: ImagePlaceholder;
    relatedProducts: ImagePlaceholder[]; 
    breadcrumb: { text: string; href?: string }[];
}

function Recommendations({ 
  products, 
  isAiEnabled 
}: { 
  products: GenerateRecommendationsOutput['recommendations'] | ImagePlaceholder[], 
  isAiEnabled: boolean 
}) {
    if (products.length === 0) {
        return <p className="text-center text-muted-foreground">No recommendations available at this time.</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
            {products.map((rec, index) => {
                 const isAiRec = 'reason' in rec;
                 return (
                    <div key={rec.id} className="flex flex-col">
                        <CategoryCard
                            product={rec}
                            animationDelay={`${index * 0.05}s`}
                            imageClassName="w-full h-full p-2 sm:p-6"
                        />
                        {isAiEnabled && isAiRec && (
                             <div className="mt-4 text-center p-2 bg-secondary rounded-b-lg flex-grow">
                                <p className="text-xs text-muted-foreground italic">"{rec.reason}"</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}


export default function ProductClient({ product, relatedProducts, breadcrumb }: ProductClientProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [ratingInfo, setRatingInfo] = useState({ average: 4.5, count: 12 });
  const [recommendations, setRecommendations] = useState<GenerateRecommendationsOutput['recommendations']>([]);
  const [isAiRecsEnabled, setIsAiRecsEnabled] = useState(false);
  const [isGeneratingRecs, startGeneratingRecs] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRating = async () => {
      const newRatingInfo = await getAverageRating(product.title || 'this product');
      setRatingInfo(newRatingInfo);
    };
    fetchRating();
  }, [product.title]);

  const handleAiToggle = (enabled: boolean) => {
    setIsAiRecsEnabled(enabled);
    if (enabled && recommendations.length === 0) {
        startGeneratingRecs(async () => {
            const recs = await generateRecommendations({ productId: product.id });
            setRecommendations(recs.recommendations);
        });
    }
  }

  const handleReviewSubmit = async () => {
    // Re-fetch the average rating after a review is submitted
    const newRatingInfo = await getAverageRating(product.title || 'this product');
    setRatingInfo(newRatingInfo);
  };

  const formatPrice = (price?: string) => {
    if (!price) return 'Contact for price';
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) return 'Contact for price';
    return `Est. ₦${priceNumber.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title || 'Product Name Not Available',
      sku: product.id.toUpperCase(),
      image: product.imageUrl,
      price: parseFloat(product.price || '0'),
      slug: product.slug,
    });
    toast({
      title: 'Added to Quote Cart',
      description: product.title,
    });
  };

  const handleWishlistToggle = () => {
    const wasInWishlist = isInWishlist(product.id);
    toggleWishlist({
      id: product.id,
      name: product.title || 'Product Name Not Available',
      sku: product.id.toUpperCase(),
      image: product.imageUrl,
      price: parseFloat(product.price || '0'),
      slug: product.slug,
    });
    toast({
      title: wasInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: product.title,
    });
  };

  const isWishlisted = isInWishlist(product.id);
  
  const renderStars = () => {
    const stars = [];
    const roundedAverage = Math.round(ratingInfo.average);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icons.star
          key={i}
          className={cn(
            'w-5 h-5',
            i <= roundedAverage ? 'fill-current text-primary' : 'fill-muted-foreground/50 text-muted-foreground/50'
          )}
        />
      );
    }
    return stars;
  };

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="w-full flex justify-center items-center p-4 sm:p-8 bg-secondary rounded-lg aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={500}
              height={500}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="md:py-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-primary">
                {renderStars()}
              </div>
              <a href="#reviews" className="ml-3 text-sm text-muted-foreground hover:underline">({ratingInfo.count} Reviews)</a>
            </div>

            <p className="text-3xl md:text-4xl font-bold text-primary mb-8">{formatPrice(product.price)}</p>

            <div className="flex items-stretch gap-2 sm:gap-4 mb-8">
                <Button variant="default" size="lg" className="flex-grow" onClick={handleAddToCart} showIcon>Add to Quote Cart</Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className="w-12 h-12"
                  onClick={handleWishlistToggle}
                >
                    <Icons.heart className={cn("w-6 h-6", { "fill-current text-primary": isWishlisted })} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Share this product"
                  className="w-12 h-12"
                  onClick={() => setShareModalOpen(true)}
                >
                    <Icons.share className="w-6 h-6" />
                </Button>
            </div>
            
            <p className="text-lg md:text-xl mb-6 text-muted-foreground">{product.description}</p>
          </div>
        </div>

        <div className="border-t border-primary/30 my-16 md:my-24" />

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="details">Details & Specs</TabsTrigger>
            <TabsTrigger value="staging">Virtual Staging</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="py-10">
              <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  An exquisite piece that combines timeless elegance with modern design. Perfect for creating a focal point in any room, this {product.title?.toLowerCase()} offers both functionality and unparalleled style. Crafted from the finest materials.
                </p>
                <div className="text-sm space-y-2 border-t border-border pt-6">
                    <p><span className="font-semibold text-foreground w-32 inline-block">Category:</span> {product.category}</p>
                    <p><span className="font-semibold text-foreground w-32 inline-block">SKU:</span> {product.id.toUpperCase()}</p>
                    <p><span className="font-semibold text-foreground w-32 inline-block">Materials:</span> Metal, Glass, Fabric</p>
                    <p><span className="font-semibold text-foreground w-32 inline-block">Dimensions:</span> Varies by selection</p>
                    <p><span className="font-semibold text-foreground w-32 inline-block">Voltage:</span> 220-240V compatible</p>
                </div>
              </div>
          </TabsContent>
          
          <TabsContent value="staging" className="py-10">
            <VirtualStaging 
              productName={product.title || ''}
              imageUrl={product.imageUrl}
            />
          </TabsContent>

          <TabsContent value="reviews" className="py-10" id="reviews">
             <section aria-labelledby="reviews-heading">
              <div className="max-w-3xl mx-auto">
                <h2 id="reviews-heading" className="font-headline text-2xl md:text-3xl font-bold text-center mb-12 uppercase">
                  Write a Review
                </h2>
                <ProductReviewForm 
                  productName={product.title || 'this product'}
                  onReviewSubmit={handleReviewSubmit}
                />
              </div>
            </section>
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-primary/30 my-16 md:my-24" />

        <ProductSupport productName={product.title || 'this product'} />
        
        <div className="border-t border-primary/30 my-16 md:my-24" />

        <div className="mt-20 md:mt-24">
            <div className="text-center mb-12">
              <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase">You May Also Like</h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                  <Label htmlFor="ai-recs-toggle" className="text-sm text-muted-foreground">✨ AI-Enhanced</Label>
                  <Switch id="ai-recs-toggle" checked={isAiRecsEnabled} onCheckedChange={handleAiToggle} />
              </div>
            </div>

            {isGeneratingRecs ? (
                 <div className="flex flex-col justify-center items-center text-center py-8 text-muted-foreground">
                    <Icons.loader className="h-8 w-8 animate-spin mb-4" />
                    <p>AI is analyzing recommendations...</p>
                 </div>
            ) : (
                <Recommendations products={isAiRecsEnabled ? recommendations : relatedProducts} isAiEnabled={isAiRecsEnabled} />
            )}
        </div>

      </main>
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        shareUrl={typeof window !== 'undefined' ? window.location.href : ''} 
        shareTitle={product.title || 'Product Name Not Available'} 
      />
    </CmsLayout>
  );
}

    



import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PlaceHolderImages, ProductCategories, ProductCategory } from '@/lib/placeholder-images';
import CmsLayout from '@/components/layout/cms-layout';
import { CategoryCard } from '@/components/category-card';
import { Icons } from '@/components/icons';
import { ProductSupport } from '@/components/product-support';
import { Button } from '@/components/ui/button';

interface ProductsPageProps {
  searchParams: {
    category?: string;
  };
}

function getCategory(slug: string): ProductCategory | undefined {
  return ProductCategories.find(c => c.slug === slug);
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  if (searchParams.category) {
    const category = getCategory(searchParams.category);
    if (category) {
      return {
        title: category.title,
        description: category.description,
      };
    }
  }

  return {
    title: 'All Products',
    description: 'Explore all product categories at Living Gold.',
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: categorySlug } = searchParams;
  
  if (categorySlug) {
    const category = getCategory(categorySlug);

    if (!category) {
      return (
        <CmsLayout>
          <div className="text-center">
            <h1 className="text-4xl font-bold">Category Not Found</h1>
            <p className="mt-4">The category you're looking for does not exist.</p>
            <Button asChild className="mt-6">
              <Link href="/products">View All Categories</Link>
            </Button>
          </div>
        </CmsLayout>
      );
    }
    
    const products = PlaceHolderImages.filter(p => p.category === category.slug);
    const heroImage = PlaceHolderImages.find(p => p.id === category.heroImage);
    const breadcrumb = [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: category.title.replace(/Shop|in Nigeria|Luxury Light Spare Parts & Accessories/gi, '').trim() }
    ];

    return (
      <CmsLayout breadcrumb={breadcrumb}>
        {heroImage && (
          <section className="relative flex items-center justify-center text-center text-white overflow-hidden -mt-16 md:-mt-24 py-20 md:py-28">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-headline text-4xl md:text-6xl font-bold uppercase">
                {category.title.replace(/Shop|in Nigeria|Luxury Light Spare Parts & Accessories/gi, '').trim()}
              </h1>
              <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-gray-200">{category.description}</p>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
              {products.map((product, index) => (
                <CategoryCard 
                  key={product.id} 
                  product={product} 
                  animationDelay={`${index * 0.05}s`}
                  imageClassName="w-full h-full p-2 sm:p-6"
                />
              ))}
            </div>
          </div>
        </section>

        {category.slug === 'accessories' && (
          <section className="py-16 md:py-24 border-t border-primary/10">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">Trade & Technical Supplies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  For our trade partners, we provide access to essential installation materials. We stock high-quality conduit, surface and casting wiring, and specialized transformers to ensure every project meets the highest standards of safety and execution.
              </p>
              <Button asChild variant="outline">
                  <Link href="/contact">Contact Our Trade Desk</Link>
              </Button>
              </div>
          </section>
        )}
        
        <ProductSupport productName={category.title} />
        <div className="my-24 md:my-32" />
      </CmsLayout>
    );
  }

  // Fallback: Show all top-level categories if no category is specified
  const topLevelCategories = ProductCategories.filter(c => !c.parent);
  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Products' }
  ];

  return (
    <CmsLayout breadcrumb={breadcrumb}>
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold mb-4">Explore Our Products</h1>
        <p className="text-lg text-muted-foreground mb-16">Discover our curated collections of luxury lighting and decor.</p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topLevelCategories.map(cat => (
                <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="block group">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            src={PlaceHolderImages.find(p => p.id === cat.heroImage)?.imageUrl || ''}
                            alt={cat.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white font-headline text-3xl font-bold">{cat.title.replace(/Shop|in Nigeria|Luxury Light Spare Parts & Accessories/gi, '').trim()}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </CmsLayout>
  );
}

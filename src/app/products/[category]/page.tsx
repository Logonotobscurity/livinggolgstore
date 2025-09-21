
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PlaceHolderImages, ProductCategories } from '@/lib/placeholder-images';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { CategoryCard } from '@/components/category-card';
import { Icons } from '@/components/icons';
import { ProductSupport } from '@/components/product-support';
import { Button } from '@/components/ui/button';


export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = ProductCategories.find(c => c.slug === params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export function generateStaticParams() {
  return ProductCategories.map(c => ({
    category: c.slug,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = ProductCategories.find(c => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const products = PlaceHolderImages.filter(p => p.category === category.parent);
  const heroImage = PlaceHolderImages.find(p => p.id === category.heroImage);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <Header />
      <main className="flex-grow">
        {heroImage && (
          <section className="relative h-64 md:h-80 flex items-center justify-center text-center text-white overflow-hidden">
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
              <nav className="flex justify-center items-center text-sm mb-4">
                <Link href="/" className="hover:text-primary">Home</Link>
                <Icons.chevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-300">{category.title}</span>
              </nav>
              <h1 className="font-headline text-5xl md:text-7xl font-bold uppercase">
                {category.slug.replace(/-/g, ' ')}
              </h1>
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
          
          <ProductSupport />
        <div className="my-24 md:my-32" />
      </main>
      <div className="border-t border-primary/30" />
      <Footer />
    </div>
  );
}

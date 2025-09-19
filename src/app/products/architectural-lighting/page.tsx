
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { CategoryCard } from '@/components/category-card';
import { Icons } from '@/components/icons';
import { ProductSupport } from '@/components/product-support';
import type { Metadata } from 'next';
import { ReusableBackground } from '@/components/reusable-background';

export const metadata: Metadata = {
  title: 'Shop Architectural Lighting',
  description: 'Discover modern recessed lighting, track lights, and specialty accent lights to create focused, layered illumination in any room.',
};

export default function ArchitecturalLightingPage() {
  const products = PlaceHolderImages.filter(p => p.id.startsWith('recessed-lighting-') || p.id.startsWith('specialty-lighting-'));
  const heroImage = products.length > 0 ? products[0] : PlaceHolderImages.find(p => p.id === 'lightscape-3');

  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
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
            <div className="relative z-10 container mx-auto px-6">
              <nav className="flex justify-center items-center text-sm mb-4">
                <Link href="/" className="hover:text-primary">Home</Link>
                <Icons.chevronRight className="h-4 w-4 mx-1" />
                <Link href="/products/ceiling-lights" className="hover:text-primary">Lighting</Link>
                <Icons.chevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-300">Architectural Lighting</span>
              </nav>
              <h1 className="font-headline text-4xl md:text-6xl font-bold">
                ARCHITECTURAL LIGHTING
              </h1>
            </div>
          </section>
        )}

        <ReusableBackground>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-7xl">
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
          <ProductSupport />
        </ReusableBackground>
        <div className="my-24 md:my-32" />
      </main>
      <div className="text-wrapper">
          <hr className="section-divider" />
      </div>
      <Footer />
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { CategoryCard } from '@/components/category-card';
import { Icons } from '@/components/icons';
import { ProductSupport } from '@/components/product-support';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Light Spare Parts & Accessories in Nigeria',
  description: 'Find essential Nigeria luxury lights spare parts at Living Gold, including downrods, remotes, and specialty bulbs to complete your lighting setup.',
};

export default function AccessoriesPage() {
  const products = PlaceHolderImages.filter(p => p.id.startsWith('accessories-') && p.id !== 'accessories-hero');
  const heroImage = PlaceHolderImages.find(p => p.id === 'accessories-hero');

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white">
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
                <span className="text-gray-400">Collections</span>
                <Icons.chevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-300">Accessories</span>
              </nav>
              <h1 className="font-headline text-5xl md:text-7xl font-bold">
                ACCESSORIES
              </h1>
            </div>
          </section>
        )}

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
      </main>
      <Footer />
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { TabletopProductCard } from '@/components/tabletop-product-card';
import { ChevronRight } from 'lucide-react';

export default function TabletopPage() {
  const tabletopProducts = PlaceHolderImages.filter(p => p.id.startsWith('tabletop-') && p.id !== 'tabletop-hero');
  const heroImage = PlaceHolderImages.find(p => p.id === 'tabletop-hero');

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
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-400">Collections</span>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-300">All Tabletop</span>
              </nav>
              <h1 className="font-headline text-5xl md:text-7xl font-bold">
                ALL TABLETOP
              </h1>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
              {tabletopProducts.map((product) => (
                <TabletopProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

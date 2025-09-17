import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { CategoryCard } from '@/components/category-card';
import { Icons } from '@/components/icons';

export default function RoomSettingsPage() {
  const products = PlaceHolderImages.filter(p => p.id.startsWith('room-settings-'));
  const heroImage = PlaceHolderImages.find(p => p.id === 'room-settings-hero');

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
                <span className="text-gray-300">Room Settings</span>
              </nav>
              <h1 className="font-headline text-5xl md:text-7xl font-bold">
                ROOM SETTINGS
              </h1>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative aspect-[4/3] block rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.description}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={product.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <h3 className="text-white text-lg font-bold">{product.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

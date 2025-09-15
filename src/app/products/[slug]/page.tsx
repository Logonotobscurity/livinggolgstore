import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Star } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export async function generateStaticParams() {
  return PlaceHolderImages.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PlaceHolderImages.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PlaceHolderImages.filter(p => p.id.startsWith('lighting') && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="w-full flex justify-center items-center p-8 bg-gray-100 rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.description}
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
          <div className="pt-8">
            <h1 className="font-headline text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-500 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 text-gray-300 fill-current" />
              </div>
              <span className="ml-3 text-sm text-gray-600">(12 Reviews)</span>
            </div>

            <p className="text-4xl font-bold text-primary mb-8">$199.99</p>

            <div className="flex items-center gap-4 mb-8">
                <Button size="lg" className="flex-grow bg-primary text-black hover:bg-yellow-600">Add to Cart</Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Heart className="w-6 h-6" />
                </Button>
            </div>

            <p className="text-gray-700 leading-relaxed">
              An exquisite piece that combines timeless elegance with modern design. Perfect for creating a focal point in any room, this {product.title?.toLowerCase()} offers both functionality and unparalleled style. Crafted from the finest materials.
            </p>

             <div className="mt-8 text-sm text-gray-600">
                <p><span className="font-semibold">Category:</span> Lighting</p>
                <p><span className="font-semibold">SKU:</span> {product.id.toUpperCase()}</p>
             </div>
          </div>
        </div>

        <div className="mt-24">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(related => (
                     <div key={related.id} className="group text-center">
                         <div className="bg-gray-100 p-6 rounded-lg mb-4">
                            <Image src={related.imageUrl} alt={related.description} width={300} height={300} className="object-contain mx-auto group-hover:scale-105 transition-transform" />
                         </div>
                         <h3 className="font-semibold text-lg">{related.title}</h3>
                         <p className="text-primary">$179.99</p>
                     </div>
                ))}
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

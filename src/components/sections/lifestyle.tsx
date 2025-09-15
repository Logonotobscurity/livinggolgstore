import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Lifestyle() {
  const lifestyleCategories = [
    'lifestyle-bowls-trays',
    'lifestyle-candles-matches',
    'lifestyle-gifts',
    'lifestyle-barware',
    'lifestyle-diffusers',
    'lifestyle-pillows-throws',
  ];

  const categories = PlaceHolderImages.filter(img => lifestyleCategories.includes(img.id));

  return (
    <section className="bg-secondary text-white py-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">
            SHOP BY CATEGORY
          </p>
          <h2 className="font-headline text-5xl font-bold text-white">
            ONE PIECE CAN INFORM AN ENTIRE HOME
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 max-w-3xl mx-auto">
          {categories.map((category) => (
            <Link href="#" key={category.id} className="group text-center transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <div className="relative w-[180px] h-[150px] mx-auto mb-4 rounded-lg overflow-hidden bg-gray-700">
                <Image
                  src={category.imageUrl}
                  alt={category.description}
                  fill
                  className="object-cover"
                  data-ai-hint={category.imageHint}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 180px"
                />
              </div>
              <h3 className="text-sm font-bold tracking-[0.1em] uppercase">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

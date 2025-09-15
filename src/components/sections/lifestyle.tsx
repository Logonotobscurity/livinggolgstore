import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Lifestyle() {
  const lifestyleCategories = [
    'lifestyle-decorative-objects',
    'lifestyle-vases-pots',
    'lifestyle-bowls-trays',
    'lifestyle-candles-matches',
    'lifestyle-gifts',
    'lifestyle-barware',
  ];

  const categories = PlaceHolderImages.filter(img => lifestyleCategories.includes(img.id));

  return (
    <section className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(201,169,97,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(201,169,97,0.08)_0%,_transparent_50%)]"></div>
       <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_0%,_rgba(201,169,97,0.02)_50%,_transparent_100%),linear-gradient(0deg,_rgba(0,0,0,0.1)_0%,_transparent_30%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-10">
            SHOP BY CATEGORY
          </p>
          <h2 className="font-headline text-4xl md:text-7xl font-light uppercase text-white relative pb-6">
            ONE PIECE CAN INFORM AN ENTIRE HOME
             <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {categories.map((category, index) => (
            <Link 
                href="#" 
                key={category.id} 
                className="group product-card text-center transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] opacity-0 translate-y-10"
                style={{ animation: 'revealCard 0.8s cubic-bezier(0.4,0,0.2,1) forwards', animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-frame w-full aspect-square border-3 border-gray-700/50 bg-transparent flex justify-center items-center mb-8 p-4 relative overflow-hidden backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-primary group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,169,97,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]">
                 <div className="inner-frame w-full h-full bg-gradient-to-br from-white to-neutral-100 flex justify-center items-center rounded-sm relative overflow-hidden shadow-inner">
                    <Image
                      src={category.imageUrl}
                      alt={category.description}
                      width={150}
                      height={150}
                      className="product-image w-3/4 h-3/4 object-contain transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] filter drop-shadow-md group-hover:scale-105 group-hover:[transform:scale(1.05)_rotateY(5deg)] group-hover:drop-shadow-lg"
                      data-ai-hint={category.imageHint}
                    />
                 </div>
              </div>
              <h3 className="category-label text-sm font-medium tracking-[0.15em] uppercase text-yellow-300 relative transition-all duration-300 ease-in-out group-hover:text-primary group-hover:-translate-y-0.5 group-hover:text-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                {category.title}
                 <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-10 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add keyframes to globals.css if they don't exist
/*
@keyframes revealCard {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}
*/

import Image from 'next/image';
import Link from 'next/link';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface TabletopProductCardProps {
  product: ImagePlaceholder;
}

export function TabletopProductCard({ product }: TabletopProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block text-left" role="link" aria-label={`View ${product.title}`}>
      <div className="w-full aspect-square p-4 border border-primary/50 bg-white flex justify-center items-center mb-4 relative overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-black focus-within:ring-primary">
        <Image
          src={product.imageUrl}
          alt={product.description}
          width={400}
          height={400}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
      </div>
      <div className="px-1">
        <h3 className="text-xs font-normal tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
          {product.title}
        </h3>
        {product.price && (
          <p className="mt-1 text-sm font-medium text-gray-400">
            {product.price.startsWith('FROM') ? '' : '$'}{product.price}
          </p>
        )}
      </div>
    </Link>
  );
}

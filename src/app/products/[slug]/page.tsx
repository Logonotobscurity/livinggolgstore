
import { notFound } from 'next/navigation';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import type { Metadata, ResolvingMetadata } from 'next';
import ProductClient from './product-client';

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for each product page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = PlaceHolderImages.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: "The product you are looking for does not exist.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.title} | Living Gold`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl, ...previousImages],
    },
  };
}

// Statically generate routes for all products at build time
export function generateStaticParams() {
  return PlaceHolderImages.map((product) => ({
    slug: product.slug,
  }));
}

function getProductBySlug(slug: string): ImagePlaceholder | undefined {
    return PlaceHolderImages.find((p) => p.slug === slug);
}

export default function ProductPage({ params: { slug } }: { params: { slug: string } }) {
  const product = getProductBySlug(slug);
  const relatedProducts = PlaceHolderImages.filter(p => p.id.startsWith('lighting') && p.slug !== slug).slice(0, 4);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}

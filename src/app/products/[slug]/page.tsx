
import { notFound } from 'next/navigation';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import type { Metadata, ResolvingMetadata } from 'next';
import ProductClient from './product-client';
import { ProductCategories } from '@/lib/placeholder-images';

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
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = PlaceHolderImages.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4);

  const breadcrumb = [
    { text: 'Home', href: '/' },
    { text: 'Products', href: '/products' },
  ];

  if (product.category) {
    const categoryInfo = ProductCategories.find(c => c.slug === product.category);
    if (categoryInfo) {
      breadcrumb.push({ text: categoryInfo.title, href: `/products?category=${categoryInfo.slug}` });
    }
  }

  breadcrumb.push({ text: product.title || 'Detail' });

  return <ProductClient product={product} relatedProducts={relatedProducts} breadcrumb={breadcrumb} />;
}

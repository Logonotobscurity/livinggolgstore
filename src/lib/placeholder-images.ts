
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  slug: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  title?: string;
  price?: string;
  category?: string;
};

export type ProductCategory = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  parent?: string;
}

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
export const ProductCategories: ProductCategory[] = data.productCategories;

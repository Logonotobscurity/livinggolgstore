import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  slug: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  title?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

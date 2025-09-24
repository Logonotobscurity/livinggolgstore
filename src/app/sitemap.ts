import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Static routes for the site
const staticRoutes = [
  '',
  '/about',
  '/contact',
  '/products',
  '/design-studio',
  '/inspiration-services',
];

// Product categories (can be made dynamic later)
const productCategories = [
  '/products/chandeliers-pendants',
  '/products/wall-sconces-vanity-lights',
  '/products/outdoor-lighting',
  '/products/accessories',
  '/products/room-settings',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://livinggolgstore.netlify.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Create sitemap entries for static routes
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Create sitemap entries for product categories
  const categoryEntries: MetadataRoute.Sitemap = productCategories.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Try to fetch dynamic product routes from Firestore
  let productEntries: MetadataRoute.Sitemap = [];
  
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    productEntries = productsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/products/${data.slug || doc.id}`,
        lastModified: data.updatedAt?.toDate?.()?.toISOString?.().split('T')[0] || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    // Continue with static entries if Firestore fetch fails
  }

  // Combine all entries
  return [...staticEntries, ...categoryEntries, ...productEntries];
}
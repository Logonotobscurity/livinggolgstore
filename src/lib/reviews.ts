// This is a mock database service.
// In a real application, this would be replaced by a database connection.

import { analyzeReviewSentiment } from "@/ai/flows/analyze-review-sentiment";

export interface Review {
    author: string;
    body: string;
    rating: number;
    productName: string;
    aiAnalysis?: {
        sentiment: 'positive' | 'negative' | 'neutral';
        score: number;
    };
}

// Start with a base set of testimonials
const reviews: Review[] = [
  {
    body: "Living Gold's collection is a treasure trove of unique finds. I always discover something extraordinary that elevates my design projects to the next level. Truly a designer's dream.",
    author: 'A. Adewusi, Interior Designer',
    rating: 5,
    productName: 'General'
  },
  {
    body: 'The quality and craftsmanship of the pieces from Living Gold are unparalleled. Each item tells a story and brings a sense of history and soul into the home.',
    author: 'K. Bello, Homeowner',
    rating: 4,
    productName: 'General'
  },
  {
    body: "From grand chandeliers to the smallest decorative objects, Living Gold's curation is impeccable. It's my first stop for sourcing items that make a statement.",
    author: 'F. Okoro, Architect',
    rating: 5,
    productName: 'General'
  },
  {
    body: 'Working with the Living Gold team was a seamless experience. Their expertise in lighting design and commitment to service made all the difference on our project.',
    author: 'L. Adeyemi, Property Developer',
    rating: 5,
    productName: 'General'
  },
  {
    body: 'The bespoke chandelier we commissioned is the centerpiece of our hotel lobby. Living Gold delivered a work of art that is both timeless and breathtaking.',
    author: 'General Manager, The Lagos Continental',
    rating: 5,
    productName: 'General'
  },
  {
    body: 'I appreciate the attention to detail and the clear communication throughout the import process. Living Gold makes sourcing luxury international lighting effortless.',
    author: 'T. Ibrahim, Procurement Manager',
    rating: 4,
    productName: 'General'
  },
];

/**
 * MOCK: Retrieves all reviews from the "database".
 * In a real app, this would fetch from a database.
 */
export async function getReviews(): Promise<Review[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return reviews;
}

/**
 * MOCK: Retrieves all reviews for a specific product.
 */
export async function getReviewsByProduct(productName: string): Promise<Review[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return reviews.filter(r => r.productName === productName);
}


/**
 * MOCK: Calculates the average rating for a product.
 */
export async function getAverageRating(productName: string): Promise<{ average: number; count: number }> {
    const productReviews = await getReviewsByProduct(productName);
    
    // Add some baseline reviews for products that don't have any yet
    const baseReviews = [4, 5, 4, 5, 5, 4, 3, 5, 4, 5, 5, 4];
    const allRatings = [...baseReviews, ...productReviews.map(r => r.rating)];

    if (allRatings.length === 0) {
        return { average: 4.5, count: 12 };
    }

    const sum = allRatings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / allRatings.length;
    
    return {
        average: Math.round(average * 10) / 10, // Round to one decimal place
        count: allRatings.length
    };
}


/**
 * MOCK: Adds a new review to the "database" after analyzing its sentiment.
 * In a real app, this would write to a database.
 */
export async function addReview(review: Omit<Review, 'aiAnalysis'>): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Analyze sentiment before saving
  const aiAnalysis = await analyzeReviewSentiment({ text: review.body });
  const enrichedReview: Review = { ...review, aiAnalysis };

  // Add to the beginning of the array to show newest first
  reviews.unshift(enrichedReview); 
  
  console.log('--- Mock Review Added with AI Analysis ---');
  console.log(enrichedReview);
  console.log('--- Current Reviews ---');
  console.log(reviews);
}

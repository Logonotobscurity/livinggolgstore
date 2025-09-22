
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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
    createdAt?: Date;
}

const mockReviews: Review[] = [
    { author: 'Amaka N.', body: "The quality is immediately apparent. It has become a stunning centerpiece in our dining room.", rating: 5, productName: "Modo 3 Sided Chandelier" },
    { author: 'Tunde A.', body: "Excellent build quality and gives off a beautiful, warm light. Very happy with my purchase for our Lagos home.", rating: 5, productName: "Spur LED Chandelier" },
    { author: 'Fatima B.', body: "This is a true work of art. It transformed our entryway in Asaba. The craftsmanship is exceptional.", rating: 5, productName: "Stingray Chandelier" },
    { author: 'David O.', body: "Installation was straightforward and the result is breathtaking. It's the jewel of our new home.", rating: 4, productName: "J-US LED Chandelier" },
    { author: 'Aisha I.', body: "A design classic. The soft, diffused light is perfect for our minimalist living room. Worth every naira.", rating: 5, productName: "PH 5 Pendant Light" },
    { author: 'Chinedu E.', body: "Sleek, modern, and very effective over our kitchen island. It provides great task lighting without being harsh.", rating: 4, productName: "Random Stick Linear Suspension" },
];


const reviewsCollection = collection(db, 'reviews');

/**
 * Retrieves all reviews from Firestore, falling back to mock data.
 */
export async function getReviews(): Promise<Review[]> {
  try {
    const snapshot = await getDocs(reviewsCollection);
    const reviews: Review[] = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() } as Review & { id: string });
    });
    
    if (reviews.length === 0) {
        return mockReviews;
    }

    return reviews.sort((a, b) => (new Date(b.createdAt as any).getTime() || 0) - (new Date(a.createdAt as any).getTime() || 0));
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return mockReviews;
  }
}

/**
 * Retrieves all reviews for a specific product from Firestore.
 */
export async function getReviewsByProduct(productName: string): Promise<Review[]> {
  try {
    const q = query(reviewsCollection, where("productName", "==", productName));
    const snapshot = await getDocs(q);
    const reviews: Review[] = [];
    snapshot.forEach(doc => {
      reviews.push({ id: doc.id, ...doc.data() } as Review & { id: string });
    });

    const filteredMockReviews = mockReviews.filter(r => r.productName === productName);
    const combined = [...filteredMockReviews, ...reviews];

    return combined.sort((a, b) => (new Date(b.createdAt as any).getTime() || 0) - (new Date(a.createdAt as any).getTime() || 0));
  } catch (error) {
    console.error(`Error fetching reviews for ${productName}: `, error);
    return mockReviews.filter(r => r.productName === productName);
  }
}


/**
 * Calculates the average rating for a product from Firestore.
 */
export async function getAverageRating(productName: string): Promise<{ average: number; count: number }> {
    const productReviews = await getReviewsByProduct(productName);
    
    if (productReviews.length === 0) {
        // Fallback for products with no reviews at all
        const baseReviews = [4, 5, 4, 5, 5, 4, 3, 5, 4, 5, 5, 4];
         const sum = baseReviews.reduce((acc, rating) => acc + rating, 0);
        return { 
            average: Math.round((sum / baseReviews.length) * 10) / 10,
            count: baseReviews.length 
        };
    }

    const allRatings = productReviews.map(r => r.rating);
    const sum = allRatings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / allRatings.length;
    
    return {
        average: Math.round(average * 10) / 10, // Round to one decimal place
        count: allRatings.length
    };
}


/**
 * Adds a new review to Firestore after analyzing its sentiment.
 */
export async function addReview(review: Omit<Review, 'aiAnalysis' | 'createdAt'>): Promise<void> {
  try {
    // Analyze sentiment before saving
    const aiAnalysis = await analyzeReviewSentiment({ text: review.body });
    const enrichedReview: Review = { 
        ...review, 
        aiAnalysis,
        createdAt: new Date(),
    };

    await addDoc(reviewsCollection, enrichedReview);

    console.log('--- Firestore Review Added with AI Analysis ---');
    console.log(enrichedReview);
  } catch (error) {
      console.error("Error adding review: ", error);
  }
}

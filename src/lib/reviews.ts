// This is a mock database service.
// In a real application, this would be replaced by a database connection.

export interface Review {
    author: string;
    body: string;
    rating: number;
    productName: string;
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
    rating: 5,
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
    rating: 5,
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
 * MOCK: Adds a new review to the "database".
 * In a real app, this would write to a database.
 */
export async function addReview(review: Review): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add to the beginning of the array to show newest first
  reviews.unshift(review); 
  
  console.log('--- Mock Review Added ---');
  console.log(review);
  console.log('--- Current Reviews ---');
  console.log(reviews);
}

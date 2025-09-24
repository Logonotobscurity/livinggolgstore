'use server';

import { ai } from '../genkit';
import { z } from 'genkit';
import { type EnrichedContext } from './context-manager';
import { type ImagePlaceholder } from '@/lib/placeholder-images';

interface EnhancedProduct extends ImagePlaceholder {
  nigerianInsights?: {
    localAvailability: string;
    priceInNaira: string;
    powerCompatibility: string;
    importDuties?: string;
    deliveryTime: string;
    popularityInNigeria: string;
    culturalFit: string;
    installationConsiderations?: string;
  };
  priceAnalysis?: {
    segment: 'budget' | 'mid-range' | 'premium' | 'luxury';
    valueForMoney: string;
    comparativePrice: string;
  };
}

export class NigerianMarketIntelligence {
  private marketInsightsPrompt = ai.definePrompt({
    name: 'generateNigerianMarketInsights',
    input: {
      schema: z.object({
        productTitle: z.string(),
        productDescription: z.string(),
        price: z.string().optional(),
        category: z.string().optional(),
        seasonalFactors: z.array(z.string()).optional()
      })
    },
    output: {
      schema: z.object({
        powerCompatibility: z.string(),
        popularityInNigeria: z.string(),
        culturalFit: z.string(),
        installationTip: z.string().optional()
      })
    },
    prompt: `You are a lighting expert familiar with the Nigerian market and Living Gold's luxury positioning.

Product: {{productTitle}}
Description: {{productDescription}}
{{#if price}}Price: ₦{{price}}{{/if}}
{{#if category}}Category: {{category}}{{/if}}
{{#if seasonalFactors}}Current Season: {{seasonalFactors}}{{/if}}

Generate brief, practical insights for Nigerian customers:

1. Power Compatibility: Consider Nigerian power supply (220-240V, frequent fluctuations)
2. Popularity: How well this type suits Nigerian homes/offices
3. Cultural Fit: Relevance to Nigerian lifestyle and preferences
4. Installation Tip: Any Nigeria-specific installation advice

Keep each insight to 10-15 words. Be specific to Nigeria, not generic.`
  });
  
  async enhance(result: any, context: EnrichedContext): Promise<any> {
    // If result has products, enhance them
    if (result.products && Array.isArray(result.products)) {
      const enhancedProducts = await this.enhanceProducts(
        result.products,
        context
      );
      
      return {
        ...result,
        products: enhancedProducts,
        marketTrends: this.getCurrentMarketTrends(context)
      };
    }
    
    // If result has recommendations, enhance them
    if (result.recommendations && Array.isArray(result.recommendations)) {
      const enhancedRecommendations = await this.enhanceProducts(
        result.recommendations,
        context
      );
      
      return {
        ...result,
        recommendations: enhancedRecommendations,
        priceAnalysis: this.analyzePricing(enhancedRecommendations)
      };
    }
    
    // Otherwise, just add market context
    return {
      ...result,
      marketContext: {
        currency: 'NGN',
        location: context.location || 'Nigeria',
        seasonalFactors: context.market?.seasonalFactors
      }
    };
  }
  
  private async enhanceProducts(
    products: any[],
    context: EnrichedContext
  ): Promise<EnhancedProduct[]> {
    return Promise.all(
      products.map(async (product) => {
        try {
          // Generate AI insights for Nigerian market
          const insights = await this.generateNigerianInsights(
            product,
            context
          );
          
          // Add Nigerian-specific enhancements
          const enhanced: EnhancedProduct = {
            ...product,
            nigerianInsights: {
              localAvailability: this.getAvailability(product),
              priceInNaira: this.formatNigerianPrice(product.price),
              powerCompatibility: insights.powerCompatibility,
              deliveryTime: this.estimateDeliveryTime(context.location),
              popularityInNigeria: insights.popularityInNigeria,
              culturalFit: insights.culturalFit,
              installationConsiderations: insights.installationTip
            },
            priceAnalysis: this.analyzeProductPrice(product)
          };
          
          return enhanced;
        } catch (error) {
          console.error('Error enhancing product:', error);
          // Return product with basic enhancements on error
          return {
            ...product,
            nigerianInsights: {
              localAvailability: 'Available on order',
              priceInNaira: this.formatNigerianPrice(product.price),
              powerCompatibility: 'Compatible with 220-240V',
              deliveryTime: '7-14 days',
              popularityInNigeria: 'Popular choice',
              culturalFit: 'Suitable for Nigerian homes'
            }
          };
        }
      })
    );
  }
  
  private async generateNigerianInsights(
    product: any,
    context: EnrichedContext
  ): Promise<any> {
    try {
      const { output } = await this.marketInsightsPrompt({
        productTitle: product.title || product.name || 'Lighting Product',
        productDescription: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        seasonalFactors: context.market?.seasonalFactors || []
      });
      
      return output || {
        powerCompatibility: 'Works with Nigerian power supply',
        popularityInNigeria: 'Growing popularity in upscale homes',
        culturalFit: 'Matches modern Nigerian aesthetics',
        installationTip: 'Professional installation recommended'
      };
    } catch (error) {
      console.error('Error generating Nigerian insights:', error);
      return {
        powerCompatibility: 'Compatible with 220-240V',
        popularityInNigeria: 'Popular choice',
        culturalFit: 'Suitable for Nigerian homes'
      };
    }
  }
  
  private formatNigerianPrice(price: string | number | undefined): string {
    if (!price) return 'Contact for price';
    
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return 'Contact for price';
    
    // Format with Nigerian locale
    return `₦${numPrice.toLocaleString('en-NG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
  
  private getAvailability(product: any): string {
    // Simulate availability based on category
    const quickShipCategories = ['table lamp', 'floor lamp', 'bulbs'];
    const category = (product.category || '').toLowerCase();
    
    if (quickShipCategories.some(cat => category.includes(cat))) {
      return 'In stock - Quick delivery';
    }
    
    if (category.includes('chandelier') || category.includes('custom')) {
      return 'Made to order - 3-4 weeks';
    }
    
    return 'Available - 7-14 days';
  }
  
  private estimateDeliveryTime(location?: string): string {
    const majorCities = ['lagos', 'abuja', 'port harcourt', 'delta'];
    const locationLower = (location || '').toLowerCase();
    
    if (majorCities.some(city => locationLower.includes(city))) {
      return '3-7 days express delivery';
    }
    
    return '7-14 days nationwide delivery';
  }
  
  private analyzeProductPrice(product: any): EnhancedProduct['priceAnalysis'] {
    const price = parseFloat(product.price || '0');
    
    let segment: 'budget' | 'mid-range' | 'premium' | 'luxury';
    let valueForMoney: string;
    let comparativePrice: string;
    
    if (price < 50000) {
      segment = 'budget';
      valueForMoney = 'Excellent value for money';
      comparativePrice = 'Very affordable option';
    } else if (price < 200000) {
      segment = 'mid-range';
      valueForMoney = 'Good balance of quality and price';
      comparativePrice = 'Competitively priced';
    } else if (price < 500000) {
      segment = 'premium';
      valueForMoney = 'Premium quality justifies price';
      comparativePrice = 'Investment piece';
    } else {
      segment = 'luxury';
      valueForMoney = 'Exclusive luxury item';
      comparativePrice = 'Top-tier pricing for discerning buyers';
    }
    
    return { segment, valueForMoney, comparativePrice };
  }
  
  private getCurrentMarketTrends(context: EnrichedContext): string[] {
    const trends: string[] = [];
    const seasonalFactors = context.market?.seasonalFactors || [];
    
    if (seasonalFactors.includes('christmas_season')) {
      trends.push('Decorative chandeliers trending for festive season');
      trends.push('Warm white LEDs popular for cozy ambiance');
    }
    
    if (seasonalFactors.includes('rainy_season')) {
      trends.push('Waterproof outdoor lighting in high demand');
      trends.push('Bright indoor lighting preferred during cloudy days');
    }
    
    // General Nigerian market trends
    trends.push('Smart lighting gaining popularity in urban areas');
    trends.push('Energy-efficient LEDs preferred due to power costs');
    trends.push('Gold and brass finishes align with local preferences');
    
    return trends.slice(0, 3); // Return top 3 trends
  }
  
  private analyzePricing(products: EnhancedProduct[]): any {
    if (!products.length) return null;
    
    const prices = products
      .map(p => parseFloat(p.price || '0'))
      .filter(p => p > 0);
    
    if (!prices.length) return null;
    
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return {
      average: this.formatNigerianPrice(avgPrice),
      range: `${this.formatNigerianPrice(minPrice)} - ${this.formatNigerianPrice(maxPrice)}`,
      recommendation: this.getPriceRecommendation(avgPrice)
    };
  }
  
  private getPriceRecommendation(avgPrice: number): string {
    if (avgPrice < 100000) {
      return 'Great options for budget-conscious buyers';
    } else if (avgPrice < 300000) {
      return 'Quality selections for mid-range budgets';
    } else {
      return 'Premium selections for luxury projects';
    }
  }
}
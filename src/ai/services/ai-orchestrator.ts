'use server';

import { type Intent } from './intent-classifier';
import { type UnifiedAIInput } from '../unified-ai-service';
import { type EnrichedContext } from './context-manager';

interface AICapabilities {
  search: (input: any) => Promise<any>;
  recommend: (input: any) => Promise<any>;
  featured: () => Promise<any>;
}

export class AIOrchestrator {
  constructor(private capabilities: AICapabilities) {}
  
  async execute(
    intent: Intent,
    input: UnifiedAIInput,
    context: EnrichedContext
  ): Promise<any> {
    console.log(`Orchestrating intent: ${intent.intent} with confidence: ${intent.confidence}`);
    
    try {
      switch (intent.intent) {
        case 'product_search':
          return await this.handleProductSearch(input, context, intent);
          
        case 'get_recommendation':
          return await this.handleRecommendation(input, context, intent);
          
        case 'browse_category':
          return await this.handleBrowseCategory(input, context, intent);
          
        case 'request_quote':
          return await this.handleQuoteRequest(input, context, intent);
          
        case 'expert_consultation':
          return await this.handleExpertConsultation(input, context, intent);
          
        case 'check_availability':
          return await this.handleAvailabilityCheck(input, context, intent);
          
        case 'compare_products':
          return await this.handleProductComparison(input, context, intent);
          
        default:
          return await this.handleGeneralInquiry(input, context, intent);
      }
    } catch (error) {
      console.error(`Orchestration error for intent ${intent.intent}:`, error);
      throw error;
    }
  }
  
  private async handleProductSearch(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // Build search query from input
    const searchQuery = this.buildSearchQuery(input, intent);
    
    // Execute search
    const searchResults = await this.capabilities.search({ query: searchQuery });
    
    // Enhance results with context
    return {
      ...searchResults,
      intent: intent.intent,
      searchQuery,
      filters: this.extractFilters(input, context)
    };
  }
  
  private async handleRecommendation(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // If we have a current product, get recommendations for it
    if (input.currentProductId) {
      const recommendations = await this.capabilities.recommend({
        productId: input.currentProductId
      });
      
      return {
        ...recommendations,
        intent: intent.intent,
        basedOn: input.currentProductId
      };
    }
    
    // Otherwise, get featured finds as recommendations
    const featured = await this.capabilities.featured();
    
    return {
      recommendations: featured.products,
      intent: intent.intent,
      reasoning: 'Based on popular and highly-rated products',
      heading: featured.heading
    };
  }
  
  private async handleBrowseCategory(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // Create a browsing query from preferences
    const browseQuery = [
      input.preferences?.category,
      input.preferences?.style,
      input.preferences?.roomType,
      'lighting'
    ].filter(Boolean).join(' ');
    
    const results = await this.capabilities.search({ query: browseQuery });
    
    return {
      ...results,
      intent: intent.intent,
      browsingMode: true,
      categories: this.getSuggestedCategories(input.preferences)
    };
  }
  
  private async handleQuoteRequest(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // For now, return products with quote preparation info
    const searchQuery = this.buildSearchQuery(input, intent);
    const products = await this.capabilities.search({ query: searchQuery });
    
    return {
      ...products,
      intent: intent.intent,
      quoteReady: true,
      quoteInstructions: {
        message: 'Select products to add to your quote',
        validityPeriod: 30, // days
        includesVAT: true,
        vatRate: 0.075
      }
    };
  }
  
  private async handleExpertConsultation(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // Get recommended products for the consultation context
    const featured = await this.capabilities.featured();
    
    return {
      products: featured.products,
      intent: intent.intent,
      expertAdvice: this.generateExpertAdvice(input, context),
      consultationTopics: [
        'Lighting design for your space',
        'Energy efficiency considerations',
        'Installation requirements',
        'Maintenance and care',
        'Budget optimization'
      ]
    };
  }
  
  private async handleAvailabilityCheck(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    const searchQuery = this.buildSearchQuery(input, intent);
    const products = await this.capabilities.search({ query: searchQuery });
    
    return {
      ...products,
      intent: intent.intent,
      availabilityInfo: {
        defaultLeadTime: '7-14 days',
        expressAvailable: true,
        deliveryZones: ['Lagos', 'Abuja', 'Port Harcourt', 'Delta State'],
        note: 'Contact us for specific product availability'
      }
    };
  }
  
  private async handleProductComparison(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // Get products for comparison
    const searchQuery = this.buildSearchQuery(input, intent);
    const products = await this.capabilities.search({ query: searchQuery });
    
    // Limit to top 4 for comparison
    const compareProducts = products.results?.slice(0, 4) || [];
    
    return {
      products: compareProducts,
      intent: intent.intent,
      comparisonMode: true,
      comparisonFeatures: [
        'Price',
        'Style',
        'Dimensions',
        'Light Output',
        'Energy Efficiency',
        'Installation Type'
      ]
    };
  }
  
  private async handleGeneralInquiry(
    input: UnifiedAIInput,
    context: EnrichedContext,
    intent: Intent
  ): Promise<any> {
    // Return featured products as a general response
    const featured = await this.capabilities.featured();
    
    return {
      ...featured,
      intent: intent.intent,
      generalInfo: {
        businessHours: 'Monday - Saturday: 9AM - 7PM',
        location: 'Okpanam Road, Asaba, Delta State, Nigeria',
        contact: '+234 701 113 1333',
        services: [
          'Professional lighting consultation',
          'Custom orders and sourcing',
          'Installation services',
          'After-sales support'
        ]
      }
    };
  }
  
  private buildSearchQuery(input: UnifiedAIInput, intent: Intent): string {
    const parts: string[] = [];
    
    // Add query if present
    if (input.query) {
      parts.push(input.query);
    }
    
    // Add preferences
    if (input.preferences) {
      const { style, roomType, category } = input.preferences;
      parts.push(...[style, roomType, category].filter(Boolean));
    }
    
    // Add entities from intent
    if (intent.entities) {
      const { productType, style, room } = intent.entities;
      parts.push(...[productType, style, room].filter(Boolean));
    }
    
    // Default to 'lighting' if no query
    if (parts.length === 0) {
      parts.push('lighting');
    }
    
    return parts.join(' ');
  }
  
  private extractFilters(input: UnifiedAIInput, context: EnrichedContext): any {
    return {
      priceRange: input.preferences?.budget,
      style: input.preferences?.style,
      roomType: input.preferences?.roomType,
      category: input.preferences?.category,
      location: context.location
    };
  }
  
  private getSuggestedCategories(preferences: any): string[] {
    const categories = [
      'Chandeliers & Pendants',
      'Wall Sconces & Vanity Lights',
      'Table & Floor Lamps',
      'Outdoor Lighting',
      'Smart Lighting',
      'Decorative Bulbs'
    ];
    
    // Filter based on preferences if available
    if (preferences?.roomType === 'outdoor') {
      return ['Outdoor Lighting', 'Smart Lighting'];
    }
    
    if (preferences?.style === 'modern') {
      return ['Smart Lighting', 'Chandeliers & Pendants', 'Wall Sconces & Vanity Lights'];
    }
    
    return categories.slice(0, 4);
  }
  
  private generateExpertAdvice(input: UnifiedAIInput, context: EnrichedContext): string[] {
    const advice: string[] = [];
    
    if (input.preferences?.roomType) {
      advice.push(`For ${input.preferences.roomType} lighting, consider both ambient and task lighting`);
    }
    
    if (input.preferences?.style) {
      advice.push(`${input.preferences.style} style lighting can transform your space dramatically`);
    }
    
    if (context.market?.seasonalFactors?.includes('rainy_season')) {
      advice.push('During rainy season, ensure proper moisture protection for outdoor fixtures');
    }
    
    advice.push('We recommend LED options for energy efficiency in Nigeria');
    advice.push('Consider voltage stabilizers for sensitive lighting systems');
    
    return advice;
  }
}
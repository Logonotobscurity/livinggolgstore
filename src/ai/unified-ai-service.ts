'use server';

import { productSearch, type ProductSearchOutput } from './flows/product-search';
import { generateRecommendations, type GenerateRecommendationsOutput } from './flows/generate-recommendations';
import { generateFeaturedFinds, type GenerateFeaturedFindsOutput } from './flows/generate-featured-finds';
import { ai } from './genkit';
import { z } from 'genkit';
import { ContextManager } from './services/context-manager';
import { IntentClassifier } from './services/intent-classifier';
import { AIOrchestrator } from './services/ai-orchestrator';
import { NigerianMarketIntelligence } from './services/nigerian-market-intelligence';

// Unified input schema that can handle multiple interaction types
export const UnifiedAIInputSchema = z.object({
  // Text-based input
  query: z.string().optional().describe('Natural language query from user'),
  
  // Structured preferences (from AI Consultant UI)
  preferences: z.object({
    style: z.string().optional(),
    roomType: z.string().optional(),
    category: z.string().optional(),
    budget: z.object({
      min: z.number().optional(),
      max: z.number().optional()
    }).optional()
  }).optional(),
  
  // Context information
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  currentProductId: z.string().optional().describe('For recommendation context'),
  mode: z.enum(['simple', 'expert']).optional().default('simple'),
  
  // Nigerian market specific
  location: z.string().optional().default('Nigeria'),
  projectType: z.enum(['residential', 'commercial', 'hospitality']).optional(),
  
  // Legacy support flag
  legacy: z.boolean().optional().default(false)
});

export type UnifiedAIInput = z.infer<typeof UnifiedAIInputSchema>;

// Unified response schema
export const UnifiedAIResponseSchema = z.object({
  // Intent information
  intent: z.string(),
  confidence: z.number(),
  
  // Primary results
  products: z.array(z.any()).optional(),
  recommendations: z.array(z.any()).optional(),
  
  // AI insights
  insights: z.object({
    marketTrends: z.array(z.string()).optional(),
    priceAnalysis: z.any().optional(),
    suggestions: z.array(z.string()).optional(),
    reasoning: z.string().optional()
  }).optional(),
  
  // Suggested actions
  suggestedActions: z.object({
    requestQuote: z.boolean().optional(),
    scheduleConsultation: z.boolean().optional(),
    viewSimilar: z.array(z.any()).optional(),
    shareViaWhatsApp: z.boolean().optional()
  }).optional(),
  
  // Context for future interactions
  updatedContext: z.any().optional(),
  
  // Legacy format support
  legacyFormat: z.any().optional()
});

export type UnifiedAIResponse = z.infer<typeof UnifiedAIResponseSchema>;

export class UnifiedAIService {
  private contextManager: ContextManager;
  private intentClassifier: IntentClassifier;
  private orchestrator: AIOrchestrator;
  private marketIntelligence: NigerianMarketIntelligence;
  
  constructor() {
    this.contextManager = new ContextManager();
    this.intentClassifier = new IntentClassifier();
    this.orchestrator = new AIOrchestrator({
      search: productSearch,
      recommend: generateRecommendations,
      featured: generateFeaturedFinds
    });
    this.marketIntelligence = new NigerianMarketIntelligence();
  }
  
  async process(input: UnifiedAIInput): Promise<UnifiedAIResponse> {
    try {
      // Build enriched context
      const context = await this.contextManager.buildContext(input);
      
      // Classify user intent
      const intent = await this.intentClassifier.classify(input, context);
      
      // Execute appropriate flow through orchestrator
      const result = await this.orchestrator.execute(intent, input, context);
      
      // Enhance with Nigerian market insights
      const enhanced = await this.marketIntelligence.enhance(result, context);
      
      // Update context for future interactions
      const updatedContext = await this.contextManager.updateContext(
        input.sessionId || 'default',
        context,
        enhanced
      );
      
      // Format unified response
      return this.formatResponse(enhanced, intent, updatedContext, input);
      
    } catch (error) {
      console.error('UnifiedAIService error:', error);
      
      // Graceful fallback to legacy behavior
      if (input.legacy && input.query) {
        const legacyResult = await productSearch({ query: input.query });
        return {
          intent: 'product_search',
          confidence: 0.5,
          products: legacyResult.results,
          legacyFormat: legacyResult
        };
      }
      
      throw error;
    }
  }
  
  private formatResponse(
    result: any,
    intent: any,
    updatedContext: any,
    input: UnifiedAIInput
  ): UnifiedAIResponse {
    const response: UnifiedAIResponse = {
      intent: intent.intent,
      confidence: intent.confidence,
      updatedContext
    };
    
    // Format based on intent type
    switch (intent.intent) {
      case 'product_search':
        response.products = result.products || result.results;
        response.insights = {
          suggestions: this.generateSearchSuggestions(result),
          marketTrends: result.marketTrends
        };
        break;
        
      case 'get_recommendation':
        response.recommendations = result.recommendations;
        response.insights = {
          reasoning: result.reasoning,
          priceAnalysis: result.priceAnalysis
        };
        response.suggestedActions = {
          requestQuote: true,
          shareViaWhatsApp: true
        };
        break;
        
      case 'browse_category':
        response.products = result.products;
        response.suggestedActions = {
          viewSimilar: result.relatedCategories
        };
        break;
        
      case 'expert_consultation':
        response.insights = {
          suggestions: result.expertAdvice,
          marketTrends: result.trends
        };
        response.suggestedActions = {
          scheduleConsultation: true,
          requestQuote: result.recommendedProducts?.length > 0
        };
        break;
        
      default:
        response.products = result.products || [];
    }
    
    // Add legacy format if needed
    if (input.legacy) {
      response.legacyFormat = this.convertToLegacyFormat(response, intent.intent);
    }
    
    return response;
  }
  
  private generateSearchSuggestions(result: any): string[] {
    const suggestions: string[] = [];
    
    if (result.products?.length === 0) {
      suggestions.push('Try broadening your search terms');
      suggestions.push('Browse our categories for inspiration');
    } else if (result.products?.length < 3) {
      suggestions.push('We have limited options matching your criteria');
      suggestions.push('Consider alternative styles or categories');
    } else {
      suggestions.push(`Found ${result.products.length} perfect matches`);
      suggestions.push('Use filters to narrow down your selection');
    }
    
    return suggestions;
  }
  
  private convertToLegacyFormat(response: UnifiedAIResponse, intent: string): any {
    switch (intent) {
      case 'product_search':
        return {
          results: response.products || []
        };
      case 'get_recommendation':
        return {
          recommendations: response.recommendations || []
        };
      default:
        return response;
    }
  }
}

// Singleton instance
let unifiedAIServiceInstance: UnifiedAIService | null = null;

export function getUnifiedAIService(): UnifiedAIService {
  if (!unifiedAIServiceInstance) {
    unifiedAIServiceInstance = new UnifiedAIService();
  }
  return unifiedAIServiceInstance;
}

// Main export function
export async function processUnifiedAI(input: UnifiedAIInput): Promise<UnifiedAIResponse> {
  const service = getUnifiedAIService();
  return service.process(input);
}
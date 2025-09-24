'use server';

import { ai } from '../genkit';
import { z } from 'genkit';
import { type UnifiedAIInput } from '../unified-ai-service';
import { type EnrichedContext } from './context-manager';

export const IntentSchema = z.object({
  intent: z.enum([
    'product_search',
    'browse_category',
    'get_recommendation',
    'request_quote',
    'expert_consultation',
    'check_availability',
    'compare_products',
    'general_inquiry'
  ]),
  confidence: z.number().min(0).max(1),
  subIntent: z.string().optional(),
  entities: z.object({
    productType: z.string().optional(),
    style: z.string().optional(),
    room: z.string().optional(),
    priceRange: z.string().optional(),
    features: z.array(z.string()).optional()
  }).optional()
});

export type Intent = z.infer<typeof IntentSchema>;

export class IntentClassifier {
  private intentPrompt = ai.definePrompt({
    name: 'classifyUserIntent',
    input: {
      schema: z.object({
        userInput: z.string(),
        preferences: z.any().optional(),
        conversationHistory: z.array(z.string()).optional(),
        marketContext: z.any().optional()
      })
    },
    output: { schema: IntentSchema },
    prompt: `You are an intelligent intent classifier for Living Gold, a luxury lighting store in Nigeria.
    
Your task is to analyze the user's input and context to determine their intent accurately.

User Input: {{userInput}}
{{#if preferences}}User Preferences: {{preferences}}{{/if}}
{{#if conversationHistory}}Previous Intents: {{conversationHistory}}{{/if}}
{{#if marketContext}}Market Context: {{marketContext}}{{/if}}

Analyze the input and classify it into one of these intents:
- product_search: User is looking for specific products or searching by keywords
- browse_category: User wants to explore a category without specific product in mind
- get_recommendation: User wants personalized suggestions based on preferences
- request_quote: User wants pricing information or a formal quote
- expert_consultation: User needs lighting design advice or expert guidance
- check_availability: User asking about stock or delivery times
- compare_products: User wants to compare multiple products
- general_inquiry: General questions about the store or services

Also extract any entities like:
- productType: chandelier, pendant, table lamp, etc.
- style: modern, traditional, minimalist, luxury, etc.
- room: living room, bedroom, kitchen, etc.
- priceRange: budget, mid-range, premium, luxury
- features: dimmable, smart, energy-efficient, etc.

Consider Nigerian context:
- If they mention "NEPA" or "power", they might be asking about power compatibility
- References to Naira (₦) indicate price sensitivity
- "Lagos", "Abuja", "Delta" etc. might indicate delivery concerns

Return the intent with confidence score (0-1) and any relevant entities.`
  });
  
  async classify(input: UnifiedAIInput, context: EnrichedContext): Promise<Intent> {
    try {
      // Build input for classification
      const classificationInput = {
        userInput: this.buildUserInputString(input),
        preferences: input.preferences,
        conversationHistory: context.conversation?.previousIntents || [],
        marketContext: {
          location: context.location,
          seasonalFactors: context.market?.seasonalFactors
        }
      };
      
      // Get AI classification
      const { output } = await this.intentPrompt(classificationInput);
      
      if (!output) {
        // Fallback classification based on simple rules
        return this.fallbackClassification(input);
      }
      
      // Enhance classification with context
      return this.enhanceClassification(output, context);
      
    } catch (error) {
      console.error('Intent classification error:', error);
      return this.fallbackClassification(input);
    }
  }
  
  private buildUserInputString(input: UnifiedAIInput): string {
    const parts: string[] = [];
    
    if (input.query) {
      parts.push(input.query);
    }
    
    if (input.preferences) {
      const { style, roomType, category } = input.preferences;
      const prefString = [style, roomType, category].filter(Boolean).join(' ');
      if (prefString) {
        parts.push(`Looking for: ${prefString}`);
      }
      
      if (input.preferences.budget) {
        const { min, max } = input.preferences.budget;
        if (min || max) {
          parts.push(`Budget: ₦${min || 0} - ₦${max || 'unlimited'}`);
        }
      }
    }
    
    return parts.join('. ') || 'Browse products';
  }
  
  private fallbackClassification(input: UnifiedAIInput): Intent {
    // Simple rule-based fallback
    const query = (input.query || '').toLowerCase();
    const hasPreferences = input.preferences && 
      (input.preferences.style || input.preferences.roomType || input.preferences.category);
    
    if (query.includes('quote') || query.includes('price') || query.includes('cost')) {
      return {
        intent: 'request_quote',
        confidence: 0.7
      };
    }
    
    if (query.includes('recommend') || query.includes('suggest') || query.includes('help me')) {
      return {
        intent: 'get_recommendation',
        confidence: 0.7
      };
    }
    
    if (query.includes('compare') || query.includes('vs') || query.includes('versus')) {
      return {
        intent: 'compare_products',
        confidence: 0.7
      };
    }
    
    if (query.includes('available') || query.includes('stock') || query.includes('delivery')) {
      return {
        intent: 'check_availability',
        confidence: 0.7
      };
    }
    
    if (query.includes('design') || query.includes('consultation') || query.includes('advice')) {
      return {
        intent: 'expert_consultation',
        confidence: 0.7
      };
    }
    
    if (hasPreferences && !query) {
      return {
        intent: 'browse_category',
        confidence: 0.8
      };
    }
    
    if (query.length > 0) {
      return {
        intent: 'product_search',
        confidence: 0.8
      };
    }
    
    return {
      intent: 'general_inquiry',
      confidence: 0.5
    };
  }
  
  private enhanceClassification(intent: Intent, context: EnrichedContext): Intent {
    // Boost confidence based on conversation history
    if (context.conversation?.previousIntents?.includes(intent.intent)) {
      intent.confidence = Math.min(intent.confidence * 1.1, 1);
    }
    
    // Add sub-intent based on context
    if (intent.intent === 'product_search' && context.market?.seasonalFactors?.includes('christmas_season')) {
      intent.subIntent = 'seasonal_decorative';
    }
    
    if (intent.intent === 'get_recommendation' && context.projectType) {
      intent.subIntent = `${context.projectType}_project`;
    }
    
    return intent;
  }
}
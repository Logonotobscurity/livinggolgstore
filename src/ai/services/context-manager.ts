'use server';

import { type UnifiedAIInput } from '../unified-ai-service';

export interface UserContext {
  userId?: string;
  sessionId?: string;
  preferences?: {
    style?: string;
    roomType?: string;
    category?: string;
    budget?: {
      min?: number;
      max?: number;
    };
  };
  history?: {
    searches?: string[];
    viewedProducts?: string[];
    interactions?: any[];
  };
  location?: string;
  projectType?: string;
}

export interface EnrichedContext extends UserContext {
  timestamp: Date;
  market: {
    region: string;
    currency: string;
    taxRate: number;
    seasonalFactors?: string[];
  };
  conversation: {
    previousIntents?: string[];
    currentIntent?: string;
    messageCount: number;
  };
}

export class ContextManager {
  private sessionContext: Map<string, UserContext> = new Map();
  private readonly MAX_HISTORY_LENGTH = 50;
  
  async buildContext(input: UnifiedAIInput): Promise<EnrichedContext> {
    const sessionId = input.sessionId || 'default';
    const existingContext = this.sessionContext.get(sessionId) || {};
    
    // Merge input with existing context
    const userContext: UserContext = {
      ...existingContext,
      userId: input.userId || existingContext.userId,
      sessionId: sessionId,
      preferences: {
        ...existingContext.preferences,
        ...input.preferences
      },
      location: input.location || existingContext.location || 'Nigeria',
      projectType: input.projectType || existingContext.projectType
    };
    
    // Add current query to history if present
    if (input.query && userContext.history) {
      if (!userContext.history.searches) {
        userContext.history.searches = [];
      }
      userContext.history.searches.push(input.query);
      
      // Limit history length
      if (userContext.history.searches.length > this.MAX_HISTORY_LENGTH) {
        userContext.history.searches = userContext.history.searches.slice(-this.MAX_HISTORY_LENGTH);
      }
    }
    
    // Get Nigerian market context
    const marketContext = await this.getNigerianMarketContext();
    
    // Build conversation context
    const conversationContext = this.getConversationContext(sessionId);
    
    return {
      ...userContext,
      timestamp: new Date(),
      market: marketContext,
      conversation: conversationContext
    };
  }
  
  async updateContext(
    sessionId: string, 
    context: EnrichedContext, 
    result: any
  ): Promise<UserContext> {
    const updatedContext: UserContext = {
      ...context,
      history: {
        ...context.history,
        interactions: [
          ...(context.history?.interactions || []),
          {
            timestamp: new Date(),
            intent: result.intent,
            resultCount: result.products?.length || result.recommendations?.length || 0
          }
        ]
      }
    };
    
    // Update session context
    this.sessionContext.set(sessionId, updatedContext);
    
    // Clean up old sessions periodically
    if (Math.random() < 0.1) { // 10% chance
      this.cleanupOldSessions();
    }
    
    return updatedContext;
  }
  
  private async getNigerianMarketContext() {
    return {
      region: 'West Africa',
      currency: 'NGN',
      taxRate: 0.075, // 7.5% VAT in Nigeria
      seasonalFactors: this.getCurrentSeasonalFactors()
    };
  }
  
  private getCurrentSeasonalFactors(): string[] {
    const month = new Date().getMonth();
    const factors: string[] = [];
    
    // Nigerian seasonal considerations
    if (month >= 3 && month <= 10) {
      factors.push('rainy_season');
      factors.push('indoor_focus');
    } else {
      factors.push('dry_season');
      factors.push('outdoor_lighting_popular');
    }
    
    // Holiday seasons
    if (month === 11 || month === 0) {
      factors.push('christmas_season');
      factors.push('increased_decorative_demand');
    }
    
    if (month === 8 || month === 9) {
      factors.push('independence_celebrations');
    }
    
    return factors;
  }
  
  private getConversationContext(sessionId: string): EnrichedContext['conversation'] {
    const context = this.sessionContext.get(sessionId);
    const interactions = context?.history?.interactions || [];
    
    return {
      previousIntents: interactions.slice(-5).map(i => i.intent),
      messageCount: interactions.length,
      currentIntent: interactions[interactions.length - 1]?.intent
    };
  }
  
  private cleanupOldSessions() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    for (const [sessionId, context] of this.sessionContext.entries()) {
      const lastInteraction = context.history?.interactions?.slice(-1)[0];
      if (!lastInteraction || new Date(lastInteraction.timestamp) < oneHourAgo) {
        this.sessionContext.delete(sessionId);
      }
    }
  }
  
  getUserContext(sessionId: string): UserContext | undefined {
    return this.sessionContext.get(sessionId);
  }
  
  clearUserContext(sessionId: string): void {
    this.sessionContext.delete(sessionId);
  }
}
'use client';

import { useState, useCallback, useTransition } from 'react';
import { processUnifiedAI, type UnifiedAIInput, type UnifiedAIResponse } from '@/ai/unified-ai-service';
import { useToast } from './use-toast';

interface UseUnifiedAIOptions {
  onSuccess?: (response: UnifiedAIResponse) => void;
  onError?: (error: Error) => void;
  sessionId?: string;
}

export function useUnifiedAI(options: UseUnifiedAIOptions = {}) {
  const [response, setResponse] = useState<UnifiedAIResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const process = useCallback(async (input: Partial<UnifiedAIInput>) => {
    setError(null);
    
    startTransition(async () => {
      try {
        // Ensure we have a session ID
        const sessionId = input.sessionId || options.sessionId || `session-${Date.now()}`;
        
        // Process through unified AI
        const result = await processUnifiedAI({
          ...input,
          sessionId,
          location: input.location || 'Nigeria',
          mode: input.mode || 'simple',
          legacy: false
        } as UnifiedAIInput);
        
        setResponse(result);
        
        // Call success callback if provided
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        
        // Show intent-specific toasts
        if (result.intent === 'request_quote' && result.products?.length) {
          toast({
            title: 'Quote Ready',
            description: `${result.products.length} products ready for quotation`
          });
        } else if (result.intent === 'expert_consultation') {
          toast({
            title: 'Expert Advice Available',
            description: 'Review our lighting recommendations'
          });
        }
        
        return result;
        
      } catch (err) {
        const error = err as Error;
        console.error('useUnifiedAI error:', error);
        setError(error);
        
        // Show error toast
        toast({
          title: 'AI Service Error',
          description: error.message || 'Failed to process your request',
          variant: 'destructive'
        });
        
        // Call error callback if provided
        if (options.onError) {
          options.onError(error);
        }
        
        throw error;
      }
    });
  }, [options, toast]);
  
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);
  
  return {
    process,
    response,
    error,
    isPending,
    reset,
    
    // Convenience methods
    isSuccess: !!response && !error,
    isError: !!error,
    
    // Quick access to common response data
    products: response?.products || [],
    recommendations: response?.recommendations || [],
    insights: response?.insights,
    suggestedActions: response?.suggestedActions,
    intent: response?.intent,
    confidence: response?.confidence || 0
  };
}
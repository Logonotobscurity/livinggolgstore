
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { generateReviewSuggestion } from '@/ai/flows/generate-review-suggestion';
import { addReview } from '@/lib/reviews';

interface ProductReviewFormProps {
  productName: string;
  onReviewSubmit?: () => void;
}

type SuggestionTone = 'eloquent' | 'concise' | 'enthusiastic';

export function ProductReviewForm({ productName, onReviewSubmit }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isGenerating, startGenerating] = useTransition();
  const [isSubmitting, startSubmitting] = useTransition();
  const [activeTone, setActiveTone] = useState<SuggestionTone | null>(null);
  const { toast } = useToast();

  const handleSuggestion = (tone?: SuggestionTone) => {
    if (reviewText.trim().length < 5) return;
    
    if (tone) {
      setActiveTone(tone);
    } else {
      setActiveTone(null);
    }

    startGenerating(async () => {
      const response = await generateReviewSuggestion({
        productName,
        userText: reviewText,
        ...(tone && { tone }),
      });

      if (response.suggestion) {
        setSuggestion(response.suggestion);
      } else {
        toast({
          variant: 'destructive',
          title: 'Could not generate suggestion',
          description: 'The AI could not generate a suggestion at this time. Please try again.',
        });
      }
      setActiveTone(null);
    });
  };

  const handleUseSuggestion = () => {
    setReviewText(suggestion);
    setSuggestion('');
  };
  
  const handleClearSuggestion = () => {
    setSuggestion('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim().length < 10) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Review',
        description: 'Please select a rating and write at least 10 characters.',
      });
      return;
    }

    startSubmitting(async () => {
      await addReview({
        author: 'Anonymous', // In a real app, this would be the logged-in user
        body: reviewText,
        rating: rating,
        productName: productName,
      });

      toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback.',
      });
      
      onReviewSubmit?.();

      setRating(0);
      setReviewText('');
      setSuggestion('');
    });
  };

  const ToneButton = ({ tone, label }: { tone: SuggestionTone; label: string }) => (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="text-xs h-8"
      onClick={() => handleSuggestion(tone)}
      disabled={isGenerating}
    >
      {isGenerating && activeTone === tone ? (
        <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
      ) : null}
      {label}
    </Button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-semibold mb-2 block text-center">Your Rating</label>
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Icons.star
                className={cn(
                  'w-8 h-8 cursor-pointer transition-colors',
                  rating >= star
                    ? 'text-primary fill-current'
                    : 'text-muted-foreground/50'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="review-text" className="font-semibold mb-2 block text-center">Your Review</label>
        <Textarea
          id="review-text"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="What did you like or dislike?"
          rows={4}
          className="bg-secondary"
        />
      </div>

      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSuggestion()}
          disabled={isGenerating || reviewText.trim().length < 5}
        >
          {isGenerating && !activeTone ? (
            <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Icons.lightbulb className="w-4 h-4 mr-2" />
          )}
          Get AI Suggestion
        </Button>
      </div>

      {suggestion && (
        <div className="p-4 bg-secondary rounded-lg border border-primary/20 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Refine your review with AI. Your original text is safe.</p>
                <p className="text-sm italic">{suggestion}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={handleClearSuggestion} aria-label="Close suggestion">
                  <Icons.close className="w-4 h-4" />
              </Button>
            </div>

            <div className="border-t border-primary/20 pt-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <ToneButton tone="eloquent" label="More Eloquent" />
                  <ToneButton tone="concise" label="More Concise" />
                  <ToneButton tone="enthusiastic" label="More Enthusiastic" />
                  <span className="text-xs text-muted-foreground/80">(Uses GenAI)</span>
                </div>
                <Button type="button" size="sm" onClick={handleUseSuggestion} className="shrink-0">
                    Use this
                </Button>
              </div>
            </div>
        </div>
      )}

      <div className="text-center pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
           {isSubmitting ? (
              <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              'Submit Review'
            )}
        </Button>
      </div>
    </form>
  );
}


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
}

export function ProductReviewForm({ productName }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, startSubmitting] = useTransition();
  const { toast } = useToast();

  const handleSuggestion = () => {
    if (reviewText.trim().length < 5) return;

    startTransition(async () => {
      setSuggestion('');
      const response = await generateReviewSuggestion({
        productName,
        userText: reviewText,
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
    });
  };

  const handleUseSuggestion = () => {
    setReviewText(suggestion);
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

      setRating(0);
      setReviewText('');
      setSuggestion('');
    });
  };

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
          onClick={handleSuggestion}
          disabled={isPending || reviewText.trim().length < 5}
        >
          {isPending ? (
            <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Icons.lightbulb className="w-4 h-4 mr-2" />
          )}
          Get AI Suggestion
        </Button>
      </div>

      {suggestion && (
        <div className="p-4 bg-secondary rounded-lg border border-primary/20 space-y-4">
          <p className="text-sm italic text-muted-foreground">{suggestion}</p>
          <Button type="button" size="sm" onClick={handleUseSuggestion}>
            Use this suggestion
          </Button>
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

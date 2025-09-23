
'use client';

import { useState, useTransition } from 'react';
import { productSearch, type ProductSearchOutput } from '@/ai/flows/product-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { Icons } from './icons';
import Image from 'next/image';
import Link from 'next/link';

interface AIConsultantProps {
  onResults?: (results: ProductSearchOutput) => void;
}

export function AIConsultant({ onResults }: AIConsultantProps) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<ProductSearchOutput | null>(null);
  const [preferences, setPreferences] = useState({
    style: '',
    roomType: '',
    category: '',
  });

  const handleGetRecommendations = () => {
    startTransition(async () => {
      const queryParts = [
        preferences.style,
        preferences.category,
        preferences.roomType,
      ].filter(Boolean);
      const query = `Find me ${queryParts.join(' ')} lighting`.trim();

      const searchResults = await productSearch({ query });
      setResults(searchResults);
      if (onResults && searchResults.results.length > 0) {
        onResults(searchResults);
      }
    });
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => (value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (results) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-headline text-center mb-6">Your AI Recommendations</h2>
        {results.results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
            {results.results.map(item => (
              <Link key={item.id} href={`/products/${item.slug}`} className="block p-2 border rounded-lg hover:border-primary">
                <Image src={item.imageUrl} alt={item.title || ''} width={150} height={150} className="w-full h-auto aspect-square object-contain bg-background rounded-md mb-2" />
                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No recommendations found for your criteria.</p>
        )}
        <Button variant="outline" onClick={() => setResults(null)} className="w-full mt-6">Start Over</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-headline text-center mb-6">AI-Powered Lighting Consultant</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Select onValueChange={handlePreferenceChange('style')}>
          <SelectTrigger>
            <SelectValue placeholder="Select Your Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern & Contemporary</SelectItem>
            <SelectItem value="traditional">Traditional & Classic</SelectItem>
            <SelectItem value="minimalist">Minimalist & Clean</SelectItem>
            <SelectItem value="luxury">Ultra-Luxury</SelectItem>
            <SelectItem value="industrial">Industrial Chic</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handlePreferenceChange('roomType')}>
          <SelectTrigger>
            <SelectValue placeholder="Room Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="living room">Living Room</SelectItem>
            <SelectItem value="dining room">Dining Room</SelectItem>
            <SelectItem value="bedroom">Bedroom</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="office">Office/Study</SelectItem>
            <SelectItem value="outdoor">Outdoor Spaces</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handlePreferenceChange('category')}>
          <SelectTrigger className="sm:col-span-2">
            <SelectValue placeholder="Lighting Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chandelier">Chandeliers</SelectItem>
            <SelectItem value="pendant light">Pendant Lights</SelectItem>
            <SelectItem value="table lamp">Table Lamps</SelectItem>
            <SelectItem value="floor lamp">Floor Lamps</SelectItem>
            <SelectItem value="wall sconce">Wall Sconces</SelectItem>
            <SelectItem value="ceiling light">Ceiling Lights</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleGetRecommendations}
        disabled={isPending || !preferences.style || !preferences.roomType}
        className="w-full"
        size="lg"
      >
        {isPending ? (
          <>
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            AI is Analyzing...
          </>
        ) : (
          <>
            <Icons.lightbulb className="mr-2 h-4 w-4" />
            Get AI Recommendations
          </>
        )}
      </Button>
    </div>
  );
}

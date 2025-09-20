
'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Icons } from './icons';
import { productSearch } from '@/ai/flows/product-search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ImagePlaceholder[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      startTransition(async () => {
        const response = await productSearch({ query: searchQuery });
        setSearchResults(response.results);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSearchQuery('');
        setSearchResults([]);
      }, 300);
    }
  }, [isOpen]);

  const handleResultClick = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-secondary text-foreground max-w-lg p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-headline">Search Products</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="e.g., 'a modern light for my kitchen island'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background border-border w-full pl-10 text-base"
            />
             {isPending && <Icons.loader className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
          </div>
          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            {searchResults.length > 0 && !isPending && (
              <ul className="space-y-4">
                {searchResults.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/products/${item.slug}`}
                      className="flex items-center gap-4 p-2 rounded-md hover:bg-muted"
                      onClick={handleResultClick}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title || 'Product Image'}
                        width={60}
                        height={60}
                        className="rounded-md object-contain bg-background p-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!isPending && searchQuery.length > 2 && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No results found for "{searchQuery}"
                </p>
            )}
             {!isPending && searchQuery.length <= 2 && (
                <p className="text-center text-muted-foreground py-8">
                  Describe what you're looking for.
                </p>
              )}
             {isPending && (
                 <div className="flex justify-center items-center py-8">
                    <Icons.loader className="h-8 w-8 animate-spin" />
                 </div>
             )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

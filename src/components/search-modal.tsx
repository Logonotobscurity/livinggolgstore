
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Icons } from './icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ImagePlaceholder[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = PlaceHolderImages.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
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
      <DialogContent className="bg-secondary text-white max-w-lg p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-headline">Search Products</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for chandeliers, lamps, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background border-muted-foreground w-full pl-10 text-base"
            />
          </div>
          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            {searchResults.length > 0 ? (
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
                        <p className="text-sm text-gray-400 truncate">{item.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              searchQuery.length > 1 && (
                <p className="text-center text-gray-400 py-8">
                  No results found for "{searchQuery}"
                </p>
              )
            )}
             {searchQuery.length <= 1 && (
                <p className="text-center text-gray-400 py-8">
                  Enter a search term to find products.
                </p>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


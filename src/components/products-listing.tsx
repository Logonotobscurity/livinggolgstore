"use client";

import { useMemo, useState } from "react";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryCard } from "@/components/category-card";

type SortKey = "featured" | "az" | "za" | "price_asc" | "price_desc";

export function ProductsListing({ products, placeholder }: { products: ImagePlaceholder[]; placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const hasPrice = useMemo(() => products.some(p => !!p.price && !isNaN(parseFloat(p.price as string))), [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p => {
      const text = `${p.title || ""} ${p.description || ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [products, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "az":
        return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      case "za":
        return arr.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
      case "price_asc":
        return arr.sort((a, b) => (parseFloat(a.price || "NaN") || Infinity) - (parseFloat(b.price || "NaN") || Infinity));
      case "price_desc":
        return arr.sort((a, b) => (parseFloat(b.price || "NaN") || -Infinity) - (parseFloat(a.price || "NaN") || -Infinity));
      default:
        return arr; // featured = original order
    }
  }, [filtered, sort]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{sorted.length}</span> of {products.length} items
        </p>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder || "Search within results"}
              className="bg-background"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
              <SelectItem value="za">Z–A</SelectItem>
              {hasPrice && <SelectItem value="price_asc">Price: Low–High</SelectItem>}
              {hasPrice && <SelectItem value="price_desc">Price: High–Low</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
        {sorted.map((product, index) => (
          <CategoryCard
            key={product.id}
            product={product}
            animationDelay={`${index * 0.05}s`}
            imageClassName="w-full h-full p-2 sm:p-6"
          />
        ))}
      </div>
    </div>
  );
}

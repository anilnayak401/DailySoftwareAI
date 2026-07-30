import React from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
  className?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  cols = 3,
  className,
  emptyMessage = 'No products found matching your selection.',
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-gray-400">
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-5', gridCols[cols], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

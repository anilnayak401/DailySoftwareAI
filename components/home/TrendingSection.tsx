import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductGrid } from '../ui/ProductGrid';

interface TrendingSectionProps {
  products: Product[];
}

export function TrendingSection({ products }: TrendingSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <TrendingUp size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Trending Software Today
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">High-momentum SaaS tools gaining rapid user adoption this week.</p>
          </div>
        </div>
      </div>

      <ProductGrid products={products} cols={3} />
    </section>
  );
}

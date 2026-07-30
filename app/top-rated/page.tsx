import { Metadata } from 'next';
import { Award, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/ui/ProductGrid';

export const metadata: Metadata = {
  title: 'Top Rated Software & AI Tools 2026',
  description:
    'Highest rated AI software, SaaS tools, and marketing platforms ranked by editorial score, user reviews, and feature performance.',
};

async function getTopRatedProducts(): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*)
      `)
      .eq('status', 'published')
      .order('editor_score', { ascending: false });

    if (data && data.length > 0) {
      return data as Product[];
    }
  } catch {
    // fallback
  }

  const sorted = [...MOCK_PRODUCTS].sort((a, b) => (b.editor_score || 0) - (a.editor_score || 0));
  return sorted;
}

export default async function TopRatedPage() {
  const products = await getTopRatedProducts();

  return (
    <div className="py-6 space-y-8">
      <Breadcrumbs items={[{ name: 'Top Rated Software', url: '/top-rated' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <Award size={14} className="text-amber-500 dark:text-amber-400" />
          <span>Editor Score Leaderboard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          Top Rated Software & AI Tools
        </h1>
        <p className="text-base text-slate-600 dark:text-zinc-300">
          Independent editorial rankings based on feature depth, ease of use, customer support, and value for money.
        </p>
      </div>

      <ProductGrid products={products} cols={3} />

      <div className="glass-card rounded-2xl p-6 text-center text-xs text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
        <ShieldCheck size={16} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
        <span>Our rankings are independent of affiliate partnerships. Read our <a href="/ranking-methodology" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Ranking Methodology</a>.</span>
      </div>
    </div>
  );
}

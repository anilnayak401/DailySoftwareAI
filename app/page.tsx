import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';

import { HeroSection } from '@/components/home/HeroSection';
import { TopRankedProduct } from '@/components/home/TopRankedProduct';
import { TrendingSection } from '@/components/home/TrendingSection';
import { LaunchingToday } from '@/components/home/LaunchingToday';
import { CategoryShowcases } from '@/components/home/CategoryShowcases';
import { FounderSection } from '@/components/home/FounderSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const revalidate = 3600; // ISR revalidate hourly

async function getProductsData(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*)
      `)
      .eq('status', 'published')
      .order('current_rank', { ascending: true, nullsFirst: false });

    if (error || !data || data.length === 0) {
      return MOCK_PRODUCTS;
    }
    return data as Product[];
  } catch {
    return MOCK_PRODUCTS;
  }
}

export default async function HomePage() {
  const products = await getProductsData();

  // Pick top pick (#1 product)
  const topPick = products.find((p) => p.is_top_pick) || products[0];

  // Pick trending products
  const trendingProducts = products.filter((p) => p.is_trending);

  // Pick launches launching today / recently
  const todayStr = new Date().toISOString().split('T')[0];
  const launchingToday = products.filter((p) => p.launch_date === todayStr) || products;

  // Filter category showcases
  const aiTools = products.filter((p) =>
    p.categories?.some((c) => c.slug === 'ai-tools')
  );

  const automationTools = products.filter((p) =>
    p.categories?.some((c) => c.slug === 'automation')
  );

  const seoTools = products.filter((p) =>
    p.categories?.some((c) => c.slug === 'seo')
  );

  const lifetimeDeals = products.filter((p) => p.pricing_type === 'lifetime');

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. #1 Ranked Product / Editor's Pick */}
      {topPick && <TopRankedProduct product={topPick} />}

      {/* 3. Trending Software Today */}
      <TrendingSection products={trendingProducts.length > 0 ? trendingProducts : products} />

      {/* 4. Launching Today */}
      <LaunchingToday products={launchingToday.length > 0 ? launchingToday : products.slice(0, 2)} />

      {/* 5. Curated Category Showcases */}
      <CategoryShowcases
        aiTools={aiTools.length > 0 ? aiTools : products}
        automationTools={automationTools.length > 0 ? automationTools : products}
        seoTools={seoTools.length > 0 ? seoTools : products}
        lifetimeDeals={lifetimeDeals.length > 0 ? lifetimeDeals : products.filter(p => p.pricing_type === 'lifetime')}
      />

      {/* 6. About Founder Naresh */}
      <FounderSection />

      {/* 7. Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}

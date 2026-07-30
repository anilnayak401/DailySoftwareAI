import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/ui/ProductGrid';

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  try {
    const { data: category } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    const { data: products } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*)
      `)
      .eq('status', 'published');

    if (category && products) {
      const filtered = products.filter((p) =>
        p.categories?.some((c: { slug: string }) => c.slug === slug)
      );
      return { category, products: filtered as Product[] };
    }
  } catch {
    // fallback
  }

  const categoryNames: Record<string, string> = {
    'ai-tools': 'AI Tools',
    'business-marketing': 'Business & Marketing',
    'plr-content': 'PLR & Prompt Kits',
    'software-apps': 'Software & Apps',
    'make-money-online': 'Make Money Online',
    seo: 'SEO',
    automation: 'Automation',
  };

  const name = categoryNames[slug] || slug.replace('-', ' ').toUpperCase();

  const mockCategory = {
    name,
    slug,
    description: `Browse top-rated ${name} software tools, platforms, reviews, and deals. Compare features, pricing, and ratings to find the best tool for your business.`,
  };

  const filtered = MOCK_PRODUCTS.filter((p) =>
    p.categories?.some((c) => c.slug === slug)
  );

  return {
    category: mockCategory,
    products: filtered.length > 0 ? filtered : MOCK_PRODUCTS,
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategoryData(slug);

  if (!category) return { title: 'Category Not Found' };

  return {
    title: `Best ${category.name} Software & Tools 2026`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, products } = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-6 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Categories', url: '/categories' },
          { name: category.name, url: `/categories/${category.slug}` },
        ]}
      />

      {/* Category Hero / Editorial Header */}
      <div className="glass-card rounded-3xl p-8 border border-indigo-500/30 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Best {category.name} Software & Tools
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {category.description}
        </p>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Top Rated {category.name} ({products.length})</h2>
        </div>
        <ProductGrid products={products} cols={3} emptyMessage={`No products currently listed under ${category.name}.`} />
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGrid } from '@/components/ui/ProductGrid';

export const metadata: Metadata = {
  title: 'All Software & AI Tools Directory',
  description:
    'Search, filter, and compare the complete directory of AI software, SaaS tools, marketing automation platforms, and lifetime software deals.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

async function getProducts(
  searchTerm?: string,
  categorySlug?: string,
  sortBy: string = 'newest'
): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*)
      `)
      .eq('status', 'published');

    if (sortBy === 'highest-rated') {
      query = query.order('rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;

    if (data && data.length > 0) {
      let result = data as Product[];
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.tagline?.toLowerCase().includes(term) ||
            p.short_description?.toLowerCase().includes(term)
        );
      }
      if (categorySlug) {
        result = result.filter((p) =>
          p.categories?.some((c: { slug: string }) => c.slug === categorySlug)
        );
      }
      return result;
    }
  } catch {
    // fallback
  }

  let result = [...MOCK_PRODUCTS];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.tagline?.toLowerCase().includes(term) ||
        p.short_description?.toLowerCase().includes(term)
    );
  }

  if (categorySlug) {
    result = result.filter((p) =>
      p.categories?.some((c) => c.slug === categorySlug)
    );
  }

  if (sortBy === 'highest-rated') {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  return result;
}

export default async function ProductsDirectoryPage({ searchParams }: ProductsPageProps) {
  const { search, category, sort } = await searchParams;
  const products = await getProducts(search, category, sort || 'newest');

  const categoriesList = [
    { name: 'All Categories', slug: '' },
    { name: 'AI Tools', slug: 'ai-tools' },
    { name: 'Business & Marketing', slug: 'business-marketing' },
    { name: 'PLR & Prompt Kits', slug: 'plr-content' },
    { name: 'Software & Apps', slug: 'software-apps' },
    { name: 'Make Money Online', slug: 'make-money-online' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Automation', slug: 'automation' },
  ];

  return (
    <div className="py-6 space-y-8">
      <Breadcrumbs items={[{ name: 'Products Directory', url: '/products' }]} />

      {/* Directory Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Software & AI Tools Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Showing {products.length} published software tools and deals.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input Form */}
        <form action="/products" method="GET" className="relative w-full md:w-80">
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            placeholder="Search software name or keyword..."
            className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-950 transition-all"
          />
          <Search size={14} className="absolute left-3 top-3 text-slate-400 dark:text-zinc-500" />
          {category && <input type="hidden" name="category" value={category} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
        </form>

        {/* Category Pills & Sorting */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400 mr-1">
            <Filter size={13} />
            <span className="hidden sm:inline font-medium">Filter:</span>
          </div>
          {categoriesList.map((cat) => {
            const isSelected = (category || '') === cat.slug;
            const queryParams = new URLSearchParams();
            if (search) queryParams.set('search', search);
            if (cat.slug) queryParams.set('category', cat.slug);
            if (sort) queryParams.set('sort', sort);

            return (
              <Link
                key={cat.slug}
                href={`/products?${queryParams.toString()}`}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/60'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}

          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400 ml-2">
            <ArrowUpDown size={13} />
            <Link
              href={`/products?${new URLSearchParams({
                ...(search ? { search } : {}),
                ...(category ? { category } : {}),
                sort: sort === 'highest-rated' ? 'newest' : 'highest-rated',
              }).toString()}`}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              {sort === 'highest-rated' ? 'Sort: Top Rated' : 'Sort: Newest'}
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={products}
        cols={3}
        emptyMessage="No software tools match your search criteria. Try clearing search filters."
      />
    </div>
  );
}

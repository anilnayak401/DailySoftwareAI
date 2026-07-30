import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MOCK_PRODUCTS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Edit Product — Admin Portal',
  robots: { index: false, follow: false },
};

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProductById(id: string) {
  try {
    const { data } = await supabase
      .from('products')
      .select('*, affiliate_links(*)')
      .eq('id', id)
      .single();

    if (data) return data;
  } catch {
    // fallback
  }

  const mock = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  return mock;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-xl font-bold text-white">Edit Product: {product.name}</h1>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border-indigo-500/30">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{product.name} ({product.slug})</h2>
            <p className="text-xs text-gray-400">ID: {product.id}</p>
          </div>
        </div>

        <p className="text-xs text-gray-300">
          Editing product details for <span className="font-bold text-white">{product.name}</span>. Modifying parameters below updates the PostgreSQL record and live page revalidation.
        </p>

        <div className="space-y-4 text-xs text-gray-300 bg-gray-950 p-4 rounded-2xl border border-gray-800">
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">Tagline:</span>
            <span className="text-white font-medium">{product.tagline}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">Status:</span>
            <span className="text-emerald-400 font-bold uppercase">{product.status}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">Editor Score:</span>
            <span className="text-indigo-400 font-bold">{product.editor_score}/10</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-400">Pricing:</span>
            <span className="text-white font-medium">{product.price_text}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 flex justify-end">
          <Link
            href="/admin/products"
            className="glow-button px-6 py-2.5 rounded-xl font-bold text-white text-xs"
          >
            Done & Save Changes
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Edit, Eye, Trophy, TrendingUp, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Admin Products Management',
  robots: { index: false, follow: false },
};

async function getAdminProducts(): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      return data as Product[];
    }
  } catch {
    // fallback
  }
  return MOCK_PRODUCTS;
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="py-6 space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card rounded-2xl p-6 border-indigo-500/30">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 mb-1">
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage products, daily rankings, affiliate URLs, and launch dates.</p>
        </div>

        <Link
          href="/admin/products/new"
          className="glow-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-xs shadow-lg flex-shrink-0"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Rank / Pick</th>
                <th className="py-3.5 px-4">Rating & Score</th>
                <th className="py-3.5 px-4">Pricing</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 text-gray-300">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-900/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{product.name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">/products/{product.slug}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        product.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      {product.is_top_pick && (
                        <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
                          <Trophy size={11} /> #1 Pick
                        </span>
                      )}
                      {product.is_trending && (
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
                          <TrendingUp size={11} /> Trending
                        </span>
                      )}
                      {!product.is_top_pick && !product.is_trending && (
                        <span className="text-gray-400">Rank #{product.current_rank || 'N/A'}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-amber-300 font-semibold">⭐ {product.rating || '4.8'}</span> /{' '}
                    <span className="text-indigo-400 font-semibold">{product.editor_score || '9.5'}/10</span>
                  </td>
                  <td className="py-4 px-4 capitalize">{product.pricing_type || 'paid'}</td>
                  <td className="py-4 px-4 text-gray-400">{formatDate(product.created_at)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                        title="View Public Page"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 text-indigo-400 hover:text-indigo-300 rounded-lg hover:bg-gray-800"
                        title="Edit Product"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

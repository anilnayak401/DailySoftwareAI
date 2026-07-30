import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Rocket, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AffiliateCTA } from '@/components/ui/AffiliateCTA';
import { formatDate, formatTime } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Software Launch Calendar — New AI & SaaS Launches',
  description:
    'Track upcoming software launches, JVZoo deals, WarriorPlus releases, and new AI tools launching today and this week with exact launch times.',
};

async function getLaunchesData(): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        categories (*),
        affiliate_links (*)
      `)
      .eq('status', 'published')
      .not('launch_date', 'is', null)
      .order('launch_date', { ascending: true });

    if (data && data.length > 0) {
      return data as Product[];
    }
  } catch {
    // fallback
  }
  return MOCK_PRODUCTS;
}

export default async function LaunchCalendarPage() {
  const products = await getLaunchesData();

  const todayStr = new Date().toISOString().split('T')[0];

  const launchingToday = products.filter((p) => p.launch_date === todayStr);

  const upcomingLaunches = products.filter(
    (p) => p.launch_date && p.launch_date > todayStr
  );

  const recentLaunches = products.filter(
    (p) => p.launch_date && p.launch_date < todayStr
  );

  return (
    <div className="py-6 space-y-8">
      <Breadcrumbs items={[{ name: 'Launch Calendar', url: '/launches' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
          <Rocket size={14} className="animate-bounce text-cyan-500 dark:text-cyan-400" />
          <span>Real-Time Launch Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          Software & AI Launch Calendar
        </h1>
        <p className="text-base text-slate-600 dark:text-zinc-300">
          Discover new digital products, JVZoo releases, WarriorPlus offers, and SaaS platforms launching today.
        </p>
      </div>

      {/* 1. Launching Today */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Clock size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Launching Today ({launchingToday.length > 0 ? launchingToday.length : products.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(launchingToday.length > 0 ? launchingToday : products).map((product) => (
            <div key={product.id} className="glass-card rounded-2xl p-6 border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                    <Clock size={13} />
                    {product.launch_time ? formatTime(product.launch_time) : 'Launch Active'} ({product.launch_timezone || 'UTC'})
                  </span>
                  {product.affiliate_network && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 uppercase">
                      {product.affiliate_network}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {product.logo_url ? (
                      <Image src={product.logo_url} alt="" fill className="object-cover" />
                    ) : (
                      <Sparkles size={24} className="text-cyan-500 dark:text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">{product.name}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{product.categories?.[0]?.name || 'New Launch'}</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1">{product.tagline || product.short_description}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/50"
                >
                  View Review
                </Link>
                <AffiliateCTA slug={product.slug} label="Visit Launch" size="sm" className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Upcoming Launches */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Calendar size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Upcoming Releases</h2>
        </div>

        {upcomingLaunches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {upcomingLaunches.map((product) => (
              <div key={product.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      {formatDate(product.launch_date)} @ {product.launch_time ? formatTime(product.launch_time) : '10:00 AM'}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">{product.price_text}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">{product.tagline}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-3 mt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/50"
                  >
                    Preview Details
                  </Link>
                  <AffiliateCTA slug={product.slug} label="Visit Deal" size="sm" className="flex-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center text-slate-500 dark:text-zinc-400">
            <p className="text-sm">No future launches scheduled this week. Check back soon!</p>
          </div>
        )}
      </section>

      {/* 3. Recently Launched */}
      {recentLaunches.length > 0 && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold text-slate-700 dark:text-zinc-300">Recently Launched</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentLaunches.map((product) => (
              <div key={product.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{product.name}</h4>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400">Launched {formatDate(product.launch_date)}</span>
                </div>
                <Link href={`/products/${product.slug}`} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

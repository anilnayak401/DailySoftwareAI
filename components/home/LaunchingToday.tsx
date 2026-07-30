import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Clock, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { AffiliateCTA } from '../ui/AffiliateCTA';
import { formatTime } from '@/lib/utils';

interface LaunchingTodayProps {
  products: Product[];
}

export function LaunchingToday({ products }: LaunchingTodayProps) {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Rocket size={20} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Launching Today
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">Newly released software products and platforms launching right now.</p>
          </div>
        </div>
        <Link href="/launches" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          View Launch Calendar →
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between">
              <div>
                {/* Launch Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    <Clock size={11} />
                    {product.launch_time ? formatTime(product.launch_time) : 'Launch Active'} ({product.launch_timezone || 'UTC'})
                  </span>
                  {product.affiliate_network && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 uppercase">
                      {product.affiliate_network}
                    </span>
                  )}
                </div>

                {/* Identity */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {product.logo_url ? (
                      <Image src={product.logo_url} alt={product.name} fill className="object-cover" />
                    ) : (
                      <Sparkles size={20} className="text-cyan-500 dark:text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 leading-snug">{product.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                      {product.tagline || product.short_description}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-2 mt-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/50 transition-colors"
                >
                  View Details
                </Link>
                <AffiliateCTA slug={product.slug} label="Visit Launch" size="sm" className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center text-slate-500 dark:text-zinc-400">
          <p className="text-sm">No software launches scheduled for today yet. Check back soon!</p>
        </div>
      )}
    </section>
  );
}

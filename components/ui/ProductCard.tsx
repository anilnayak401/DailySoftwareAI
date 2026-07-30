import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, Tag } from 'lucide-react';
import { Product } from '@/lib/types';
import { RatingBadge } from './RatingBadge';
import { RankBadge } from './RankBadge';
import { AffiliateCTA } from './AffiliateCTA';
import { cn, getProductLogoUrl } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

export function ProductCard({ product, featured = false, className }: ProductCardProps) {
  const primaryCategory = product.categories?.[0]?.name || 'Software';
  const logoSrc = getProductLogoUrl(product.logo_url, product.official_website_url);


  // Tinted micro-pill styling based on pricing type
  const getPricingPillClass = (pricing?: string | null) => {
    switch (pricing) {
      case 'lifetime':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20';
      case 'free':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
      case 'freemium':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20';
    }
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between relative group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 ease-out hover:-translate-y-1',
        featured
          ? 'border-indigo-500/40 bg-gradient-to-b from-indigo-500/5 to-transparent'
          : '',
        className
      )}
    >
      <div>
        {/* Top Header Row: Rank Badge + Tinted Pricing Micro-Pill */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <RankBadge
            rank={product.current_rank}
            isTopPick={product.is_top_pick}
            isTrending={product.is_trending}
          />

          {product.pricing_type && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider',
                getPricingPillClass(product.pricing_type)
              )}
            >
              <Tag size={9} />
              {product.pricing_type}
            </span>
          )}
        </div>

        {/* Product Identity Row */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative w-12 h-12 rounded-xl border border-slate-200/60 dark:border-zinc-800 shadow-xs overflow-hidden p-1 bg-white dark:bg-zinc-900 flex-shrink-0 flex items-center justify-center">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={`${product.name} logo`}
                fill
                sizes="48px"
                className="object-contain p-1 rounded-lg"
                unoptimized={logoSrc.includes('favicons') || logoSrc.includes('iconify')}
              />
            ) : (
              <Sparkles size={20} className="text-indigo-500 dark:text-indigo-400" />
            )}
          </div>


          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${product.slug}`}
              className="text-base font-semibold text-slate-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 flex items-center gap-1 group/title"
            >
              <span className="truncate">{product.name}</span>
              <ChevronRight
                size={14}
                className="opacity-0 -translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-indigo-600 dark:text-indigo-400 flex-shrink-0"
              />
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mt-0.5 font-normal">
              {product.tagline || product.short_description}
            </p>
          </div>
        </div>

        {/* Categories & Ratings */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md">
            {primaryCategory}
          </span>
          <RatingBadge rating={product.rating} editorScore={product.editor_score} size="sm" />
        </div>
      </div>

      {/* Action CTAs */}
      <div className="pt-3.5 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-2 mt-2">
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/50 transition-colors"
        >
          View Review
        </Link>
        <AffiliateCTA slug={product.slug} size="sm" className="flex-1" />
      </div>
    </div>
  );
}

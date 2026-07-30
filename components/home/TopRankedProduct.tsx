import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { RatingBadge } from '../ui/RatingBadge';
import { AffiliateCTA } from '../ui/AffiliateCTA';
import { getProductLogoUrl, getProductScreenshotUrl } from '@/lib/utils';

interface TopRankedProductProps {
  product: Product;
}

export function TopRankedProduct({ product }: TopRankedProductProps) {
  if (!product) return null;

  const logoSrc = getProductLogoUrl(product.logo_url, product.official_website_url);
  const screenshotSrc = getProductScreenshotUrl(product.featured_image_url, product.official_website_url);

  return (
    <section className="my-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Trophy size={20} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            #1 Ranked Pick of the Day
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Our highest rated software tool recommended by our editor today.</p>
        </div>
      </div>

      {/* Feature Card Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/30 relative overflow-hidden bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Featured Image & Logo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-slate-900 shadow-2xl mb-4 group">
              {screenshotSrc ? (
                <Image
                  src={screenshotSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={screenshotSrc.includes('thum.io') || screenshotSrc.includes('favicons')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-500 dark:text-indigo-400 bg-indigo-950/30">
                  <Trophy size={48} />
                </div>
              )}

              {/* #1 Badge overlay */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-amber-300/30">
                <Trophy size={14} className="fill-white" />
                #1 PICK TODAY
              </div>
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Product Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {logoSrc && (
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 flex-shrink-0 p-1 flex items-center justify-center">
                      <Image
                        src={logoSrc}
                        alt={`${product.name} logo`}
                        fill
                        className="object-contain p-1"
                        unoptimized={logoSrc.includes('favicons') || logoSrc.includes('iconify')}
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-zinc-100">{product.name}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {product.categories?.[0]?.name || 'Featured Pick'}
                    </p>
                  </div>
                </div>
                <RatingBadge rating={product.rating} editorScore={product.editor_score} size="lg" />
              </div>

              {/* Tagline */}
              <p className="text-base font-semibold text-slate-700 dark:text-zinc-200 mb-3">
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-6 line-clamp-3">
                {product.short_description || product.full_description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-xs text-slate-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Autonomous ticket resolution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Multi-language knowledge base</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Instant API integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Verified 14-day free trial</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-zinc-800/80">
              <AffiliateCTA slug={product.slug} label="Visit #1 Deal" size="lg" className="w-full sm:w-auto flex-1" />
              <Link
                href={`/products/${product.slug}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Read Full Review</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

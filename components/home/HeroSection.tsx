'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Flame, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-12">
      {/* Main Hero Container - 100% Clean Layout without background patterns */}
      <div className="max-w-5xl mx-auto text-center px-4">
        
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-zinc-900/90 text-xs font-semibold text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 mb-4 shadow-xs"
        >
          <Sparkles size={14} className="text-indigo-500 dark:text-indigo-400" />
          <span>Curated AI Tools & Software Launch Directory</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 leading-[1.12]"
        >
          <span>Discover the Best Software & AI Tools</span>
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Before Everyone Else
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
          className="mt-4 text-base sm:text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Daily rankings, new launches, expert picks, and software deals for creators, marketers, founders, and businesses.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24, ease: 'easeOut' }}
          className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center items-center"
        >
          <Link
            href="/products"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span>Explore Top Products</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/launches"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-slate-800 bg-white hover:bg-slate-50 dark:bg-zinc-800/80 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700/60 hover:text-slate-900 dark:hover:text-white text-base flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span>View New Launches</span>
          </Link>
        </motion.div>

        {/* Trust Feature Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-9 pt-5 border-t border-slate-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500 dark:text-emerald-400" />
            <span>100% Hand-Vetted Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-amber-500 dark:text-amber-400" />
            <span>Daily Updated Rankings</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-500 dark:text-cyan-400" />
            <span>Verified Affiliate Deals</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

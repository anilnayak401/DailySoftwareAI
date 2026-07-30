'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, AlertCircle, TrendingUp, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface SeoCheck {
  label: string;
  passed: boolean;
  tip: string;
  points: number;
}

interface SeoAnalysis {
  score: number;
  checks: SeoCheck[];
  rankingTier: string;
  badgeColor: string;
}

interface FormData {
  name: string;
  website_url: string;
  tagline: string;
  category: string;
  pricing_type: string;
  launch_date: string;
  contact_email: string;
  description: string;
  logo_url: string;
  target_keywords: string;
}

interface Interactive3DSeoHealthProps {
  seoAnalysis: SeoAnalysis;
  formData: FormData;
}

export function Interactive3DSeoHealth({ seoAnalysis, formData }: Interactive3DSeoHealthProps) {
  // SVG Gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (seoAnalysis.score / 100) * circumference;

  return (
    <div className="space-y-6">
      
      {/* Sleek Professional SEO & Ranking Health Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-all">
        
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Zap size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                Live SEO & Ranking Health
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">Real-time algorithmic check & directory eligibility</p>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${seoAnalysis.badgeColor}`}>
            {seoAnalysis.score} / 100 PTS
          </span>
        </div>

        {/* Score & Tier Overview */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200/60 dark:border-zinc-800/80 mb-6">
          
          {/* Radial Score Gauge */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-slate-200 dark:stroke-zinc-800"
                strokeWidth="7"
                fill="transparent"
              />
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-indigo-600 dark:stroke-indigo-400"
                strokeWidth="7"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Score Number inside ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {seoAnalysis.score}
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                SCORE
              </span>
            </div>
          </div>

          {/* Ranking Tier Status */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Activity size={12} /> Directory Status
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {seoAnalysis.rankingTier}
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              {seoAnalysis.score >= 85
                ? 'Eligible for #1 Top Pick spotlight & homepage trending boost.'
                : seoAnalysis.score >= 60
                ? 'Eligible for Category launch & curated directory listing.'
                : 'Fill in all fields to improve product score & unlock top category placement.'}
            </p>
          </div>
        </div>

        {/* Diagnostic Checklist */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {seoAnalysis.checks.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between gap-3 text-xs p-2.5 rounded-xl border transition-colors ${
                item.passed
                  ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-slate-900 dark:text-zinc-100'
                  : 'bg-slate-50 dark:bg-zinc-950/60 border-slate-200/80 dark:border-zinc-800 text-slate-500 dark:text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.passed ? (
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-slate-400 dark:text-zinc-600 flex-shrink-0" />
                )}
                <div className="truncate">
                  <p className={`font-semibold truncate ${item.passed ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-400'}`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">{item.tip}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                  item.passed
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500'
                }`}
              >
                +{item.points} PTS
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Product Card Preview */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-indigo-500" />
            Live Product Card Preview
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
            Preview Card
          </span>
        </div>

        {/* Product Card Rendering */}
        <div className="border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-zinc-950/50">
          <div className="flex items-start gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0 overflow-hidden shadow-sm">
              {formData.logo_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={formData.logo_url} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                formData.name ? formData.name.substring(0, 2).toUpperCase() : 'DS'
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {formData.name || 'Your Product Name'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">
                {formData.tagline || 'Your product tagline will appear here...'}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {formData.description || 'Full editorial description preview will render dynamically as you type...'}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-zinc-800/80 text-xs">
            <span className="font-semibold text-slate-700 dark:text-zinc-300 capitalize flex items-center gap-1">
              <Sparkles size={12} className="text-indigo-500" />
              {formData.category.replace('-', ' ')}
            </span>
            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md font-bold text-[10px] uppercase">
              {formData.pricing_type}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

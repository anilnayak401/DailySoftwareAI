import { Metadata } from 'next';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Ranking Methodology — DailySoftwareAI',
  description: 'Learn how DailySoftwareAI ranks software tools, calculates editor scores, and selects daily #1 recommendations.',
};

export default function RankingMethodologyPage() {
  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Ranking Methodology', url: '/ranking-methodology' }]} />

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Award size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Ranking Methodology</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">How We Evaluate & Score Software Tools</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <p>
            At DailySoftwareAI, our goal is to maintain transparent, consistent, and trustworthy software rankings. Every product listed on our directory is evaluated against five core criteria to calculate its <strong className="text-slate-900 dark:text-zinc-100">Editor Score (0 - 10)</strong> and daily rank position.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Our 5 Core Ranking Pillars</h2>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>1. Feature Depth & Innovation (25%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We evaluate whether the tool provides genuine AI capabilities, reliable automation triggers, and comprehensive features compared to market competitors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>2. Ease of Use & Onboarding (20%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We test how fast a non-technical user can set up an account, connect integrations, and achieve value without needing complex custom code.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>3. Pricing Fairness & Value for Money (20%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We assess pricing tier transparency, free trial availability, and whether lifetime deal offers deliver real long-term cost savings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>4. Customer Support & Documentation (15%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We review vendor knowledge bases, tutorial quality, live chat response times, and ongoing platform updates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>5. User Adoption & Launch Momentum (20%)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We analyze community feedback, user reviews, and active launch momentum to identify trending products.
              </p>
            </div>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">How #1 Picks Are Selected</h2>
          <p className="text-xs text-slate-600 dark:text-zinc-300">
            Our editor selects a single <strong className="text-amber-600 dark:text-amber-400">#1 Pick of the Day</strong> based on outstanding performance across all 5 evaluation pillars. Paid placements are never permitted in editorial ranking slots.
          </p>
        </div>
      </div>
    </div>
  );
}

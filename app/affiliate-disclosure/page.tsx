import { Metadata } from 'next';
import { ShieldCheck, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — DailySoftwareAI',
  description: 'Learn about our affiliate relationships, network disclosures (JVZoo, WarriorPlus, Direct SaaS), and transparent monetization policies.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Affiliate Disclosure', url: '/affiliate-disclosure' }]} />

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Affiliate Disclosure</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">FTC Compliance & Network Policies Statement</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <p>
            At <strong className="text-slate-900 dark:text-zinc-100">DailySoftwareAI.com</strong>, transparency and user trust are our top priorities. In compliance with Federal Trade Commission (FTC) guidelines and affiliate marketplace policies (including JVZoo, WarriorPlus, and direct SaaS affiliate programs), please read our full disclosure below.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">How We Earn Revenue</h2>
          <p>
            Some of the links on DailySoftwareAI.com are affiliate links. This means that if you click on a button or link (such as "Visit Deal" or "Claim Exclusive Discount") and subsequently make a purchase on the vendor’s or marketplace’s website, DailySoftwareAI may earn a referral commission.
          </p>

          <div className="glass-panel p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-3">
            <Info size={18} className="flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">No Additional Cost To You</strong>
              Purchasing software through our affiliate links does NOT cost you anything extra. In many cases, our partnership allows us to negotiate exclusive lifetime discounts, free trials, or bonus packages that save you money.
            </div>
          </div>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Editorial Independence & Ranking Integrity</h2>
          <p>
            Our review scores, star ratings, pros & cons, and #1 Pick recommendations are determined strictly by independent editorial assessment led by founder Naresh. Affiliate commissions do NOT influence our product ratings, editorial scores, or ranking placement. If a software tool does not meet our quality standards, we state its limitations clearly regardless of commission potential.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Affiliate Marketplace Disclosures</h2>
          <p>
            DailySoftwareAI participates in various affiliate platforms, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500 dark:text-zinc-400">
            <li>JVZoo Affiliate Program</li>
            <li>WarriorPlus Affiliate Network</li>
            <li>Direct SaaS Vendor Partner Programs</li>
            <li>Independent Software Marketplace Programs</li>
          </ul>

          <p className="text-xs text-slate-500 dark:text-zinc-400 pt-4 border-t border-slate-200 dark:border-zinc-800">
            If you have any questions regarding our affiliate relationships, please feel free to <a href="/contact" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Contact Support</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

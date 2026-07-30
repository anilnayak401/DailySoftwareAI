import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Editorial Policy — DailySoftwareAI',
  description: 'Our editorial principles, review standards, and commitment to independent software evaluation.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Editorial Policy', url: '/editorial-policy' }]} />

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Editorial Policy</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">Our Review Standards & Principles</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <p>
            DailySoftwareAI is dedicated to publishing honest, objective, and practical software reviews. Our editorial team, led by founder Naresh, adheres to strict guidelines to protect reader trust.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Our Key Editorial Guarantees</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-zinc-300">
            <li><strong>Independent Assessments:</strong> Vendors cannot pay to alter review scores, star ratings, or pros & cons analysis.</li>
            <li><strong>No Verbatim Copying:</strong> We write original descriptions, pros/cons breakdowns, and FAQs for every product listing.</li>
            <li><strong>Regular Updates:</strong> We re-test listings periodically to reflect new feature releases, pricing changes, or deal expirations.</li>
            <li><strong>Clear Disclosures:</strong> Affiliate links are clearly labeled and disclosed near every Call To Action button site-wide.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

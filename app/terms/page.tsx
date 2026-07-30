import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions — DailySoftwareAI',
  description: 'Terms and conditions governing the usage of DailySoftwareAI.com.',
};

export default function TermsPage() {
  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Terms & Conditions', url: '/terms' }]} />

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 border-b border-slate-200 dark:border-zinc-800 pb-4">Terms & Conditions</h1>

        <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <p>Effective Date: {new Date().getFullYear()}</p>

          <p>
            Welcome to DailySoftwareAI.com! By accessing or using our website, you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Use of Content & Disclaimer</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            All reviews, ratings, and deal information on DailySoftwareAI are provided for informational and educational purposes. Software prices, features, and lifetime deals are subject to change by third-party vendors without notice.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">External Links</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Our website contains links to third-party vendor sites and affiliate marketplaces. DailySoftwareAI is not responsible for the privacy practices, content, or terms of third-party websites.
          </p>
        </div>
      </div>
    </div>
  );
}

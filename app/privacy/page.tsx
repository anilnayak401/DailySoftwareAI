import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy — DailySoftwareAI',
  description: 'DailySoftwareAI privacy policy covering data collection, cookies, and first-party analytics.',
};

export default function PrivacyPage() {
  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 border-b border-slate-200 dark:border-zinc-800 pb-4">Privacy Policy</h1>

        <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
          <p>Effective Date: {new Date().getFullYear()}</p>

          <p>
            At DailySoftwareAI.com, accessible from https://dailysoftwareai.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DailySoftwareAI and how we use it.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Information We Collect</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            We collect minimal information necessary to deliver our website services, including newsletter email subscriptions (stored securely in our database) and first-party affiliate redirect click logs (timestamp, product ID, referrer, and user-agent string).
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Google Analytics & Cookies</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            DailySoftwareAI uses standard log files and Google Analytics 4 to collect aggregate visitor statistics. These cookies store non-personally identifiable information such as browser type, page views, and time spent on site.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100 pt-2">Contact Us</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="/contact" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Contact Support</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

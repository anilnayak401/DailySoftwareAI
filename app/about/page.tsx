import { Metadata } from 'next';
import Link from 'next/link';
import { UserCheck, ShieldCheck, Cpu, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Founder Naresh & DailySoftwareAI',
  description:
    'Learn about DailySoftwareAI founder Naresh, our hands-on software testing methodology, and our mission to simplify AI tool discovery.',
};

export default function AboutPage() {
  return (
    <div className="py-6 max-w-4xl mx-auto space-y-10">
      <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <Sparkles size={14} className="text-indigo-500 dark:text-indigo-400" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          About DailySoftwareAI.com
        </h1>
        <p className="text-base text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto">
          Simplifying software discovery with hand-vetted reviews, daily rankings, and verified deal alerts.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <div className="glass-card rounded-3xl p-8 border border-indigo-500/30 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-1 flex-shrink-0">
            <div className="w-full h-full rounded-xl bg-slate-900 dark:bg-zinc-950 flex items-center justify-center font-black text-2xl text-white">
              N
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/30 mb-2">
              <UserCheck size={13} />
              Founder & Editor-in-Chief
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Naresh</h2>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">AI Automation Engineer & Software Affiliate</p>
            <p className="text-sm text-slate-600 dark:text-zinc-300 mt-3 leading-relaxed">
              As an AI Automation Engineer with hands-on experience building workflow integrations, testing AI agents, and deploying CRM software, I founded DailySoftwareAI to provide honest, transparent reviews so creators, marketers, and SaaS founders can choose software with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800">
          <Cpu size={24} className="text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-1">Hands-on Testing</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Every software product listed on our site is evaluated for setup speed, feature depth, and customer support responsiveness.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800">
          <ShieldCheck size={24} className="text-emerald-500 dark:text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-1">Unbiased Editorial</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Our editorial ratings and #1 picks are determined strictly by quality and user value — never by commission rates.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800">
          <CheckCircle2 size={24} className="text-cyan-500 dark:text-cyan-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-1">Verified Deals</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            We partner directly with vendors, JVZoo, and WarriorPlus creators to verify active discount codes and lifetime offers.
          </p>
        </div>
      </div>

      {/* Contact Link Banner */}
      <div className="glass-card rounded-2xl p-6 text-center border border-slate-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-base font-bold text-slate-900 dark:text-zinc-100">Have a product you want us to review?</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Reach out to Naresh and the editorial team directly.</p>
        </div>
        <Link
          href="/contact"
          className="glow-button px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
        >
          <Mail size={15} />
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
}

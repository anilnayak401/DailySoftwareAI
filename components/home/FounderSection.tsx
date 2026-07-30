import React from 'react';
import Link from 'next/link';
import { UserCheck, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="my-16">
      <div className="glass-card rounded-3xl p-8 border border-indigo-500/25 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Avatar / Founder Identity */}
          <div className="flex-shrink-0 text-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-1 shadow-2xl mx-auto mb-3">
              <div className="w-full h-full rounded-xl bg-zinc-950 flex items-center justify-center font-black text-2xl text-white">
                N
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
              <UserCheck size={12} />
              Founder & Editor
            </div>
          </div>

          {/* Bio Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-2">
              Meet Naresh — Founder & AI Automation Engineer
            </h2>
            <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
              Hi, I’m Naresh! I built DailySoftwareAI to bring transparency and clarity to software discovery. As an AI Automation Engineer and software affiliate, I spend hundreds of hours testing AI tools, SaaS products, automation workflows, CRM systems, and digital launches so you don’t have to guess.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 dark:text-zinc-400 mb-6">
              <div className="flex items-center gap-1.5">
                <Cpu size={14} className="text-indigo-500 dark:text-indigo-400" />
                <span>Hands-on Tool Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500 dark:text-emerald-400" />
                <span>Unbiased Editorial Ratings</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
            >
              <span>Learn more about our review process</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

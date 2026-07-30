import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ProsConsProps {
  pros?: string[];
  cons?: string[];
}

export function ProsCons({ pros = [], cons = [] }: ProsConsProps) {
  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pros Column */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-500/5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-500/20">
          <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Pros & Strengths</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Column */}
      <div className="glass-card rounded-2xl p-6 border border-rose-500/30 bg-rose-500/5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-rose-500/20">
          <XCircle size={20} className="text-rose-600 dark:text-rose-400" />
          <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300">Cons & Limitations</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <XCircle size={16} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

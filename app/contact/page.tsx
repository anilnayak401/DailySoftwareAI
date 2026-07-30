'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-6 max-w-3xl mx-auto space-y-8">
      <Breadcrumbs items={[{ name: 'Contact Support', url: '/contact' }]} />

      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
          Contact DailySoftwareAI
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-300">
          Have a question about a software review, need deal support, or want to submit your tool for listing?
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-zinc-800">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Message Sent Successfully!</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-md mx-auto">
              Thank you for reaching out to DailySoftwareAI. Naresh or a member of our editorial team will get back to you within 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Naresh"
                  required
                  className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="general">General Inquiry</option>
                <option value="submit-product">Submit a Product for Review</option>
                <option value="deal-support">Affiliate Deal Support</option>
                <option value="press">Press & Partnerships</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                required
                className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="glow-button w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

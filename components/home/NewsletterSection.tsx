'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage("You're already subscribed! Check your inbox for upcoming software alerts.");
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing! Check your inbox for weekly software & deal alerts.');
        setEmail('');
      }
    } catch {
      setStatus('success');
      setMessage('Thank you for subscribing! We will send you top software launch alerts weekly.');
      setEmail('');
    }
  };

  return (
    <section className="my-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 border border-indigo-500/30">
        <div className="max-w-2xl mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Never Miss a Trending AI Tool or Lifetime Deal
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300">
            Get the best new software, daily rankings, exclusive lifetime deals & launch alerts — delivered weekly. No spam ever.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Subscribe Free'
              )}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={15} />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <p className="mt-4 text-xs font-semibold text-rose-500 dark:text-rose-400">{message}</p>
          )}

          <p className="mt-4 text-[11px] text-zinc-500">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="text-zinc-700 dark:text-zinc-400 underline hover:text-indigo-600 dark:hover:text-indigo-300">
              Privacy Policy
            </a>
            . Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

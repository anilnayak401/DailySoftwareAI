'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push('/admin/products');
      }
    } catch (err: unknown) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="glass-card rounded-3xl p-8 sm:p-10 border border-indigo-500/30 max-w-md w-full relative">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard Login</h1>
          <p className="text-xs text-gray-400 mt-1">DailySoftwareAI.com Content Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dailysoftwareai.com"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              <Mail size={14} className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              <Lock size={14} className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {status === 'error' && (
            <p className="text-xs font-semibold text-rose-400 text-center bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/30">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="glow-button w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Log In to Portal'}
          </button>
        </form>

        <p className="mt-6 text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Protected Auth Route (Supabase Auth)</span>
        </p>
      </div>
    </div>
  );
}

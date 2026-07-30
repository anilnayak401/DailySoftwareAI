'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, Home, Box, Grid, Calendar, Award, Info, Search, PlusCircle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white dark:bg-zinc-950 border-l border-slate-200 dark:border-zinc-800 h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                DS
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-lg">DailySoftwareAI</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Search */}
          <div className="mt-6">
            <form action="/products" method="GET" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search AI software..."
                className="w-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <Search size={14} className="absolute left-3 top-3 text-slate-400 dark:text-zinc-500" />
            </form>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Home size={16} className="text-indigo-600 dark:text-indigo-400" />
              Home
            </Link>
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Box size={16} className="text-indigo-600 dark:text-indigo-400" />
              Products Directory
            </Link>
            <Link
              href="/categories"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Grid size={16} className="text-indigo-600 dark:text-indigo-400" />
              Categories
            </Link>
            <Link
              href="/launches"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
              Launch Calendar
            </Link>
            <Link
              href="/top-rated"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Award size={16} className="text-indigo-600 dark:text-indigo-400" />
              Top Rated Picks
            </Link>
            <Link
              href="/submit"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors font-semibold"
            >
              <PlusCircle size={16} className="text-indigo-600 dark:text-indigo-400" />
              Submit Your Product
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
            >
              <Info size={16} className="text-indigo-600 dark:text-indigo-400" />
              About Naresh
            </Link>
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800">
          <Link
            href="/products"
            onClick={onClose}
            className="glow-button w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold shadow-lg"
          >
            <Sparkles size={16} />
            Explore All Deals
          </Link>
        </div>
      </div>
    </div>
  );
}

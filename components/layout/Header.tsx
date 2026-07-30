'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, Sparkles } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Launches', href: '/launches' },
    { name: 'Top Rated', href: '/top-rated' },
    { name: 'About', href: '/about' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-slate-200/80 dark:border-zinc-800/80 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 lg:gap-4">
          {/* Clean Inline Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              DS
            </div>
            <span className="text-lg xl:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5 whitespace-nowrap">
              DailySoftware<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links - Always strictly one line */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-shrink-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium transition-all relative duration-150 whitespace-nowrap flex-shrink-0',
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-500/10'
                      : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Axis Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <form onSubmit={handleSearchSubmit} className="hidden sm:relative sm:block w-36 md:w-48 xl:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI software..."
                className="w-full bg-slate-100/80 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-950 transition-all"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400 dark:text-zinc-500" />
            </form>

            {/* Custom Theme Switcher */}
            <ThemeToggle />

            {/* Primary Action Button - Submit Product */}
            <Link
              href="/submit"
              className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-500 text-white items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20 whitespace-nowrap flex-shrink-0 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles size={13} />
              Submit Product
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

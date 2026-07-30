import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950/90 border-t border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-sm mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-xs shadow-md">
                DS
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">DailySoftwareAI</span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              DailySoftwareAI.com is your trusted software discovery, daily ranking, and launch-tracking directory. Discover curated AI tools, SaaS products, and lifetime deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Directory</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">All Software</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Categories</Link></li>
              <li><Link href="/launches" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Launch Calendar</Link></li>
              <li><Link href="/top-rated" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Top Rated Picks</Link></li>
              <li><Link href="/submit" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">Submit Product</Link></li>
            </ul>
          </div>

          {/* Company & Trust */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Company & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Founder</Link></li>
              <li><Link href="/ranking-methodology" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Ranking Methodology</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Editorial Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Mandatory Affiliate Disclosure */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} DailySoftwareAI.com. All rights reserved.</p>
          <p className="text-center md:text-right text-zinc-500 max-w-xl leading-relaxed">
            <span className="font-semibold text-zinc-700 dark:text-zinc-400">Affiliate Disclosure:</span> DailySoftwareAI.com is reader-supported. When you buy software through links on our site, we may earn an affiliate commission at no additional cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { Search, Home, ArrowRight, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center py-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-xl w-full border-indigo-500/30">
        <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
          <HelpCircle size={32} />
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-tight">404 — Page Not Found</h1>
        <p className="mt-3 text-sm text-gray-300">
          The software review, category, or deal page you are looking for does not exist or has been moved.
        </p>

        {/* Search Input */}
        <form action="/products" method="GET" className="mt-6 relative max-w-md mx-auto">
          <input
            type="text"
            name="search"
            placeholder="Search software or AI tools..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-indigo-500"
          />
          <Search size={16} className="absolute left-3 top-3.5 text-gray-500" />
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="glow-button px-6 py-2.5 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Back to Homepage</span>
          </Link>
          <Link
            href="/products"
            className="px-6 py-2.5 rounded-xl font-semibold text-gray-200 hover:text-white bg-gray-800 border border-gray-700 text-xs flex items-center justify-center gap-2"
          >
            <span>Browse All Tools</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

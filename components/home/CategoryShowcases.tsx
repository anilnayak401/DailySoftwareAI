import React from 'react';
import Link from 'next/link';
import { Bot, Workflow, Search, Tag, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from '../ui/ProductCard';

interface CategoryShowcasesProps {
  aiTools: Product[];
  automationTools: Product[];
  seoTools: Product[];
  lifetimeDeals: Product[];
}

export function CategoryShowcases({
  aiTools,
  automationTools,
  seoTools,
  lifetimeDeals,
}: CategoryShowcasesProps) {
  const categories = [
    { title: 'Best AI Tools', icon: Bot, href: '/categories/ai-tools', items: aiTools },
    { title: 'Best Automation Software', icon: Workflow, href: '/categories/automation', items: automationTools },
    { title: 'Best SEO Tools', icon: Search, href: '/categories/seo', items: seoTools },
    { title: 'Exclusive Lifetime Deals', icon: Tag, href: '/products?pricing=lifetime', items: lifetimeDeals },
  ];

  return (
    <div className="space-y-12 my-12">
      {categories.map((cat) => {
        if (!cat.items || cat.items.length === 0) return null;
        const Icon = cat.icon;

        return (
          <section key={cat.title}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {cat.title}
                </h2>
              </div>
              <Link
                href={cat.href}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.slice(0, 3).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

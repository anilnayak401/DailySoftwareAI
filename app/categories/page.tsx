import { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Workflow, Search, Tag, Database, LayoutGrid, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Software & AI Tool Categories Directory',
  description:
    'Browse all software categories including AI tools, automation software, SEO platforms, CRM systems, email marketing, and lifetime deals.',
};

const CATEGORIES_LIST = [
  {
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'Generative AI software, autonomous AI agents, text generators, and image models.',
    icon: Bot,
    count: '40+ Tools',
  },
  {
    name: 'Business & Marketing',
    slug: 'business-marketing',
    description: 'AI ad generators, email autoresponders, agency builders, and video marketing platforms.',
    icon: LayoutGrid,
    count: '30+ Tools',
  },
  {
    name: 'PLR & Prompt Kits',
    slug: 'plr-content',
    description: 'Private Label Rights assets, Midjourney prompt vaults, coloring books, and digital printables.',
    icon: Tag,
    count: '25+ Products',
  },
  {
    name: 'Software & Apps',
    slug: 'software-apps',
    description: 'Cloud applications, email autoresponders, automation utilities, and SaaS platforms.',
    icon: Workflow,
    count: '35+ Apps',
  },
  {
    name: 'Make Money Online',
    slug: 'make-money-online',
    description: 'Digital business blueprints, monetization systems, and agency growth software.',
    icon: Database,
    count: '20+ Systems',
  },
  {
    name: 'SEO',
    slug: 'seo',
    description: 'Keyword research tools, rank trackers, technical audit suites, and backlink analyzers.',
    icon: Search,
    count: '15+ Tools',
  },
  {
    name: 'Automation',
    slug: 'automation',
    description: 'No-code workflow builders, app integration tools, and business process automation.',
    icon: Workflow,
    count: '20+ Tools',
  },
];

export default function CategoriesIndexPage() {
  return (
    <div className="py-6 space-y-8">
      <Breadcrumbs items={[{ name: 'Categories', url: '/categories' }]} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <Sparkles size={14} />
          <span>Topic Hubs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Software Categories
        </h1>
        <p className="text-base text-slate-600 dark:text-zinc-300">
          Find top-ranked tools, reviews, and exclusive deals grouped by topic and business function.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {CATEGORIES_LIST.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-zinc-800 hover:border-indigo-500/40 group transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                  {cat.count}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {cat.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{cat.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

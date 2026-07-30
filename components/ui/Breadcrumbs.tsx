import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailysoftwareai.com';

  const schemaItems = [
    { name: 'Home', url: siteUrl },
    ...items.map((item) => ({
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="my-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <Home size={13} />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-slate-400 dark:text-zinc-600 flex-shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-slate-900 dark:text-zinc-100 truncate max-w-[200px] sm:max-w-none">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

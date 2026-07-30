import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateCTAProps {
  slug: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function AffiliateCTA({
  slug,
  label = 'Visit Deal',
  size = 'md',
  fullWidth = false,
  className,
}: AffiliateCTAProps) {
  const href = `/go/${slug}`;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-semibold',
    lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5 font-bold',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={cn(
        'bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 font-medium transition-all shadow-sm inline-flex items-center justify-center cursor-pointer select-none tracking-wide text-center',
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      <span>{label}</span>
      <ExternalLink size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15} />
    </a>
  );
}

import React from 'react';
import { Flame, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankBadgeProps {
  rank?: number | null;
  isTopPick?: boolean;
  isTrending?: boolean;
  className?: string;
}

export function RankBadge({ rank, isTopPick, isTrending, className }: RankBadgeProps) {
  if (isTopPick) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xs border border-amber-400/40',
          className
        )}
      >
        <Trophy size={13} className="fill-white" />
        #1 Today Pick
      </span>
    );
  }

  if (isTrending) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
          className
        )}
      >
        <TrendingUp size={13} />
        {rank ? `#${rank} Trending` : 'Trending'}
      </span>
    );
  }

  if (rank) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30',
          className
        )}
      >
        <Flame size={13} className="text-indigo-600 dark:text-indigo-400" />
        Rank #{rank}
      </span>
    );
  }

  return null;
}

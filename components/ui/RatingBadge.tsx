import React from 'react';
import { Star, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating?: number | null;
  editorScore?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingBadge({ rating, editorScore, className, size = 'md' }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {rating !== undefined && rating !== null && (
        <div
          className={cn(
            'inline-flex items-center font-semibold rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30',
            sizeClasses[size]
          )}
          title={`User Rating: ${rating} / 5`}
        >
          <Star size={iconSizes[size]} className="fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      )}

      {editorScore !== undefined && editorScore !== null && (
        <div
          className={cn(
            'inline-flex items-center font-semibold rounded-full bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30',
            sizeClasses[size]
          )}
          title={`Editor Score: ${editorScore} / 10`}
        >
          <Award size={iconSizes[size]} className="text-indigo-600 dark:text-indigo-400" />
          <span>{editorScore.toFixed(1)}/10 Score</span>
        </div>
      )}
    </div>
  );
}

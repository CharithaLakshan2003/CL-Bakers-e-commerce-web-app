import { cn } from '@/lib/utils';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

const sizes = { sm: 12, md: 16, lg: 20 };

export function StarRating({
  rating, maxStars = 5, size = 'md', showNumber = false,
  reviewCount, interactive = false, onRate, className,
}: StarRatingProps) {
  const px = sizes[size];
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = rating >= i + 1;
          const half = !filled && rating >= i + 0.5;
          return (
            <button
              key={i}
              type={interactive ? 'button' : undefined}
              onClick={() => interactive && onRate?.(i + 1)}
              className={cn('text-honey', interactive && 'cursor-pointer hover:scale-110 transition-transform')}
              aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
            >
              {filled
                ? <Star size={px} fill="currentColor" strokeWidth={0} />
                : half
                  ? <StarHalf size={px} fill="currentColor" strokeWidth={0} />
                  : <Star size={px} className="text-stone/30 dark:text-stone/40" fill="none" />
              }
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-text-secondary text-sm font-medium">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-text-muted text-xs">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

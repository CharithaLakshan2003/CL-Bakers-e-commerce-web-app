import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { btn: 'w-6 h-6 text-xs', num: 'text-sm w-8', icon: 12 },
  md: { btn: 'w-8 h-8 text-sm', num: 'text-base w-10', icon: 14 },
  lg: { btn: 'w-10 h-10 text-base', num: 'text-lg w-12', icon: 16 },
};

export function QuantitySelector({
  value, min = 1, max = 99, onChange, size = 'md', className,
}: QuantitySelectorProps) {
  const s = sizes[size];
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          s.btn,
          'rounded-full border-2 border-border flex items-center justify-center',
          'text-text-secondary hover:border-primary-600 hover:text-primary-600',
          'transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={s.icon} />
      </button>
      <span className={cn(s.num, 'text-center font-semibold text-text-primary tabular-nums')}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          s.btn,
          'rounded-full border-2 border-border flex items-center justify-center',
          'text-text-secondary hover:border-primary-600 hover:text-primary-600',
          'transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
        )}
        aria-label="Increase quantity"
      >
        <Plus size={s.icon} />
      </button>
    </div>
  );
}

import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'sale' | 'low-stock' | 'special' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

const styles: Record<BadgeVariant, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  sale: 'bg-honey text-primary-900',
  'low-stock': 'bg-tangerine/15 text-tangerine dark:bg-tangerine/20',
  special: 'bg-primary-600 text-white',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  neutral: 'bg-stone/10 text-stone dark:bg-stone/20',
};

const labels: Partial<Record<BadgeVariant, string>> = {
  new: 'New',
  sale: 'Sale',
  'low-stock': 'Low Stock',
  special: "Today's Special",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = 'neutral', children, className, dot }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold leading-none',
      styles[variant],
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full bg-current')} />}
      {children ?? labels[variant]}
    </span>
  );
}

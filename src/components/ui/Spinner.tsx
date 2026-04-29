import { cn } from '@/lib/utils';

interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; className?: string; }

const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' };

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        sizes[size],
        'rounded-full border-border border-t-primary-600 animate-spin',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-text-muted text-sm animate-pulse">Loading…</p>
      </div>
    </div>
  );
}

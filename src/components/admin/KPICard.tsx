import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
}

export function KPICard({ title, value, trend, icon }: KPICardProps) {
  return (
    <div className="bg-card-bg border border-border rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          <p className="font-display text-3xl font-bold text-text-primary">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className={cn('flex items-center gap-1 mt-4 text-sm font-medium', trend > 0 ? 'text-sage' : 'text-red-500')}>
          {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(trend)}% vs last week</span>
        </div>
      )}
    </div>
  );
}

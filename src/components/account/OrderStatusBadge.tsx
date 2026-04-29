import { cn } from '@/lib/utils';
import { getStatusColor, formatStatus } from '@/lib/utils';
import type { OrderStatus } from '@/types';

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', getStatusColor(status), className)}>
      {formatStatus(status)}
    </span>
  );
}

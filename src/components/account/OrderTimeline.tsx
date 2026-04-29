import { Check, Loader2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const statusFlow: { id: OrderStatus; label: string; desc: string }[] = [
  { id: 'CONFIRMED', label: 'Order Confirmed', desc: 'We have received your order.' },
  { id: 'BAKING', label: 'Baking', desc: 'Our bakers are preparing your items.' },
  { id: 'READY_FOR_PICKUP', label: 'Ready / Out for Delivery', desc: 'Order is ready.' },
  { id: 'DELIVERED', label: 'Completed', desc: 'Enjoy your baked goods!' },
];

export function OrderTimeline({ currentStatus, updatedAt }: { currentStatus: OrderStatus; updatedAt: string }) {
  if (currentStatus === 'CANCELLED' || currentStatus === 'REFUNDED') {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
        <p className="font-semibold">Order {currentStatus}</p>
        <p className="text-sm mt-1">This order was cancelled on {formatDate(updatedAt)}.</p>
      </div>
    );
  }

  const currentIndex = statusFlow.findIndex(s => s.id === currentStatus);
  const normalizedIndex = currentStatus === 'COMPLETED' ? 3 : Math.max(0, currentIndex);

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border" />
      <div className="space-y-6 relative">
        {statusFlow.map((step, i) => {
          const isCompleted = i < normalizedIndex;
          const isCurrent = i === normalizedIndex;

          return (
            <div key={step.id} className="flex items-start gap-4">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors border-4 border-card-bg',
                isCompleted ? 'bg-sage text-white' :
                isCurrent ? 'bg-primary-600 text-white' : 'bg-border text-text-muted'
              )}>
                {isCompleted ? <Check size={16} /> : isCurrent && i !== 3 ? <Loader2 size={16} className="animate-spin" /> : i + 1}
              </div>
              <div className="pt-2">
                <p className={cn('font-semibold text-sm', isCurrent ? 'text-primary-600' : isCompleted ? 'text-text-primary' : 'text-text-muted')}>
                  {step.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

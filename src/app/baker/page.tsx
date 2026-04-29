'use client';
import { useState, useMemo } from 'react';
import { mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Clock } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { OrderStatusBadge } from '@/components/account/OrderStatusBadge';

export default function BakerDashboard() {
  const [orders, setOrders] = useState(mockOrders.filter(o => o.status === 'CONFIRMED' || o.status === 'BAKING'));

  // Aggregate items to bake
  const itemsToBake = useMemo(() => {
    const agg: Record<string, { name: string; qty: number }> = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!agg[item.productId]) agg[item.productId] = { name: item.productName, qty: 0 };
        agg[item.productId].qty += item.quantity;
      });
    });
    return Object.values(agg).sort((a, b) => b.qty - a.qty);
  }, [orders]);

  const updateStatus = (id: string, newStatus: any) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Left Col: Aggregated Baking List */}
      <div className="bg-card-bg border border-border rounded-2xl p-6 h-fit sticky top-6">
        <h2 className="font-display text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          📋 Master Production List
        </h2>
        <div className="space-y-2">
          {itemsToBake.map(item => (
            <div key={item.name} className="flex justify-between items-center p-3 bg-bg-secondary rounded-xl">
              <span className="font-medium text-text-primary">{item.name}</span>
              <span className="font-bold text-xl text-primary-600 bg-primary-100 dark:bg-primary-900/40 w-10 h-10 flex items-center justify-center rounded-lg">{item.qty}</span>
            </div>
          ))}
          {itemsToBake.length === 0 && <p className="text-text-muted text-sm text-center py-4">All caught up!</p>}
        </div>
      </div>

      {/* Right Col: Active Orders Board */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="font-display text-2xl font-bold text-text-primary">Active Orders Kanban</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Confirmed Column */}
          <div className="bg-bg-secondary p-4 rounded-2xl border border-border">
            <h3 className="font-bold text-text-primary mb-4">To Bake ({orders.filter(o => o.status === 'CONFIRMED').length})</h3>
            <div className="space-y-4">
              {orders.filter(o => o.status === 'CONFIRMED').map(order => (
                <OrderCard key={order.id} order={order} onMove={() => updateStatus(order.id, 'BAKING')} actionLabel="Start Baking" />
              ))}
            </div>
          </div>

          {/* Baking Column */}
          <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl border border-primary-200 dark:border-primary-800">
            <h3 className="font-bold text-primary-700 dark:text-primary-300 mb-4 flex items-center gap-2">
              <Clock size={18} className="animate-pulse" /> In Oven ({orders.filter(o => o.status === 'BAKING').length})
            </h3>
            <div className="space-y-4">
              {orders.filter(o => o.status === 'BAKING').map(order => (
                <OrderCard key={order.id} order={order} onMove={() => updateStatus(order.id, 'READY_FOR_PICKUP')} actionLabel="Mark Ready" variant="primary" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, onMove, actionLabel, variant = 'default' }: { order: any, onMove: () => void, actionLabel: string, variant?: 'default' | 'primary' }) {
  return (
    <div className={`bg-card-bg p-4 rounded-xl border ${variant === 'primary' ? 'border-primary-300 shadow-md' : 'border-border shadow-sm'}`}>
      <div className="flex justify-between items-start mb-3 border-b border-border pb-2">
        <div>
          <p className="font-bold text-text-primary">#{order.id}</p>
          <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">Due: {formatTime(new Date(order.createdAt).getTime() + 7200000)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <ul className="space-y-1.5 mb-4 text-sm text-text-secondary">
        {order.items.map((item: any) => (
          <li key={item.id} className="flex justify-between font-medium">
            <span>{item.quantity}x {item.productName}</span>
          </li>
        ))}
      </ul>
      {order.specialInstructions && (
        <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-300">
          <strong>Note:</strong> {order.specialInstructions}
        </div>
      )}
      <Button fullWidth size="sm" onClick={onMove} icon={<CheckCircle2 size={14} />}>
        {actionLabel}
      </Button>
    </div>
  );
}

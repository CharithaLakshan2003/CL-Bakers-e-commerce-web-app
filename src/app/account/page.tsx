'use client';
import { useUserStore } from '@/stores/user.store';
import { mockOrders } from '@/lib/mock-data';
import { OrderStatusBadge } from '@/components/account/OrderStatusBadge';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, Clock, Star, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AccountDashboardPage() {
  const { user } = useUserStore();
  const recentOrders = mockOrders.slice(0, 2);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-primary-100 text-sm font-medium mb-1">Loyalty Points</p>
              <p className="font-display text-4xl font-bold">{user?.loyaltyPoints || 0}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Star fill="currentColor" className="text-honey" size={20} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-center text-sm">
            <span className="text-primary-100">Equals {formatPrice((user?.loyaltyPoints || 0) * 0.05)}</span>
            <Link href="/shop" className="text-white font-medium hover:underline flex items-center gap-1">
              Redeem <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-card-bg border border-border rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Total Orders</p>
              <p className="font-display text-4xl font-bold text-text-primary">{mockOrders.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600">
              <Package size={20} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-sm">
            <span className="text-text-muted">Last order: {formatDate(mockOrders[0].createdAt)}</span>
            <Link href="/account/orders" className="text-primary-600 font-medium hover:underline">View All</Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card-bg border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-text-primary text-lg">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">See All</Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-muted text-sm mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/shop"><Button size="sm">Start Shopping</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-xl">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-text-primary">{order.id}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-text-muted flex items-center gap-1.5">
                    <Clock size={14} /> {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-text-primary">{formatPrice(order.total)}</p>
                    <p className="text-xs text-text-muted">{order.items.length} items</p>
                  </div>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm">Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

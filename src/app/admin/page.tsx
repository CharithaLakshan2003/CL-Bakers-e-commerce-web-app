'use client';
import { mockAnalytics, mockProducts } from '@/lib/mock-data';
import { KPICard } from '@/components/admin/KPICard';
import { SalesChart } from '@/components/admin/SalesChart';
import { DollarSign, ShoppingCart, Users, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-primary">Overview</h1>
        <p className="text-text-muted mt-1">Here&apos;s what&apos;s happening with your bakery today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Today's Revenue" value={formatPrice(mockAnalytics.todayRevenue)} trend={12.5} icon={<DollarSign />} />
        <KPICard title="Today's Orders" value={mockAnalytics.todayOrders} trend={8.2} icon={<ShoppingCart />} />
        <KPICard title="New Customers" value={mockAnalytics.newCustomers} trend={-2.4} icon={<Users />} />
        <KPICard title="Low Stock Alerts" value={mockAnalytics.lowStockItems} icon={<AlertCircle className="text-tangerine" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-card-bg border border-border rounded-2xl p-6">
          <h2 className="font-bold text-text-primary mb-6">Revenue This Week</h2>
          <SalesChart />
        </div>

        {/* Top Products */}
        <div className="bg-card-bg border border-border rounded-2xl p-6">
          <h2 className="font-bold text-text-primary mb-6">Top Products</h2>
          <div className="space-y-5">
            {mockAnalytics.topProducts.map((p, i) => {
              const product = mockProducts.find(mp => mp.name.includes(p.name));
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg bg-bg-secondary overflow-hidden shrink-0">
                    {product ? <Image src={product.images[0]} alt={p.name} fill className="object-cover" /> : <div className="w-full h-full bg-border" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-text-primary truncate">{p.name}</p>
                    <p className="text-xs text-text-muted">{p.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-primary-600">{formatPrice(p.revenue)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

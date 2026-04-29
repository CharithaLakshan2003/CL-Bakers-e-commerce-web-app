'use client';
import { mockOrders } from '@/lib/mock-data';
import { DataTable } from '@/components/admin/DataTable';
import { OrderStatusBadge } from '@/components/account/OrderStatusBadge';
import { formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function AdminOrdersPage() {
  const columns = [
    { header: 'Order ID', accessor: 'id' as const, className: 'font-medium' },
    { header: 'Date', accessor: (row: typeof mockOrders[0]) => formatDate(row.createdAt) },
    { header: 'Customer', accessor: 'userId' as const },
    { header: 'Total', accessor: (row: typeof mockOrders[0]) => <span className="font-semibold">{formatPrice(row.total)}</span> },
    { header: 'Status', accessor: (row: typeof mockOrders[0]) => <OrderStatusBadge status={row.status} /> },
    { header: 'Actions', accessor: (row: typeof mockOrders[0]) => (
      <Button variant="outline" size="sm">Manage</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-text-primary">Orders Management</h1>
        <div className="flex gap-2">
          <select className="bg-input-bg border border-border rounded-lg px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Baking</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={mockOrders} />
    </div>
  );
}

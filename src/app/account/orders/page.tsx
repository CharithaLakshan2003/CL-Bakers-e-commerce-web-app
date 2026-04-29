'use client';
import { mockOrders } from '@/lib/mock-data';
import { OrderStatusBadge } from '@/components/account/OrderStatusBadge';
import { OrderTimeline } from '@/components/account/OrderTimeline';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Image from 'next/image';

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">My Orders</h1>

      {selectedOrder ? (
        <OrderDetails order={mockOrders.find(o => o.id === selectedOrder)!} onBack={() => setSelectedOrder(null)} />
      ) : (
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-card-bg border border-border rounded-2xl p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-text-primary">Order {order.id}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-text-muted">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-text-primary">{formatPrice(order.total)}</p>
                    <p className="text-xs text-text-muted">{order.items.length} items</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order.id)}>
                    View Details
                  </Button>
                </div>
              </div>

              {/* Items preview */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {order.items.map(item => (
                  <div key={item.id} className="relative w-16 h-16 rounded-lg overflow-hidden bg-bg-secondary shrink-0 border border-border">
                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="64px" />
                    <span className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-tl-lg">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderDetails({ order, onBack }: { order: typeof mockOrders[0], onBack: () => void }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="text-sm font-medium text-text-muted hover:text-primary-600 transition-colors">
        ← Back to Orders
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card-bg border border-border rounded-2xl p-5">
        <div>
          <h2 className="font-bold text-lg text-text-primary mb-1">Order {order.id}</h2>
          <p className="text-sm text-text-muted">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card-bg border border-border rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-text-primary border-b border-border pb-3">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary text-sm line-clamp-1">{item.productName}</p>
                  <p className="text-text-muted text-xs mt-0.5">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-text-primary">{formatPrice(item.priceAtTime * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-text-muted"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between text-text-muted"><span>Shipping</span><span>{order.shippingFee === 0 ? 'Free' : formatPrice(order.shippingFee)}</span></div>
            <div className="flex justify-between text-text-muted"><span>Tax</span><span>{formatPrice(order.tax)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-sage"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between font-bold text-text-primary pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card-bg border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-text-primary border-b border-border pb-3 mb-4">Track Order</h3>
            <OrderTimeline currentStatus={order.status} updatedAt={order.updatedAt} />
          </div>

          <div className="bg-card-bg border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-text-primary border-b border-border pb-3 mb-4">Delivery Details</h3>
            <div className="text-sm text-text-secondary space-y-2">
              <p><span className="font-medium text-text-primary">Method:</span> {order.deliveryMethod}</p>
              {order.deliveryMethod === 'PICKUP' ? (
                <>
                  <p><span className="font-medium text-text-primary">Branch:</span> {order.pickupBranch}</p>
                  <p><span className="font-medium text-text-primary">Time:</span> {order.pickupTimeSlot}</p>
                </>
              ) : (
                <p><span className="font-medium text-text-primary">Address:</span> Delivered to saved address</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

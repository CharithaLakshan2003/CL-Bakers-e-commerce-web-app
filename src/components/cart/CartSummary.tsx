'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Tag, ChevronRight, Gift } from 'lucide-react';
import { useCartStore } from '@/stores/cart.store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CartSummary({ deliveryMethod = 'DELIVERY' }: { deliveryMethod?: 'PICKUP' | 'DELIVERY' }) {
  const { subtotal, tax, shippingFee, total, discount, couponCode, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const sub = subtotal();
  const ship = shippingFee(deliveryMethod);
  const taxAmt = tax(sub);
  const tot = total(deliveryMethod);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    // Mock coupon validation
    await new Promise(r => setTimeout(r, 600));
    if (couponInput.toUpperCase() === 'WELCOME10') {
      applyCoupon('WELCOME10', sub * 0.10);
      setCouponInput('');
    } else if (couponInput.toUpperCase() === 'SAVE5') {
      applyCoupon('SAVE5', 5);
      setCouponInput('');
    } else {
      setCouponError('Invalid or expired coupon code.');
    }
    setCouponLoading(false);
  };

  return (
    <div className="bg-card-bg border border-border rounded-2xl p-6 space-y-4 sticky top-28">
      <h2 className="font-display text-xl font-bold text-text-primary">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-text-secondary"><span>Subtotal</span><span>{formatPrice(sub)}</span></div>
        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span className={ship === 0 ? 'text-sage font-medium' : ''}>{ship === 0 ? 'Free' : formatPrice(ship)}</span>
        </div>
        <div className="flex justify-between text-text-secondary"><span>Tax (10%)</span><span>{formatPrice(taxAmt)}</span></div>
        {discount > 0 && (
          <div className="flex justify-between text-sage font-medium">
            <span className="flex items-center gap-1"><Gift size={12} />Coupon ({couponCode})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
        <span className="text-text-primary">Total</span>
        <span className="text-primary-600 font-display">{formatPrice(tot)}</span>
      </div>

      {/* Coupon */}
      {!couponCode ? (
        <div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Coupon code"
                className="w-full pl-8 pr-3 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <Button size="sm" onClick={handleApplyCoupon} loading={couponLoading} variant="secondary">
              Apply
            </Button>
          </div>
          {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
          <p className="text-xs text-text-muted mt-1">Try: WELCOME10 or SAVE5</p>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm">
          <span className="text-sage font-medium flex items-center gap-1"><Tag size={12} />{couponCode}</span>
          <button onClick={removeCoupon} className="text-text-muted hover:text-red-500 text-xs cursor-pointer">Remove</button>
        </div>
      )}

      <Link href="/checkout" className="block">
        <Button fullWidth size="lg" icon={<ChevronRight size={18} />} iconPosition="right">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/shop" className="block text-center text-sm text-primary-600 hover:underline">
        ← Continue Shopping
      </Link>

      {/* Security badges */}
      <div className="flex items-center justify-center gap-4 pt-2 opacity-50">
        {['🔒 Secure', '💳 Encrypted', '✓ SSL'].map(badge => (
          <span key={badge} className="text-xs text-text-muted">{badge}</span>
        ))}
      </div>
    </div>
  );
}

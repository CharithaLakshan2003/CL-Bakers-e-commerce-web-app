'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartItemRow } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/stores/cart.store';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl font-bold text-text-primary">
              Shopping Cart
              {items.length > 0 && <span className="text-xl text-text-muted ml-3">({items.length} {items.length === 1 ? 'item' : 'items'})</span>}
            </h1>
            {items.length > 0 && (
              <button onClick={clearCart} className="text-sm text-red-500 hover:underline cursor-pointer">
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-cream-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={40} className="text-primary-300" />
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Your cart is empty</h2>
              <p className="text-text-muted mb-8">Looks like you haven&apos;t added anything yet. Let&apos;s fix that!</p>
              <Link href="/shop">
                <Button size="lg">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 bg-card-bg border border-border rounded-2xl p-6">
                {items.map(item => <CartItemRow key={item.id} item={item} />)}
              </div>
              {/* Summary */}
              <CartSummary />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

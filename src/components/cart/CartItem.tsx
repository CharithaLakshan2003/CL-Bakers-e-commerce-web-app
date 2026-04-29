'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart.store';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/types';

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0">
      <Link href={`/product/${item.product.id}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 dark:bg-primary-900/30">
          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.product.id}`}>
          <h3 className="font-semibold text-text-primary text-sm leading-tight hover:text-primary-600 transition-colors line-clamp-2">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-xs text-text-muted capitalize mt-0.5">{item.product.category}</p>
        <p className="text-primary-600 font-semibold text-sm mt-1">{formatPrice(item.product.price)}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
        <QuantitySelector
          value={item.quantity}
          max={item.product.stock}
          onChange={(qty) => updateQuantity(item.product.id, qty)}
          size="sm"
        />
        <div className="text-right">
          <p className="font-bold text-text-primary text-sm sm:w-16 sm:text-right">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
        <button
          onClick={() => removeItem(item.product.id)}
          aria-label="Remove item"
          className="text-text-muted hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

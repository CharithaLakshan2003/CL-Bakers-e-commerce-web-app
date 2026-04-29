import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string, discountValue: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
  shippingFee: (method: 'PICKUP' | 'DELIVERY') => number;
  tax: (subtotal: number) => number;
  total: (method: 'PICKUP' | 'DELIVERY') => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(i => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { id: `cart-${product.id}`, product, quantity }],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter(i => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) { get().removeItem(productId); return; }
        set((state) => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      applyCoupon: (code, discountValue) => set({ couponCode: code, discount: discountValue }),
      removeCoupon: () => set({ couponCode: null, discount: 0 }),
      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      shippingFee: (method) => {
        if (method === 'PICKUP') return 0;
        return get().subtotal() >= 30 ? 0 : 5;
      },
      tax: (subtotal) => Math.round(subtotal * 0.10 * 100) / 100,
      total: (method) => {
        const sub = get().subtotal();
        return Math.round((sub + get().shippingFee(method) + get().tax(sub) - get().discount) * 100) / 100;
      },
    }),
    {
      name: 'bakery-cart',
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode, discount: state.discount }),
    }
  )
);

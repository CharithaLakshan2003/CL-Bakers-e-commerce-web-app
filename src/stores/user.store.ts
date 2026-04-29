import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  wishlist: string[];
  setUser: (user: User | null) => void;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addLoyaltyPoints: (points: number) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      wishlist: [],

      setUser: (user) => set({ user, isLoggedIn: !!user }),
      logout: () => set({ user: null, isLoggedIn: false }),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter(id => id !== productId)
            : [...state.wishlist, productId],
        })),

      isWishlisted: (productId) => get().wishlist.includes(productId),

      addLoyaltyPoints: (points) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, loyaltyPoints: state.user.loyaltyPoints + points }
            : null,
        })),
    }),
    { name: 'bakery-user', partialize: (s) => ({ user: s.user, isLoggedIn: s.isLoggedIn, wishlist: s.wishlist }) }
  )
);

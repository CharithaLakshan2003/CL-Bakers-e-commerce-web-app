import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isDark: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  cartAnimating: boolean;
  toggleDark: () => void;
  setDark: (val: boolean) => void;
  setMobileMenuOpen: (val: boolean) => void;
  setSearchOpen: (val: boolean) => void;
  triggerCartAnimation: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isDark: false,
      mobileMenuOpen: false,
      searchOpen: false,
      cartAnimating: false,

      toggleDark: () =>
        set((state) => {
          const next = !state.isDark;
          document.documentElement.classList.toggle('dark', next);
          return { isDark: next };
        }),

      setDark: (val) => {
        document.documentElement.classList.toggle('dark', val);
        set({ isDark: val });
      },

      setMobileMenuOpen: (val) => set({ mobileMenuOpen: val }),
      setSearchOpen: (val) => set({ searchOpen: val }),

      triggerCartAnimation: () => {
        set({ cartAnimating: true });
        setTimeout(() => set({ cartAnimating: false }), 600);
      },
    }),
    { name: 'bakery-ui', partialize: (s) => ({ isDark: s.isDark }) }
  )
);

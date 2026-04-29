import { create } from 'zustand';
import { Category, SortOption, FilterState } from '@/types';

interface FilterStore extends FilterState {
  setCategories: (cats: Category[]) => void;
  toggleCategory: (cat: Category) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleDietary: (diet: string) => void;
  setMinRating: (rating: number) => void;
  setInStockOnly: (val: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (q: string) => void;
  resetFilters: () => void;
  activeFilterCount: () => number;
}

const defaults: FilterState = {
  categories: [],
  priceRange: [0, 200],
  dietary: [],
  minRating: 0,
  inStockOnly: false,
  sortBy: 'relevance',
  searchQuery: '',
};

export const useFilterStore = create<FilterStore>()((set, get) => ({
  ...defaults,

  setCategories: (cats) => set({ categories: cats }),

  toggleCategory: (cat) =>
    set((state) => ({
      categories: state.categories.includes(cat)
        ? state.categories.filter(c => c !== cat)
        : [...state.categories, cat],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  toggleDietary: (diet) =>
    set((state) => ({
      dietary: state.dietary.includes(diet)
        ? state.dietary.filter(d => d !== diet)
        : [...state.dietary, diet],
    })),

  setMinRating: (rating) => set({ minRating: rating }),
  setInStockOnly: (val) => set({ inStockOnly: val }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  resetFilters: () => set({ ...defaults }),

  activeFilterCount: () => {
    const s = get();
    let count = 0;
    if (s.categories.length) count++;
    if (s.priceRange[0] > 0 || s.priceRange[1] < 200) count++;
    if (s.dietary.length) count++;
    if (s.minRating > 0) count++;
    if (s.inStockOnly) count++;
    return count;
  },
}));

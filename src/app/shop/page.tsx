'use client';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import { useFilterStore } from '@/stores/filter.store';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

const categoryOptions = [
  { value: 'bread', label: 'Artisan Bread' },
  { value: 'pastry', label: 'Pastries' },
  { value: 'cake', label: 'Cakes' },
  { value: 'savory', label: 'Savory' },
  { value: 'gluten-free', label: 'Gluten-Free' },
];

const dietaryOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const {
    categories, toggleCategory, priceRange, setPriceRange,
    dietary, toggleDietary, minRating, setMinRating,
    inStockOnly, setInStockOnly, sortBy, setSortBy,
    searchQuery, resetFilters, activeFilterCount,
  } = useFilterStore();

  const filtered = useMemo(() => {
    let products: Product[] = [...mockProducts];
    if (categories.length) products = products.filter(p => categories.includes(p.category as never));
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (dietary.length) products = products.filter(p => dietary.every(d => p.dietary?.includes(d as never)));
    if (minRating) products = products.filter(p => p.rating >= minRating);
    if (inStockOnly) products = products.filter(p => p.stock > 0);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'newest': products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
    }
    return products;
  }, [categories, priceRange, dietary, minRating, inStockOnly, sortBy, searchQuery]);

  const filterCount = activeFilterCount();

  // Dynamic import to avoid circular import - inline the ProductCard
  const { ProductCard } = require('@/components/shop/ProductCard');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container-custom pt-28 pb-16">
        <div className="flex gap-8">
          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel
              categories={categories} toggleCategory={toggleCategory}
              priceRange={priceRange} setPriceRange={setPriceRange}
              dietary={dietary} toggleDietary={toggleDietary}
              minRating={minRating} setMinRating={setMinRating}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              resetFilters={resetFilters} filterCount={filterCount}
            />
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm text-text-secondary hover:border-primary-600 hover:text-primary-600 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {filterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">{filterCount}</span>
                  )}
                </button>
                <p className="text-sm text-text-muted">{filtered.length} products</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as never)}
                  className="px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  {[{ icon: LayoutGrid, mode: 'grid' }, { icon: List, mode: 'list' }].map(({ icon: Icon, mode }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as 'grid' | 'list')}
                      className={cn(
                        'w-9 h-9 flex items-center justify-center transition-colors cursor-pointer',
                        viewMode === mode ? 'bg-primary-600 text-white' : 'text-text-muted hover:bg-primary-50 dark:hover:bg-primary-900/30'
                      )}
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filters chips */}
            {filterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map(c => (
                  <button key={c} onClick={() => toggleCategory(c as never)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors">
                    {c} <X size={10} />
                  </button>
                ))}
                <button onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-1 text-xs text-red-600 border border-red-200 rounded-full hover:bg-red-50 cursor-pointer transition-colors">
                  Clear all
                </button>
              </div>
            )}

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-2">No products found</h3>
                <p className="text-text-muted mb-6">Try adjusting your filters or search terms</p>
                <button onClick={resetFilters}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              )}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-card-bg shadow-warm-lg p-5 overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-text-muted hover:text-text-primary cursor-pointer"><X size={20} /></button>
            </div>
            <FilterPanel
              categories={categories} toggleCategory={toggleCategory}
              priceRange={priceRange} setPriceRange={setPriceRange}
              dietary={dietary} toggleDietary={toggleDietary}
              minRating={minRating} setMinRating={setMinRating}
              inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
              resetFilters={resetFilters} filterCount={filterCount}
            />
          </div>
        </>
      )}
    </div>
  );
}

function FilterPanel(props: {
  categories: string[]; toggleCategory: (c: never) => void;
  priceRange: [number, number]; setPriceRange: (r: [number, number]) => void;
  dietary: string[]; toggleDietary: (d: string) => void;
  minRating: number; setMinRating: (r: number) => void;
  inStockOnly: boolean; setInStockOnly: (v: boolean) => void;
  resetFilters: () => void; filterCount: number;
}) {
  return (
    <div className="space-y-6">
      {props.filterCount > 0 && (
        <button onClick={props.resetFilters} className="w-full py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
          Clear all filters
        </button>
      )}

      {/* Category */}
      <div>
        <h3 className="font-semibold text-text-primary text-sm mb-3">Category</h3>
        <div className="space-y-2">
          {categoryOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={props.categories.includes(opt.value)}
                onChange={() => props.toggleCategory(opt.value as never)}
                className="w-4 h-4 accent-primary-600 rounded cursor-pointer"
              />
              <span className="text-sm text-text-secondary group-hover:text-primary-600 transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-text-primary text-sm mb-3">
          Price Range: <span className="text-primary-600">${props.priceRange[0]} – ${props.priceRange[1]}</span>
        </h3>
        <input
          type="range" min={0} max={200} value={props.priceRange[1]}
          onChange={e => props.setPriceRange([props.priceRange[0], Number(e.target.value)])}
          className="w-full accent-primary-600"
        />
      </div>

      {/* Dietary */}
      <div>
        <h3 className="font-semibold text-text-primary text-sm mb-3">Dietary</h3>
        <div className="space-y-2">
          {dietaryOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={props.dietary.includes(opt.value)}
                onChange={() => props.toggleDietary(opt.value)}
                className="w-4 h-4 accent-primary-600 rounded cursor-pointer"
              />
              <span className="text-sm text-text-secondary group-hover:text-primary-600 transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-text-primary text-sm mb-3">Min Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 0].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="rating" checked={props.minRating === r}
                onChange={() => props.setMinRating(r)}
                className="accent-primary-600 cursor-pointer"
              />
              <span className="text-sm text-text-secondary">
                {r > 0 ? `${r}+ Stars` : 'Any Rating'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* In stock */}
      <label className="flex items-center justify-between cursor-pointer">
        <span className="font-semibold text-text-primary text-sm">In Stock Only</span>
        <div
          onClick={() => props.setInStockOnly(!props.inStockOnly)}
          className={cn(
            'w-10 h-5 rounded-full transition-colors relative cursor-pointer',
            props.inStockOnly ? 'bg-primary-600' : 'bg-border'
          )}
        >
          <div className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
            props.inStockOnly ? 'translate-x-5' : 'translate-x-0.5'
          )} />
        </div>
      </label>
    </div>
  );
}

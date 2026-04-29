'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, TrendingUp } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';
import { mockProducts } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

const popularSearches = ['sourdough', 'croissant', 'birthday cake', 'cinnamon roll', 'gluten-free'];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockProducts.slice(0, 0));
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery('');
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(mockProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    ).slice(0, 5));
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} />
      <div className="relative w-full bg-card-bg shadow-warm-lg animate-fade-in-up">
        <div className="container-custom py-4">
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <Search size={20} className="text-text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for breads, pastries, cakes…"
              className="flex-1 bg-transparent text-lg text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <button type="button" onClick={() => setSearchOpen(false)} className="text-text-muted hover:text-text-primary transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Results or suggestions */}
        <div className="container-custom pb-4 space-y-4">
          {results.length > 0 ? (
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2">Products</p>
              <div className="space-y-1">
                {results.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`} onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-bg-secondary shrink-0">
                      <Image src={p.images[0]} alt={p.name} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary-600">{p.name}</p>
                      <p className="text-xs text-text-muted capitalize">{p.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">{formatPrice(p.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                <TrendingUp size={12} /> Popular
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(s => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="px-3 py-1.5 bg-bg-secondary border border-border rounded-full text-sm text-text-secondary hover:border-primary-400 hover:text-primary-600 transition-colors cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

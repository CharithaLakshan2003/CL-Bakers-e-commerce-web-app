'use client';
import { useState } from 'react';
import { Heart, ShoppingCart, Share2, AlertTriangle } from 'lucide-react';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { useUserStore } from '@/stores/user.store';
import { formatPrice, isLowStock } from '@/lib/utils';
import { StarRating } from '@/components/ui/StarRating';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AllergenIcons } from './AllergenIcons';
import { NutritionalTable } from './NutritionalTable';
import type { Product } from '@/types';

export function ProductInfo({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();
  const { triggerCartAnimation } = useUIStore();
  const { toggleWishlist, isWishlisted } = useUserStore();
  const wishlisted = isWishlisted(p.id);
  const outOfStock = p.stock === 0;
  const lowStock = isLowStock(p.stock);

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(p, qty);
    triggerCartAnimation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category + badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-text-muted capitalize px-2 py-0.5 bg-bg-secondary rounded-full">{p.category}</span>
        {p.isTodaySpecial && <Badge variant="special" />}
        {lowStock && <Badge variant="low-stock">Only {p.stock} left</Badge>}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-tight">{p.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={p.rating} size="md" showNumber reviewCount={p.reviewCount} />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-4xl font-bold text-primary-600">{formatPrice(p.price)}</span>
        {p.comparePrice && (
          <span className="text-xl text-text-muted line-through">{formatPrice(p.comparePrice)}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed">{p.description}</p>

      {/* Availability */}
      {outOfStock ? (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
          <AlertTriangle size={16} />
          This item is currently out of stock. Check back soon!
        </div>
      ) : lowStock ? (
        <div className="flex items-center gap-2 p-3 bg-tangerine/10 border border-tangerine/20 rounded-xl text-sm text-tangerine">
          <AlertTriangle size={16} />
          Only {p.stock} remaining — order soon!
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-sage">
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          In Stock ({p.stock} available)
        </div>
      )}

      {/* Qty + Cart */}
      {!outOfStock && (
        <div className="flex items-center gap-4 flex-wrap">
          <QuantitySelector value={qty} min={1} max={p.stock} onChange={setQty} size="lg" />
          <Button
            size="lg"
            onClick={handleAddToCart}
            variant={added ? 'secondary' : 'primary'}
            icon={<ShoppingCart size={18} />}
            className="flex-1 min-w-40"
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </Button>
        </div>
      )}

      {/* Wishlist + Share */}
      <div className="flex gap-3">
        <button
          onClick={() => toggleWishlist(p.id)}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-border rounded-full text-sm font-medium text-text-secondary hover:border-red-400 hover:text-red-500 transition-all cursor-pointer"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? 'text-red-500' : ''} />
          {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
        <button
          onClick={() => navigator.share?.({ title: p.name, url: window.location.href })}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-border rounded-full text-sm font-medium text-text-secondary hover:border-primary-400 hover:text-primary-600 transition-all cursor-pointer"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Allergens */}
      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">Allergen Information</p>
        <AllergenIcons allergens={p.allergens} />
      </div>

      {/* Nutritional */}
      <NutritionalTable info={p.nutritionalInfo} />
    </div>
  );
}

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { useUserStore } from '@/stores/user.store';
import { formatPrice, discountPercent, isLowStock, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product: p, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { triggerCartAnimation } = useUIStore();
  const { toggleWishlist, isWishlisted } = useUserStore();
  const wishlisted = isWishlisted(p.id);
  const outOfStock = p.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addItem(p, 1);
    triggerCartAnimation();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(p.id);
  };

  return (
    <Link href={`/product/${p.id}`} className={cn('group block', className)}>
      <div className="product-card rounded-2xl overflow-hidden bg-card-bg border border-border">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-cream-100 dark:bg-primary-900/30">
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            className="object-cover product-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {p.badges?.includes('special') && <Badge variant="special" />}
            {p.badges?.includes('new') && <Badge variant="new" />}
            {p.badges?.includes('sale') && p.comparePrice && (
              <Badge variant="sale">-{discountPercent(p.comparePrice, p.price)}%</Badge>
            )}
            {(isLowStock(p.stock) || p.badges?.includes('low-stock')) && (
              <Badge variant="low-stock">Low Stock</Badge>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={cn(
              'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer',
              'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100',
              wishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-card-bg/90 text-text-muted hover:text-red-500'
            )}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Out of stock overlay */}
          {outOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-text-primary text-xs font-semibold px-3 py-1.5 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-text-muted capitalize mb-1">{p.category}</p>
          <h3 className="font-semibold text-text-primary text-sm leading-tight line-clamp-2 mb-1.5 group-hover:text-primary-600 transition-colors">
            {p.name}
          </h3>
          <StarRating rating={p.rating} size="sm" showNumber reviewCount={p.reviewCount} className="mb-3" />

          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-bold text-primary-600 text-base">{formatPrice(p.price)}</span>
              {p.comparePrice && (
                <span className="text-text-muted text-xs line-through ml-1.5">{formatPrice(p.comparePrice)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              aria-label={`Add ${p.name} to cart`}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0',
                outOfStock
                  ? 'bg-border text-text-muted cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110 active:scale-95 shadow-warm'
              )}
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

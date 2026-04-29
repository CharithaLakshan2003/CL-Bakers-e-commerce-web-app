'use client';
import { useUserStore } from '@/stores/user.store';
import { mockProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { wishlist } = useUserStore();
  const wishlistedProducts = mockProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">My Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16 bg-card-bg border border-border rounded-2xl">
          <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-red-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Your wishlist is empty</h2>
          <p className="text-text-muted mb-6">Save your favorite baked goods here to order them later.</p>
          <Link href="/shop">
            <Button>Explore Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

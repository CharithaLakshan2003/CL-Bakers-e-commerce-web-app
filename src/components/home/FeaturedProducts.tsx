import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/shop/ProductCard';

export function FeaturedProducts() {
  const featured = mockProducts.slice(0, 6);

  return (
    <section id="featured" className="section-padding">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2">Handpicked for You</p>
            <h2 className="font-display text-4xl font-bold text-text-primary">Featured Products</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:gap-3 transition-all"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
